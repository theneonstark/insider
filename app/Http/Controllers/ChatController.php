<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\Connection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Controller;

class ChatController extends Controller
{
    // -----------------------
    // Send Message (only if connected)
    // -----------------------
    public function sendMessage(Request $request)
    {
        $request->validate([
            'receiver_id' => 'required|exists:users,id',
            'message' => 'required|string'
        ]);

        $authId = Auth::id();
        $receiverId = $request->receiver_id;

        // Allow chat ONLY if accepted connection exists:
        $isConnected = Connection::where(function ($q) use ($authId, $receiverId) {
            $q->where('sender_id', $authId)
                ->where('receiver_id', $receiverId)
                ->where('status', 'accepted');
        })
            ->orWhere(function ($q) use ($authId, $receiverId) {
                $q->where('sender_id', $receiverId)
                    ->where('receiver_id', $authId)
                    ->where('status', 'accepted');
            })
            ->exists();

        if (!$isConnected) {
            return response()->json([
                'error' => 'You can only chat with connected users.'
            ], 403);
        }

        // Store message
        $message = Message::create([
            'sender_id' => $authId,
            'receiver_id' => $receiverId,
            'message' => $request->message
        ]);

        return response()->json([
            'message' => 'Message sent',
            'data' => $message
        ]);
    }


    public function getChat($userId)
    {
        $authId = Auth::id();

        // Fetch chat history between both users
        $chat = Message::where(function ($q) use ($authId, $userId) {
                $q->where('sender_id', $authId)
                ->where('receiver_id', $userId);
            })
            ->orWhere(function ($q) use ($authId, $userId) {
                $q->where('sender_id', $userId)
                ->where('receiver_id', $authId);
            })
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json($chat);
    }



    public function chatList()
    {
        $authId = Auth::id();

        // Fetch all messages where user is sender or receiver
        $messages = Message::where('sender_id', $authId)
            ->orWhere('receiver_id', $authId)
            ->orderBy('created_at', 'desc')
            ->get();

        $uniqueUsers = [];

        foreach ($messages as $msg) {
            $otherId = $msg->sender_id == $authId ? $msg->receiver_id : $msg->sender_id;

            // Avoid duplicates
            if (!isset($uniqueUsers[$otherId])) {

                // Fetch the other user data
                $otherUser = $msg->sender_id == $authId ? $msg->receiver : $msg->sender;

                $uniqueUsers[$otherId] = [
                    "user" => $otherUser,
                    "last_message" => $msg->message,
                    "time" => $msg->created_at->diffForHumans()
                ];
            }
        }

        return response()->json(array_values($uniqueUsers));
    }

}

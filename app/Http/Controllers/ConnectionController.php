<?php

namespace App\Http\Controllers;

use App\Models\Connection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ConnectionController
{
    // -----------------------
    // Send Connection Request
    // -----------------------
    public function connect(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id'
        ]);

        $sender = Auth::id();
        $receiver = $request->user_id;

        // Same user ko request nahi
        if ($sender == $receiver) {
            return response()->json(['error' => 'You cannot connect with yourself'], 400);
        }

        // Check if already connected or pending
        $existing = Connection::where(function ($q) use ($sender, $receiver) {
            $q->where('sender_id', $sender)->where('receiver_id', $receiver);
        })->orWhere(function ($q) use ($sender, $receiver) {
            $q->where('sender_id', $receiver)->where('receiver_id', $sender);
        })->first();

        if ($existing) {
            return response()->json(['message' => 'Already requested or connected'], 400);
        }

        // Create request
        Connection::create([
            'sender_id' => $sender,
            'receiver_id' => $receiver,
            'status' => 'accepted'
        ]);

        return response()->json(['message' => 'Connection request sent']);
    }

    // -----------------------
    // Accept Request
    // -----------------------
    public function accept(Request $request)
    {
        $request->validate([
            'connection_id' => 'required|exists:connections,id'
        ]);

        $connection = Connection::find($request->connection_id);

        // Only receiver can accept
        if ($connection->receiver_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $connection->update([
            'status' => 'accepted'
        ]);

        return response()->json(['message' => 'Connection accepted']);
    }

    // -----------------------
    // Remove Connection
    // -----------------------
    public function remove(Request $request)
    {
        $request->validate([
            'connection_id' => 'required|exists:connections,id'
        ]);

        $connection = Connection::find($request->connection_id);

        if (
            $connection->sender_id !== Auth::id() &&
            $connection->receiver_id !== Auth::id()
        ) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $connection->delete();

        return response()->json(['message' => 'Connection removed']);
    }

    // -----------------------
    // Get My Connections List
    // -----------------------
    public function myConnections()
    {
        $authId = Auth::id();

        // -----------------------
        // 1. Accepted Connections
        // -----------------------
        $accepted = Connection::where(function ($q) use ($authId) {
            $q->where('sender_id', $authId)->where('status', 'accepted');
        })
            ->orWhere(function ($q) use ($authId) {
                $q->where('receiver_id', $authId)->where('status', 'accepted');
            })
            ->with(['sender.tier', 'receiver.tier'])
            ->get()
            ->map(function ($connection) use ($authId) {
                $friend = $connection->sender_id == $authId
                    ? $connection->receiver
                    : $connection->sender;

                return [
                    'id' => $friend->id,
                    'name' => $friend->name,
                    'businessType' => $friend->businessType,
                    'state' => $friend->region->regionName ?? null,
                    'tier' => $friend->tier->tier_name ?? null,
                    'image' => $friend->image,
                    'status' => 'accepted',
                    'connection_id' => $connection->id  // <-- FIX
                ];
            });

        // -----------------------
        // 2. Requests SENT by me
        // -----------------------
        $sent = Connection::where('sender_id', $authId)
            ->where('status', 'pending')
            ->with('receiver.tier')
            ->get()
            ->map(function ($connection) {
                $friend = $connection->receiver;

                return [
                    'id' => $friend->id,
                    'name' => $friend->name,
                    'businessType' => $friend->businessType,
                    'state' => $friend->region->regionName ?? null,
                    'tier' => $friend->tier->tier_name ?? null,
                    'image' => $friend->image,
                    'status' => 'sent',
                    'connection_id' => $connection->id  // <-- FIX
                ];
            });

        // -----------------------
        // 3. Requests RECEIVED by me
        // -----------------------
        $received = Connection::where('receiver_id', $authId)
            ->where('status', 'pending')
            ->with('sender.tier')
            ->get()
            ->map(function ($connection) {
                $friend = $connection->sender;

                return [
                    'id' => $friend->id,
                    'name' => $friend->name,
                    'businessType' => $friend->businessType,
                    'state' => $friend->region->regionName ?? null,
                    'tier' => $friend->tier->tier_name ?? null,
                    'image' => $friend->image,
                    'status' => 'received',
                    'connection_id' => $connection->id  // <-- FIX
                ];
            });

        // -----------------------
        // Merge all 3 sections
        // -----------------------
        $allConnections = $accepted
            ->merge($sent)
            ->merge($received)
            ->values();

        return response()->json($allConnections);
    }


    // -----------------------
    // My Pending Requests
    // -----------------------
    public function pendingRequests()
    {
        $userId = Auth::id();

        $requests = Connection::where('receiver_id', $userId)
            ->where('status', 'pending')
            ->with('sender')
            ->get();

        return response()->json($requests);
    }

    // -----------------------
    // Get Connection Status With Any User
    // -----------------------
    public function connectionStatus($id)
    {
        $authId = Auth::id();

        // Default
        $status = "none";
        $connectionId = null;

        if (!$authId) {
            return response()->json([
                'status' => $status,
                'connection_id' => null
            ]);
        }

        // Check connection from both sides
        $connection = Connection::where(function ($q) use ($authId, $id) {
            $q->where('sender_id', $authId)
                ->where('receiver_id', $id);
        })
            ->orWhere(function ($q) use ($authId, $id) {
                $q->where('sender_id', $id)
                    ->where('receiver_id', $authId);
            })
            ->first();

        if ($connection) {
            $connectionId = $connection->id;

            if ($connection->status === "accepted") {
                $status = "accepted";
            } elseif ($connection->sender_id == $authId && $connection->status === "pending") {
                $status = "sent"; // I sent the request
            } elseif ($connection->receiver_id == $authId && $connection->status === "pending") {
                $status = "received"; // I received the request
            }
        }

        return response()->json([
            'status' => $status,
            'connection_id' => $connectionId
        ]);
    }
}

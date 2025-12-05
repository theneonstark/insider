import { useState } from "react";
import { router } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const submit = (e) => {
    e.preventDefault();

    router.post("/forgot-password/send-otp", { email }, {
      onSuccess: () => toast.success("OTP sent to your email"),
      onError: () => toast.error("Something went wrong"),
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form onSubmit={submit} className="space-y-4 bg-white p-6 rounded-lg w-[400px]">
        <h2 className="text-xl font-bold">Forgot Password</h2>

        <Input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button className="w-full">Send OTP</Button>
      </form>
    </div>
  );
}
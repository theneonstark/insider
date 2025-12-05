import { useState } from "react";
import { router } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");

  const submit = (e) => {
    e.preventDefault();

    router.post("/forgot-password/verify", { otp }, {
      onSuccess: () => toast.success("OTP Verified"),
      onError: () => toast.error("Incorrect OTP"),
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form onSubmit={submit} className="space-y-4 bg-white p-6 rounded-lg w-[400px]">
        <h2 className="text-xl font-bold">Verify OTP</h2>

        <Input
          type="number"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <Button className="w-full">Verify</Button>
      </form>
    </div>
  );
}

import { useState } from "react";
import { router } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const [form, setForm] = useState({
    password: "",
    password_confirmation: "",
  });

  const submit = (e) => {
    e.preventDefault();

    router.post("/forgot-password/reset", form, {
      onSuccess: () => toast.success("Password reset successfully"),
      onError: () => toast.error("Failed to reset password"),
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form onSubmit={submit} className="space-y-4 bg-white p-6 rounded-lg w-[400px]">
        <h2 className="text-xl font-bold">Reset Password</h2>

        <Input
          type="password"
          placeholder="New Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <Input
          type="password"
          placeholder="Confirm Password"
          value={form.password_confirmation}
          onChange={(e) =>
            setForm({ ...form, password_confirmation: e.target.value })
          }
        />

        <Button className="w-full">Reset Password</Button>
      </form>
    </div>
  );
}

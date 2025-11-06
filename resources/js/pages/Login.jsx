import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import logo from "@/assets/logo.png";
import toast, { Toaster } from "react-hot-toast";
import { Link, router } from "@inertiajs/react";
import { Login as LoginApi } from "@/lib/apis"; // 👈 your API function import

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 👇 Use the imported API function here
      const response = await LoginApi(credentials);
      const { message, status, redirect } = response.data;

      if (message === "Username or password is incorrect") {
        toast.error("Username or password is incorrect");
      } else if (status === "warning") {
        toast.error("You aren't registered with us.");
      } else if (
        message ===
        "Your account currently de-activated, please contact administrator"
      ) {
        toast.error("Your account currently de-activated, please contact administrator");
      } else {
        toast.success("Login Success 🎉");
        setTimeout(() => router.visit(redirect), 1500);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-secondary">
      <Card className="w-full max-w-md animate-fade-in">
        <CardHeader className="text-center">
          <Link href="/" className="flex justify-center mb-4">
            <img src={logo} alt="Insiders Index" className="h-16 w-auto" />
          </Link>
          <CardTitle className="text-2xl font-heading">Welcome Back</CardTitle>
          <CardDescription>Login to access your dashboard</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="text"
                required
                value={credentials.email}
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
                placeholder="Enter your username"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                placeholder="Enter your password"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <div className="mt-4 text-center space-y-2">
            <Link href="#" className="text-sm text-primary hover:underline block">
              Forgot Password?
            </Link>
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
      <Toaster/>
    </div>
  );
};

export default Login;

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Link } from "@inertiajs/react";
import { register, Data } from "@/lib/apis";
import toast, { Toaster } from "react-hot-toast";
import { X } from "lucide-react";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    businessType: "",
    dob: "",
    password: ""
  });

  const [businessTypes, setBusinessTypes] = useState([]); // ✅ will hold region data
  const [loading, setLoading] = useState(true);

  // 🧠 Fetch data from API
  useEffect(() => {
    const fetchBusinessTypes = async () => {
      try {
        const res = await Data();
        if (res.status === 200 && res.data.status) {
          // ✅ Business type data is inside region
          setBusinessTypes(res.data.industry || []);
        } else {
          toast.error("Failed to load business types");
        }
      } catch (error) {
        console.error("Error fetching business types:", error);
        toast.error("Something went wrong while loading business types");
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessTypes();
  }, []);

  // 🧠 Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(formData);
      console.log(response.data);
      toast.success("Register Success");

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center p-4"
      style={{ background: "var(--gradient-hero)" }}
    >
    <Link
      href="/"
      className="absolute top-2 right-2 p-2 rounded-full hover:bg-muted transition"
    >
      <X className="h-5 w-5 text-muted-foreground" />
    </Link>
      <Card className="w-full max-w-md animate-fade-in">
        <CardHeader className="text-center">
          <Link href="/" className="flex justify-center mb-4">
            <img
              src={"/assets/logo.png"}
              alt="Insiders Index"
              className="h-16 w-auto"
            />
          </Link>
          <CardTitle className="text-2xl font-heading">
            Create Your Account
          </CardTitle>
          <CardDescription>
            Become an Insider today!
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
              />
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            {/* Phone */}
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>

            {/* Business Type (from region) */}
            <div>
              <Label htmlFor="businessType">Business Type</Label>
              {loading ? (
                <p className="text-sm text-muted-foreground mt-2">
                  Loading business types...
                </p>
              ) : (
                <Select
                  value={String(formData.businessType)}
                  onValueChange={(value) =>
                    setFormData({ ...formData, businessType: String(value) })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    {businessTypes.length > 0 ? (
                      businessTypes.map((type) => (
                        <SelectItem key={type.industryId} value={String(type.industryId)}>
                          {type.industryName}
                        </SelectItem>
                      ))
                    ) : (
                      <div className="p-2 text-sm text-muted-foreground">
                        No business types found
                      </div>
                    )}
                  </SelectContent>
                </Select>
              )}
            </div>

            {/* DOB */}
            <div>
              <Label htmlFor="dob">Date of Birth</Label>
              <Input
                id="dob"
                type="date"
                required
                value={formData.dob}
                onChange={(e) =>
                  setFormData({ ...formData, dob: e.target.value })
                }
              />
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Create Account
            </Button>
          </form>

          <p className="text-center mt-4 text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
};

export default Signup;
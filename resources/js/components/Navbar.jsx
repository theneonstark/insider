import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { Link, usePage } from "@inertiajs/react";

const Navbar = () => {
  const { auth } = usePage().props; // Inertia se auth milega

  const isLoggedIn = !!auth?.user; // true/false

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <img src={logo} alt="Insiders Index" className="h-12 w-auto" />
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/" className="text-foreground hover:text-primary transition-colors">
              Find Members
            </Link>
          </div>
          
          <div className="flex items-center gap-3">
            {!isLoggedIn && (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="hover:bg-secondary">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[var(--shadow-card)]">
                    Join Now
                  </Button>
                </Link>
              </>
            )}
            {isLoggedIn && (
              <Link href="/dashboard">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  Dashboard
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
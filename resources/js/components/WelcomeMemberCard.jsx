import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { increaseView } from "@/lib/apis"; // 👈 import API
import { Link } from "@inertiajs/react";

const WelcomeMemberCard = ({ id, name, business_type, tier, image, views = 0, onViewProfile }) => {
  const [viewCount, setViewCount] = useState(views);
  const { toast } = useToast();

  const tierColors = {
    Shine: "bg-secondary text-secondary-foreground",
    Sparkle: "bg-primary text-primary-foreground",
    Elite: "bg-accent text-accent-foreground"
  };

  // 🧠 "View" click logic
  const handleView = async () => {
    try {
      // 🔥 Backend update
      const res = await increaseView(id);

      if (res.status) {
        setViewCount(res.views); // update from backend
      }

      // 🔥 Optional toast
      toast({
        description: "+1 view",
        duration: 2000,
      });

      // 🔥 Open profile modal
      if (onViewProfile) onViewProfile();
    } catch (error) {
      console.error("Failed to increase view:", error);
      toast({
        description: "Failed to increase view",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="animate-fade-in hover-lift overflow-hidden">
      <div className="aspect-square overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
        />
      </div>

      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-lg">{name}</h3>
            <p className="text-sm text-muted-foreground">{business_type}</p>
          </div>
          <Badge className={tierColors[tier]}>{tier}</Badge>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Eye className="w-4 h-4" />
          <span>{viewCount} views</span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        {/* ✅ View triggers DB update + modal open */}
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleView}
          className="flex-1"
        >
          View
        </Button>

        {/* ❌ Profile disabled */}
        <Link href={`/profile/${id}`}>
          <Button 
            size="sm"
            className="flex-1 bg-primary/50 cursor-not-allowed text-primary-foreground"
          >
            Profile
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default WelcomeMemberCard;

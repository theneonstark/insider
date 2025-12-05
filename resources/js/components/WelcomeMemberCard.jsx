import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Star } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { increaseView } from "@/lib/apis";
import { Link } from "@inertiajs/react";

const WelcomeMemberCard = ({
  id,
  featured,
  name,
  industry,
  region,
  tier,
  image,
  views = 0,
  onViewProfile,
  isFeatured
}) => {

  const [viewCount, setViewCount] = useState(Number(views) || 0);
  const { toast } = useToast();

  const handleView = async () => {
  try {
    const res = await increaseView(id);

    const updatedViews = Number(res.data?.views || res.views || views || 0);

    setViewCount(updatedViews);

    if (onViewProfile) {
      onViewProfile({
        id,
        name,
        industry,
        region,
        tier,
        image,
        views: updatedViews
      });
    }

    toast({ description: "+1 view", duration: 2000 });

  } catch (error) {
    console.error("Failed to increase view:", error);
    toast({ description: "Failed to increase view", variant: "destructive" });
  }
};


  return (
    <Card className="relative animate-fade-in hover-lift overflow-hidden">

      {(isFeatured || featured) && (
        <div className="absolute top-2 right-2 bg-yellow-500 text-white p-1 rounded-full shadow-md z-50">
          <Star size={16} />
        </div>
      )}

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
            <p className="text-sm text-muted-foreground">
              {industry?.industryName} {region?.regionName && `(${region.regionName})`}
            </p>
          </div>
          <Badge className="p-1">{tier?.tier_name}</Badge>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Eye className="w-4 h-4" />
          <span>{viewCount} views</span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">

        {/* View Profile Button */}
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={handleView}
        >
          View
        </Button>

        {/* Shine Plus direct profile link */}
        {tier?.tier_name === "Shine Plus" && (
          <Link href={`/profile/${id}`} className="flex-1">
            <Button size="sm" className="w-full bg-primary hover:bg-primary/90 text-white">
              Profile
            </Button>
          </Link>
        )}

      </CardFooter>
    </Card>
  );
};

export default WelcomeMemberCard;
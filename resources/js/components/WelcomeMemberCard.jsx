import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const WelcomeMemberCard = ({ name, title, tier, image, views = 0 }) => {
  const [viewCount, setViewCount] = useState(views);
  const { toast } = useToast();
  
  const tierColors = {
    Shine: "bg-secondary text-secondary-foreground",
    Sparkle: "bg-primary text-primary-foreground",
    Elite: "bg-accent text-accent-foreground"
  };
  
  const handleView = () => {
    setViewCount(prev => prev + 1);
    toast({
      description: "+1 view",
      duration: 2000,
    });
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
            <p className="text-sm text-muted-foreground">{title}</p>
          </div>
          <Badge className={tierColors[tier]}>{tier}</Badge>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Eye className="w-4 h-4" />
          <span>{viewCount} views</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleView}
          className="flex-1"
        >
          View
        </Button>
        <Button 
          size="sm"
          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          Profile
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WelcomeMemberCard;
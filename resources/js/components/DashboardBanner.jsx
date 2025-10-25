import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const DashboardBanner = ({ 
  icon, 
  title, 
  description, 
  ctaText, 
  ctaLink,
  gradient = "linear-gradient(135deg, #FFE9F2 0%, #FFF3F6 100%)"
}) => {
  return (
    <Card 
      className="overflow-hidden border-none shadow-[var(--shadow-card)] animate-fade-in hover:shadow-lg transition-shadow"
      style={{ background: gradient }}
    >
      <div className="p-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="text-4xl">{icon}</div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        <a href={ctaLink}>
          <Button 
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
            size="sm"
          >
            {ctaText}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </a>
      </div>
    </Card>
  );
};

export default DashboardBanner;
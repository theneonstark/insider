import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const MembershipCard = ({ title, price, features = [], highlighted = false, onJoin }) => {
  return (
    <Card className={`w-[395px] sm:w-full animate-fade-in hover-lift relative transition-all ${highlighted ? 'border-2 border-primary shadow-lg' : ''}`}>
      {highlighted && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
            MOST POPULAR
          </span>
        </div>
      )}

      <CardHeader className="pt-8">
        <CardTitle className="text-2xl text-primary">{title}</CardTitle>
        <CardDescription className="text-3xl font-bold text-foreground mt-2">
          {price}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ul className="space-y-3">
          {(Array.isArray(features) ? features : []).map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
          {(!features || features.length === 0) && (
            <li className="text-sm text-muted-foreground italic">No features listed</li>
          )}
        </ul>
      </CardContent>

      <CardFooter>
        <Button
          onClick={onJoin}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
        >
          Join {title}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MembershipCard;
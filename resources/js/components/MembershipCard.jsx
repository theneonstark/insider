import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const MembershipCard = ({ title, price, features, highlighted }) => {
  return (
    <Card className={`animate-fade-in hover-lift ${highlighted ? 'border-2 border-primary shadow-[var(--shadow-hover)]' : ''}`}>
      <CardHeader>
        <CardTitle className="text-2xl text-primary">{title}</CardTitle>
        <CardDescription className="text-3xl font-bold text-foreground mt-2">{price}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          Join {title}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MembershipCard;
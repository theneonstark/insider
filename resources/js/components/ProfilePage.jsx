import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Eye, Mail, Phone, MapPin, Briefcase, Sparkles, Star, Gift } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "@inertiajs/react";

const ProfilePage = ({ profile }) => {
//   const navigate = useNavigate();
  if (!profile) return null;

  // related data
  const services = profile.services || [];
  const testimonials = profile.testimonials || [];
  const offers = profile.offers || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/30 to-background flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/">
            <Button
          variant="ghost"
          className="mb-6 hover:bg-secondary group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Back
        </Button>
        </Link>

        <div className="max-w-5xl mx-auto space-y-8">
          {/* Profile Card */}
          <Card className="overflow-hidden border-2 border-border shadow-[var(--shadow-hover)] animate-fade-in">
            <div className="grid md:grid-cols-5 gap-0">
              {/* Profile Image */}
              <div className="md:col-span-2 relative aspect-[3/4] md:aspect-auto">
                <img
                  src={`/${profile.image}`}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-primary text-primary-foreground shadow-lg">
                    Tier {profile.tier}
                  </Badge>
                </div>
              </div>

              {/* Profile Info */}
              <CardContent className="md:col-span-3 p-8 flex flex-col justify-center space-y-6">
                <div>
                  <h1 className="text-4xl font-bold text-foreground mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {profile.name}
                  </h1>

                  {profile.headline && (
                    <p className="text-2xl text-primary font-semibold mb-3">
                      {profile.headline}
                    </p>
                  )}
                  {profile.tagline && (
                    <p className="italic text-muted-foreground mb-3">
                      “{profile.tagline}”
                    </p>
                  )}

                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{profile.state || "Unknown location"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Eye className="w-4 h-4" />
                    <span>{profile.views} profile views</span>
                  </div>
                </div>

                <Separator />

                {/* Contact Info */}
                <div className="space-y-3">
                  {profile.email && (
                    <div className="flex items-center gap-3 text-foreground hover:text-primary transition-colors cursor-pointer">
                      <Mail className="w-5 h-5" />
                      <span>{profile.email}</span>
                    </div>
                  )}
                  {profile.phone && (
                    <div className="flex items-center gap-3 text-foreground hover:text-primary transition-colors cursor-pointer">
                      <Phone className="w-5 h-5" />
                      <span>{profile.phone}</span>
                    </div>
                  )}
                  {profile.businessType && (
                    <div className="flex items-center gap-3 text-foreground">
                      <Briefcase className="w-5 h-5" />
                      <span>Business Type: {profile.businessType}</span>
                    </div>
                  )}
                </div>

                <Button 
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] transition-all hover-lift"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Let's Connect
                </Button>
              </CardContent>
            </div>
          </Card>

          {/* About Section */}
          {profile.bio && (
            <Card className="border-2 border-border shadow-[var(--shadow-card)] animate-fade-in hover-lift">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">About Me</h2>
                </div>
                <p className="text-foreground leading-relaxed text-lg">
                  {profile.bio}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Services Section */}
          {services.length > 0 && (
            <Card className="border-2 border-border shadow-[var(--shadow-card)] animate-fade-in hover-lift">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-secondary/50 rounded-full">
                    <Briefcase className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">Services</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className="p-4 bg-muted/50 rounded-lg border border-border hover:border-primary transition-colors"
                    >
                      <h3 className="text-lg font-semibold text-primary mb-1">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground">{service.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Testimonials Section */}
          {testimonials.length > 0 && (
            <Card className="border-2 border-border shadow-[var(--shadow-card)] animate-fade-in hover-lift">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-accent/20 rounded-full">
                    <Star className="w-6 h-6 text-accent" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">Testimonials</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {testimonials.map((testimonial) => (
                    <div
                      key={testimonial.id}
                      className="p-6 bg-gradient-to-br from-secondary/30 to-muted/50 rounded-lg border border-border"
                    >
                        <div className="flex gap-1 mb-3">
                            {[...Array(parseInt(testimonial.rating) || 0)].map((_, i) => (
                                <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                            ))}
                        </div>
                      <p className="text-foreground italic mb-4">
                        "{testimonial.message}"
                      </p>
                      <p className="text-primary font-semibold">- {testimonial.name} <span className="font-light text-black">({testimonial.designation})</span></p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Offers Section */}
          {offers.length > 0 && (
            <Card className="border-2 border-primary/50 shadow-[var(--shadow-hover)] animate-fade-in bg-gradient-to-br from-secondary/20 to-background">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-primary rounded-full">
                    <Gift className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">Special Offers</h2>
                </div>
                <div className="space-y-4">
                  {offers.map((offer) => (
                    <div
                      key={offer.id}
                      className="p-6 bg-card rounded-lg border-2 border-primary/30 hover:border-primary transition-all hover-lift"
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <h3 className="text-xl font-bold text-primary">
                          {offer.title}
                        </h3>
                        {offer.badge && (
                          <Badge variant="secondary" className="bg-accent text-accent-foreground">
                            {offer.badge}
                          </Badge>
                        )}
                      </div>
                      <p className="text-foreground">{offer.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfilePage;
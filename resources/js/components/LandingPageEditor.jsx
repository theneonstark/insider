import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Eye, Save } from "lucide-react";
import { toast } from "sonner";

const LandingPageEditor = () => {
  const [aboutMe, setAboutMe] = useState({
    headline: "Marketing Expert & Business Strategist",
    bio: "With over 10 years of experience, I help businesses grow their brand visibility and engagement through strategic marketing campaigns.",
    tagline: "Let's grow your business together"
  });

  const [services, setServices] = useState([
    {
      id: "1",
      title: "Brand Strategy Consultation",
      description: "90-minute deep dive into your brand positioning and market strategy",
      price: "$500"
    },
    {
      id: "2",
      title: "Social Media Management",
      description: "Full-service social media management for up to 3 platforms",
      price: "$1,200/month"
    }
  ]);

  const [testimonials, setTestimonials] = useState([
    {
      id: "1",
      name: "Sarah Johnson",
      role: "CEO, TechStart Inc",
      content: "Amy transformed our marketing strategy. We saw a 300% increase in engagement within 3 months!",
      rating: 5
    },
    {
      id: "2",
      name: "Maria Rodriguez",
      role: "Founder, Creative Studio",
      content: "Professional, insightful, and results-driven. Highly recommend working with Amy!",
      rating: 5
    }
  ]);

  const [offers, setOffers] = useState([
    {
      id: "1",
      title: "New Client Special: 20% Off First Month",
      description: "Book your first consultation this month and get 20% off any service package",
      validUntil: "2025-12-31"
    }
  ]);

  const addService = () => {
    const newService = {
      id: Date.now().toString(),
      title: "",
      description: "",
      price: ""
    };
    setServices([...services, newService]);
  };

  const updateService = (id, field, value) => {
    setServices(services.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const deleteService = (id) => {
    setServices(services.filter(s => s.id !== id));
  };

  const addTestimonial = () => {
    const newTestimonial = {
      id: Date.now().toString(),
      name: "",
      role: "",
      content: "",
      rating: 5
    };
    setTestimonials([...testimonials, newTestimonial]);
  };

  const updateTestimonial = (id, field, value) => {
    setTestimonials(testimonials.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const deleteTestimonial = (id) => {
    setTestimonials(testimonials.filter(t => t.id !== id));
  };

  const addOffer = () => {
    const newOffer = {
      id: Date.now().toString(),
      title: "",
      description: "",
      validUntil: ""
    };
    setOffers([...offers, newOffer]);
  };

  const updateOffer = (id, field, value) => {
    setOffers(offers.map(o => o.id === id ? { ...o, [field]: value } : o));
  };

  const deleteOffer = (id) => {
    setOffers(offers.filter(o => o.id !== id));
  };

  const handleSave = () => {
    toast.success("Landing page updated successfully!", {
      duration: 2000,
    });
  };

  const handlePreview = () => {
    toast.info("Opening preview...", {
      duration: 2000,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-heading">Landing Page Editor</CardTitle>
          <CardDescription>
            Customize your personal landing page to showcase your services and expertise
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3 mb-6">
            <Button 
              onClick={handlePreview}
              variant="outline"
              className="gap-2"
            >
              <Eye className="w-4 h-4" />
              Preview Landing Page
            </Button>
            <Button 
              onClick={handleSave}
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
            >
              <Save className="w-4 h-4" />
              Save & Publish
            </Button>
          </div>

          <Tabs defaultValue="about" className="space-y-6">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="about">About Me</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
              <TabsTrigger value="offers">Offers</TabsTrigger>
            </TabsList>

            {/* About Me Tab */}
            <TabsContent value="about" className="space-y-4">
              <div>
                <Label htmlFor="headline">Headline</Label>
                <Input
                  id="headline"
                  value={aboutMe.headline}
                  onChange={(e) => setAboutMe({ ...aboutMe, headline: e.target.value })}
                  placeholder="Your professional headline"
                />
              </div>
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  rows={6}
                  value={aboutMe.bio}
                  onChange={(e) => setAboutMe({ ...aboutMe, bio: e.target.value })}
                  placeholder="Tell your story..."
                />
              </div>
              <div>
                <Label htmlFor="tagline">Tagline</Label>
                <Input
                  id="tagline"
                  value={aboutMe.tagline}
                  onChange={(e) => setAboutMe({ ...aboutMe, tagline: e.target.value })}
                  placeholder="Your catchy tagline"
                />
              </div>
            </TabsContent>

            {/* Services Tab */}
            <TabsContent value="services" className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Your Services</h3>
                <Button onClick={addService} size="sm" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Service
                </Button>
              </div>
              {services.map((service) => (
                <Card key={service.id} className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 space-y-3">
                        <div>
                          <Label>Service Title</Label>
                          <Input
                            value={service.title}
                            onChange={(e) => updateService(service.id, "title", e.target.value)}
                            placeholder="e.g., Brand Strategy Consultation"
                          />
                        </div>
                        <div>
                          <Label>Description</Label>
                          <Textarea
                            rows={3}
                            value={service.description}
                            onChange={(e) => updateService(service.id, "description", e.target.value)}
                            placeholder="Describe your service..."
                          />
                        </div>
                        <div>
                          <Label>Price</Label>
                          <Input
                            value={service.price}
                            onChange={(e) => updateService(service.id, "price", e.target.value)}
                            placeholder="e.g., $500 or $1,200/month"
                          />
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteService(service.id)}
                        className="ml-2 text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>

            {/* Testimonials Tab */}
            <TabsContent value="testimonials" className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Client Testimonials</h3>
                <Button onClick={addTestimonial} size="sm" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Testimonial
                </Button>
              </div>
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label>Client Name</Label>
                            <Input
                              value={testimonial.name}
                              onChange={(e) => updateTestimonial(testimonial.id, "name", e.target.value)}
                              placeholder="e.g., Sarah Johnson"
                            />
                          </div>
                          <div>
                            <Label>Role/Company</Label>
                            <Input
                              value={testimonial.role}
                              onChange={(e) => updateTestimonial(testimonial.id, "role", e.target.value)}
                              placeholder="e.g., CEO, Company Name"
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Testimonial</Label>
                          <Textarea
                            rows={3}
                            value={testimonial.content}
                            onChange={(e) => updateTestimonial(testimonial.id, "content", e.target.value)}
                            placeholder="What did they say about your work?"
                          />
                        </div>
                        <div>
                          <Label>Rating (1-5)</Label>
                          <Input
                            type="number"
                            min="1"
                            max="5"
                            value={testimonial.rating}
                            onChange={(e) => updateTestimonial(testimonial.id, "rating", parseInt(e.target.value))}
                          />
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteTestimonial(testimonial.id)}
                        className="ml-2 text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>

            {/* Offers Tab */}
            <TabsContent value="offers" className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Promotional Offers</h3>
                <Button onClick={addOffer} size="sm" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Offer
                </Button>
              </div>
              {offers.map((offer) => (
                <Card key={offer.id} className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 space-y-3">
                        <div>
                          <Label>Offer Title</Label>
                          <Input
                            value={offer.title}
                            onChange={(e) => updateOffer(offer.id, "title", e.target.value)}
                            placeholder="e.g., New Client Special: 20% Off"
                          />
                        </div>
                        <div>
                          <Label>Description</Label>
                          <Textarea
                            rows={2}
                            value={offer.description}
                            onChange={(e) => updateOffer(offer.id, "description", e.target.value)}
                            placeholder="Describe your offer..."
                          />
                        </div>
                        <div>
                          <Label>Valid Until</Label>
                          <Input
                            type="date"
                            value={offer.validUntil}
                            onChange={(e) => updateOffer(offer.id, "validUntil", e.target.value)}
                          />
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteOffer(offer.id)}
                        className="ml-2 text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default LandingPageEditor;
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Eye, Save } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { getLandingPage, updateLandingPage } from "@/lib/apis";

const LandingPageEditor = () => {
  const [aboutMe, setAboutMe] = useState({});
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [offers, setOffers] = useState([]);

  // ---------- CRUD HANDLERS ----------
  const addService = () => {
    const newService = { id: Date.now().toString(), title: "", description: "", price: "" };
    setServices([...services, newService]);
  };

  const updateService = (id, field, value) => {
    setServices(services.map(s => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const deleteService = (id) => {
    setServices(services.filter(s => s.id !== id));
  };

  const addTestimonial = () => {
    const newTestimonial = { id: Date.now().toString(), name: "", role: "", content: "", rating: 5 };
    setTestimonials([...testimonials, newTestimonial]);
  };

  const updateTestimonial = (id, field, value) => {
    setTestimonials(testimonials.map(t => (t.id === id ? { ...t, [field]: value } : t)));
  };

  const deleteTestimonial = (id) => {
    setTestimonials(testimonials.filter(t => t.id !== id));
  };

  const addOffer = () => {
    const newOffer = { id: Date.now().toString(), title: "", description: "", validUntil: "" };
    setOffers([...offers, newOffer]);
  };

  const updateOffer = (id, field, value) => {
    setOffers(offers.map(o => (o.id === id ? { ...o, [field]: value } : o)));
  };

  const deleteOffer = (id) => {
    setOffers(offers.filter(o => o.id !== id));
  };

  // 🧩 Helper — format and set response
  const setResponseData = (resData) => {
    setAboutMe(resData.about || {});
    setServices(resData.services || []);
    setTestimonials(
      (resData.testimonials || []).map((t) => ({
        id: t.id?.toString(),
        name: t.name,
        role: t.designation,
        content: t.message,
        rating: t.rating,
      }))
    );
    setOffers(
      (resData.offers || []).map((o) => ({
        id: o.id?.toString(),
        title: o.title,
        description: o.description,
        validUntil: o.valid_until || null,
      }))
    );
  };

  // 🧠 Fetch function (can be reused)
  const fetchLandingPage = async () => {
    try {
      toast.loading("Fetching landing page data...", { id: "fetching" });
      const response = await getLandingPage(); // 👈 yahi se fetch hoga
      if (response.status === 200 && response.data?.data) {
        setResponseData(response.data.data);
        toast.success("Data loaded successfully", { id: "fetching" });
      } else {
        toast.error("Failed to fetch landing page", { id: "fetching" });
      }
    } catch (error) {
      console.error("Error fetching landing page:", error);
      toast.error("Something went wrong while fetching data", { id: "fetching" });
    }
  };

  // 📦 On mount — call fetchLandingPage
  useEffect(() => {
    fetchLandingPage();
  }, []);

  // 💾 Save handler
  const handleSave = async () => {
    try {
      toast.loading("Saving landing page...", { id: "saving" });

      const payload = [
        { type: "about", data: aboutMe },
        { type: "service", data: services },
        { type: "testimonial", data: testimonials },
        { type: "offer", data: offers },
      ];

      const response = await updateLandingPage(payload);
      if (response.status === 200) {
        toast.success("Landing page updated successfully!", { id: "saving" });

        // ✅ After update — refetch latest data
        await fetchLandingPage();
      } else {
        toast.error("Failed to update landing page", { id: "saving" });
      }
    } catch (error) {
      console.error("Error saving landing page:", error);
      toast.error("Something went wrong while saving", { id: "saving" });
    }
  };

  const handlePreview = () => toast("Opening preview...");


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
            <Button onClick={handlePreview} variant="outline" className="gap-2">
              <Eye className="w-4 h-4" /> Preview
            </Button>
            <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
              <Save className="w-4 h-4" /> Save & Publish
            </Button>
          </div>

          <Tabs defaultValue="about" className="space-y-6">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="about">About Me</TabsTrigger>
              <TabsTrigger value="services">Products / Services</TabsTrigger>
              <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
              <TabsTrigger value="offers">Offers</TabsTrigger>
            </TabsList>

            {/* About Me */}
            <TabsContent value="about" className="space-y-4">
              {/* <div>
                <Label>Headline</Label>
                <Input
                  value={aboutMe.headline || ""}
                  onChange={(e) => setAboutMe({ ...aboutMe, headline: e.target.value })}
                  placeholder="Your professional headline"
                />
              </div> */}
              <div>
                <Label>Bio</Label>
                <Textarea
                  rows={6}
                  value={aboutMe.bio || ""}
                  onChange={(e) => setAboutMe({ ...aboutMe, bio: e.target.value })}
                  placeholder="Tell your story..."
                />
              </div>
              {/* <div>
                <Label>Tagline</Label>
                <Input
                  value={aboutMe.tagline || ""}
                  onChange={(e) => setAboutMe({ ...aboutMe, tagline: e.target.value })}
                  placeholder="Your catchy tagline"
                />
              </div> */}
            </TabsContent>

            {/* Services */}
            <TabsContent value="services" className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">My Favorite Product / Services</h3>
                <Button onClick={addService} size="sm" className="gap-2">
                  <Plus className="w-4 h-4" /> Add
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
                        {/* <div>
                          <Label>Price</Label>
                          <Input
                            value={service.price}
                            onChange={(e) => updateService(service.id, "price", e.target.value)}
                            placeholder="e.g., $500"
                          />
                        </div> */}
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => deleteService(service.id)} className="ml-2 text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>

            {/* Testimonials */}
            <TabsContent value="testimonials" className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Client Testimonials</h3>
                <Button onClick={addTestimonial} size="sm" className="gap-2">
                  <Plus className="w-4 h-4" /> Add
                </Button>
              </div>
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label>Name</Label>
                            <Input
                              value={testimonial.name}
                              onChange={(e) => updateTestimonial(testimonial.id, "name", e.target.value)}
                            />
                          </div>
                          <div>
                            <Label>Role/Company</Label>
                            <Input
                              value={testimonial.role}
                              onChange={(e) => updateTestimonial(testimonial.id, "role", e.target.value)}
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Content</Label>
                          <Textarea
                            rows={3}
                            value={testimonial.content}
                            onChange={(e) => updateTestimonial(testimonial.id, "content", e.target.value)}
                          />
                        </div>
                        <div>
                          {/* <Label>Rating</Label> */}
                          <Input
                            type="hidden"
                            min="1"
                            max="5"
                            value={5}
                            onChange={(e) => updateTestimonial(testimonial.id, "rating", e.target.value)}
                          />
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => deleteTestimonial(testimonial.id)} className="ml-2 text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>

            {/* Offers */}
            <TabsContent value="offers" className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Promotional Offers</h3>
                <Button onClick={addOffer} size="sm" className="gap-2">
                  <Plus className="w-4 h-4" /> Add
                </Button>
              </div>
              {offers.map((offer) => (
                <Card key={offer.id} className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 space-y-3">
                        <div>
                          <Label>Title</Label>
                          <Input
                            value={offer.title}
                            onChange={(e) => updateOffer(offer.id, "title", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Description</Label>
                          <Textarea
                            rows={2}
                            value={offer.description}
                            onChange={(e) => updateOffer(offer.id, "description", e.target.value)}
                          />
                        </div>
                        {/* <div>
                          <Label>Valid Until</Label>
                          <Input
                            type="date"
                            value={offer.validUntil || ""}
                            onChange={(e) => updateOffer(offer.id, "validUntil", e.target.value)}
                          />
                        </div> */}
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => deleteOffer(offer.id)} className="ml-2 text-destructive">
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

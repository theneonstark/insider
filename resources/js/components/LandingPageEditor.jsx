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
import { usePage } from "@inertiajs/react";

const LandingPageEditor = ({ setActiveSection }) => {
  const {props} = usePage();
  const user_tier = props.user.tier_name;

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
      const response = await getLandingPage(); // 👈 yahi se fetch hoga
      if (response.status === 200 && response.data?.data) {
        setResponseData(response.data.data);
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

    {/* Main Card */}
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl font-heading">
          Landing Page Editor
        </CardTitle>
        <CardDescription className="text-sm sm:text-base">
          Customize your personal landing page to showcase your services & expertise
        </CardDescription>
      </CardHeader>

      {user_tier === "Shine Plus" ? (
        <CardContent className="space-y-6">

          {/* Save + Preview Buttons Row */}
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <Button
              onClick={handleSave}
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 w-full sm:w-auto"
            >
              <Save className="w-4 h-4" /> Save & Publish
            </Button>
          </div>

          {/* TABS */}
          <Tabs defaultValue="about" className="space-y-6">
            
            {/* Tabs list responsive */}
            <TabsList className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full mb-10">
              <TabsTrigger value="about">About Me</TabsTrigger>
              <TabsTrigger value="services">Products / Services</TabsTrigger>
              <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
              <TabsTrigger value="offers">Offers</TabsTrigger>
            </TabsList>

            {/* ---------- ABOUT ME ---------- */}
            <TabsContent value="about" className="space-y-4">
              <div>
                <Label>Bio</Label>
                <Textarea
                  rows={6}
                  className="min-h-[120px] sm:min-h-[150px]"
                  value={aboutMe.bio || ""}
                  onChange={(e) =>
                    setAboutMe({ ...aboutMe, bio: e.target.value })
                  }
                  placeholder="Tell your story..."
                />
              </div>
            </TabsContent>

            {/* ---------- SERVICES ---------- */}
            <TabsContent value="services" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-base sm:text-lg">
                  My Favorite Product / Services
                </h3>
                <Button size="sm" onClick={addService} className="gap-2">
                  <Plus className="w-4 h-4" /> Add
                </Button>
              </div>

              {services.map((service) => (
                <Card
                  key={service.id}
                  className="p-3 sm:p-4 rounded-xl shadow-sm"
                >
                  <div className="flex flex-col gap-4">
                    <div className="">
                      <Label>Service Title</Label>
                      <Input
                        className="mt-1"
                        value={service.title}
                        onChange={(e) =>
                          updateService(service.id, "title", e.target.value)
                        }
                        placeholder="Service title..."
                      />
                    </div>

                    <div>
                      <Label>Description</Label>
                      <Textarea
                        rows={3}
                        className="min-h-[90px] sm:min-h-[110px]"
                        value={service.description}
                        onChange={(e) =>
                          updateService(
                            service.id,
                            "description",
                            e.target.value
                          )
                        }
                        placeholder="Description..."
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteService(service.id)}
                        className="text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>

            {/* ---------- TESTIMONIALS ---------- */}
            <TabsContent value="testimonials" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-base sm:text-lg">
                  Client Testimonials
                </h3>
                <Button size="sm" onClick={addTestimonial} className="gap-2">
                  <Plus className="w-4 h-4" /> Add
                </Button>
              </div>

              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="p-3 sm:p-4 rounded-xl shadow">
                  <div className="space-y-4">

                    {/* Name & Role grid responsive */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <Label>Name</Label>
                        <Input
                          className="mt-1"
                          value={testimonial.name}
                          onChange={(e) =>
                            updateTestimonial(
                              testimonial.id,
                              "name",
                              e.target.value
                            )
                          }
                        />
                      </div>

                      <div>
                        <Label>Role / Company</Label>
                        <Input
                          className="mt-1"
                          value={testimonial.role}
                          onChange={(e) =>
                            updateTestimonial(
                              testimonial.id,
                              "role",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Content</Label>
                      <Textarea
                        rows={3}
                        className="min-h-[90px] sm:min-h-[110px]"
                        value={testimonial.content}
                        onChange={(e) =>
                          updateTestimonial(
                            testimonial.id,
                            "content",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteTestimonial(testimonial.id)}
                        className="text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>

            {/* ---------- OFFERS ---------- */}
            <TabsContent value="offers" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-base sm:text-lg">
                  Promotional Offers
                </h3>
                <Button size="sm" onClick={addOffer} className="gap-2">
                  <Plus className="w-4 h-4" /> Add
                </Button>
              </div>

              {offers.map((offer) => (
                <Card key={offer.id} className="p-3 sm:p-4 rounded-xl shadow">
                  <div className="space-y-4">
                    <div>
                      <Label>Title</Label>
                      <Input
                        className="mt-1"
                        value={offer.title}
                        onChange={(e) =>
                          updateOffer(offer.id, "title", e.target.value)
                        }
                      />
                    </div>

                    <div>
                      <Label>Description</Label>
                      <Textarea
                        rows={2}
                        className="min-h-[80px]"
                        value={offer.description}
                        onChange={(e) =>
                          updateOffer(offer.id, "description", e.target.value)
                        }
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteOffer(offer.id)}
                        className="text-destructive"
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
      ) : (
        <div className="py-10 text-center text-muted-foreground border rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Upgrade Required</h2>
          <p className="mb-4">
            Editing your landing page requires a Shine Plus membership.
          </p>
          <Button 
            onClick={() => setActiveSection("membership")}
            className="bg-primary text-white px-6 py-2 rounded-md"
          >
            Upgrade Now
          </Button>
        </div>
      )}
    </Card>
  </div>
);

};

export default LandingPageEditor;

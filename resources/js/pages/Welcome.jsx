import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MembershipCard from "@/components/MembershipCard";
import MemberCard from "@/components/MemberCard";
import SearchFilters from "@/components/SearchFilters";
import ProfileViewModal from "@/components/ProfileViewModal";
import { Link, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { Data, filter, getAds, membershipPlans, shinePlusUser, shineUser, sparkleUser } from "@/lib/apis";
import toast, { Toaster } from "react-hot-toast";
import PaymentModal from "@/components/PaymentModal";
import WelcomeMemberCard from "@/components/WelcomeMemberCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import Autoplay from "embla-carousel-autoplay";

const Welcome = () => {
  const { props } = usePage(); // if using Inertia
  const user = props.auth?.user; // logged-in user
  const [filters, setFilters] = useState({ industry: [], region: [] });
  const [loading, setLoading] = useState(true);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState(null);
  const [members, setMembers] = useState([]);
  const [searching, setSearching] = useState(false);
  const [viewProfileOpen, setViewProfileOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [sparkleMembers, setSparkleMembers] = useState([]);
  const [shineMembers, setShineMembers] = useState([]);
  const [shinePlusMembers, setShinePlusMembers] = useState([]);


  const [plans, setPlans] = useState([]);
  const [runningAds, setRunningAds] = useState([]);

  // 🧠 Fetch plans from API
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await membershipPlans();
        if (res.status === 200 && res.data.data) {
          // 🧠 Parse and normalize data
          const parsedPlans = res.data.data.map((plan) => ({
            id: plan.id,
            title: plan.tier_name,
            price: plan.price,
            // feature is a stringified JSON array, so parse it safely
            features:
              typeof plan.feature === "string"
                ? JSON.parse(plan.feature)
                : plan.feature,
            highlighted: Boolean(plan.highlighted),
          }));

          setPlans(parsedPlans);
        } else {
          toast.error("Failed to load membership plans");
        }
      } catch (error) {
        console.error("Error fetching membership plans:", error);
        toast.error("Something went wrong while fetching plans");
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);
  


  useEffect(() => {
    const loadFilters = async () => {
      try {
        const result = await Data();
        
        if (result.status) {
          setFilters({
            industry: result?.data?.industry || [],
            region: result?.data?.region || []
          });
        }
      } catch (err) {
        console.error("Filters load nahi hue:", err);
        // fallback empty arrays
        setFilters({ industry: [], region: [] });
      } finally {
        setLoading(false);
      }
    };

    loadFilters();
  }, []);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const result = await Data();
        if (result.status) {
          setFilters({
            industry: result?.data?.industry || [],
            region: result?.data?.region || [],
          });
        }

        // 🧠 Fetch all users (excluding admins)
        const res = await filter({});
        if (res.status === 200 && res.data.status) {
          const users = res.data.data.filter((u) => u.role !== "admin");
          setMembers(users);
        }
      } catch (error) {
        console.error("Error loading data:", error);
        toast.error("Failed to load members");
      } finally {
        setLoading(false);
      }
    };
    loadInitialData();
  }, []);

  useEffect(() => {
  const loadSparkle = async () => {
    try {
      const res = await sparkleUser();
      if (res.status === 200) {
        setSparkleMembers(res.data.data || []);
      }
    } catch (err) {
      console.error("Sparkle users error:", err);
    }
  };

  loadSparkle();
  }, []);

  useEffect(() => {
  const loadShine = async () => {
    try {
      const res = await shineUser();
      if (res.status === 200) {
        setShineMembers(res.data.data || []);
      }
    } catch (err) {
      console.error("Sparkle users error:", err);
    }
  };

  loadShine();
  }, []);

  useEffect(() => {
    const loadShinePlus = async () => {
      try {
        const res = await shinePlusUser();
        if (res.status === 200) {
          setShinePlusMembers(res.data.data || []);
        }
      } catch (err) {
        console.error("Sparkle users error:", err);
      }
    };

    loadShinePlus();
  }, []);

  // 🧠 Handle Search Filters
  const handleSearch = async (searchFilters) => {
    setSearching(true);
    try {
      const res = await filter(searchFilters);
      if (res.status === 200 && res.data.status) {
        const users = res.data.data.filter((u) => u.role !== "admin");
        setMembers(users);

        if (users.length > 0) {
          toast.success(`${users.length} result${users.length > 1 ? "s" : ""} found`);
        } else {
          toast.error("No results found");
        }
      }
    } catch (error) {
      console.error("Search failed:", error);
      toast.error("Search failed. Please try again.");
    } finally {
      setSearching(false);
    }
  };

  const handleJoinTier = (tier) => {
    if(user){
      setSelectedTier(tier);
      setPaymentModalOpen(true);
    }else {
      window.location.href = '/login';
    }
  };

  const handleViewProfile = (member) => {
    setSelectedProfile(member);
    setViewProfileOpen(true);
  };

  const fetchRunningAds = async () => {
    try {
      const res = await getAds();

      if (res.data.status) {
        setRunningAds(res.data.data);  // all ads from backend
      }

    } catch (error) {
      console.log("Failed to fetch running ads", error);
    }
  };

  useEffect(() => {
    fetchRunningAds();
  }, []);
  

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
        <div className="container mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-heading mb-6 text-foreground">
                Connect. Be Seen.<br/>Expand Your Network.
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Join a community of ambitious women and amplify your visibility while opening doors for new opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[var(--shadow-card)] w-full sm:w-auto">
                    Join the Community
                  </Button>
                </Link>
                {/* <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Get Matched
                </Button> */}
              </div>
            </div>
            <div className="animate-scale-in">
              <img 
                src={'/assets/hero-women.jpg'} 
                alt="Two confident women entrepreneurs" 
                className="rounded-3xl shadow-[var(--shadow-soft)] w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Your Story Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-4xl font-heading mb-6 text-foreground">Your Stage, Your Story</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Insiders Index is your platform to grow, connect, and shine. Participate in events, 
                connect with business besties, and showcase your success.
              </p>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Join the Movement
              </Button>
            </div>
            <div className="order-1 md:order-2">
              <img 
                src={'/assets/story-section.jpg'} 
                alt="Women collaborating" 
                className="rounded-3xl shadow-[var(--shadow-soft)] w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Membership Tiers */}
      {!user?.tier_id && (
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-heading mb-4 text-foreground">
                Become an Insider Today!
              </h2>
              <p className="text-lg text-muted-foreground">
                Choose your preferred level of visibility.
              </p>
            </div>

            {loading ? (
              <div className="text-center text-muted-foreground py-12">
                Loading plans...
              </div>
            ) : plans.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {plans.map((tier, index) => (
                  <MembershipCard
                    key={index}
                    title={tier.title || tier.name}
                    price={`$${tier.price} / year`}
                    features={tier.features || []}
                    highlighted={tier.highlighted || false}
                    onJoin={() => handleJoinTier(tier)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-12">
                No plans available.
              </div>
            )}
          </div>
        </section>
      )}

      {/* Search & Listing */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading mb-4 text-foreground">Find a Superstar</h2>
            <p className="text-lg text-muted-foreground">Use the filters below to search by name, location, or industry</p>
          </div>

          <div className="max-w-3xl mx-auto mb-12">
            {loading ? (
              <div className="text-center py-4">Loading filters...</div>
            ) : (
              <SearchFilters
                industries={filters.industry}
                regions={filters.region}
                onSearch={handleSearch}
              />
            )}
          </div>

          {/* 🧾 Search Results */}
          {searching ? (
            <div className="text-center py-8 text-muted-foreground">Searching members...</div>
          ) : members.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {members.map((member, index) => (
                <WelcomeMemberCard key={index} {...member} onViewProfile={() => handleViewProfile(member)}/>                
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-8">
              No members found. Try another filter.
            </div>
          )}
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-heading text-center mb-12 text-foreground">
            Meet the Women Who Sparkle
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {sparkleMembers.length > 0 ? (
              sparkleMembers.map((member, index) => (
                <WelcomeMemberCard
                  key={index}
                  {...member}
                  onViewProfile={() => handleViewProfile(member)}
                />
              ))
            ) : (
              <div className="text-center text-muted-foreground col-span-full">
                No sparkle members found.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Shine Queens */}
      <section className="py-20 bg-accent">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-heading text-center mb-4 text-accent-foreground">
            Meet the Women Who Shine
          </h2>
          <p className="text-center text-lg mb-12 text-accent-foreground/80">
            Recognizing women who shine in our community through active participation and engagement
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {shineMembers.map((member, index) => (
              <WelcomeMemberCard key={index} {...member} views={member.views} onViewProfile={() => handleViewProfile(member)}/>
            ))}
          </div>
        </div>
      </section>
          
      {/* Shine Plus Users */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-heading text-center mb-12 text-foreground">
            Top-Tier Insiders
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {sparkleMembers.length > 0 ? (
              shinePlusMembers.map((member, index) => (
                <WelcomeMemberCard
                  key={index}
                  {...member}
                  onViewProfile={() => handleViewProfile(member)}
                />
              ))
            ) : (
              <div className="text-center text-muted-foreground col-span-full">
                No sparkle members found.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Three Steps */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-heading text-center mb-12 text-foreground">
            Three Simple Steps to Become an Insider
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { num: "1", text: "Pick your plan." },
              { num: "2", text: "Customize your profile." },
              { num: "3", text: "Get discovered by new clients." }
            ].map((step, index) => (
              <div key={index} className="text-center animate-fade-in">
                <div className="w-24 h-24 rounded-full bg-primary text-primary-foreground text-4xl font-bold flex items-center justify-center mx-auto mb-6 shadow-[var(--shadow-card)]">
                  {step.num}
                </div>
                <p className="text-lg">{step.text}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/signup">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Become an Insider
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-2xl italic mb-6 text-foreground">
              "After joining She Sparkle, I booked 5 new clients within weeks!"
            </p>
            <p className="text-lg text-muted-foreground">— Sarah, Creative Consultant</p>
          </div>
        </div>
      </section>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Active Campaigns</CardTitle>
          <CardDescription className="text-center">View all running ads</CardDescription>
        </CardHeader>

        <CardContent>
          <Carousel 
          className="w-full" 
          opts={{
            align: "start",
            loop: true,
          }} plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
          >
            <CarouselContent className="-ml-2">
              {runningAds.filter(ad => ad.active).map((ad) => (
                <CarouselItem key={ad.id} className="pl-2 md:basis-1/2 lg:basis-1/3">
                  <Card className="p-4 border border-border/60 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col gap-4">

                      {/* IMAGE */}
                      {ad.image && (
                        <div className="w-full h-40 rounded-lg overflow-hidden bg-muted border">
                          <img
                            src={ad.image}
                            alt={ad.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      {/* TEXT CONTENT */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-foreground truncate">{ad.title}</h3>

                          <Badge variant={ad.createdBy === "admin" ? "default" : "secondary"}>
                            {ad.createdBy === "admin" ? "Platform" : "User"}
                          </Badge>
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                          {ad.description}
                        </p>

                        {/* TAGS */}
                        <div className="flex gap-2 flex-wrap mb-2">
                          {ad.state && (
                            <Badge variant="outline" className="text-xs">{ad.state}</Badge>
                          )}
                          {ad.industry && (
                            <Badge variant="outline" className="text-xs">{ad.industry}</Badge>
                          )}
                        </div>

                        {/* LINK */}
                        {ad.link && (
                          <a
                            href={ad.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline inline-block"
                          >
                            Learn More →
                          </a>
                        )}
                      </div>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Buttons */}
            <CarouselPrevious className="left-2 -translate-x-0" />
            <CarouselNext className="right-2 translate-x-0" />
          </Carousel>
        </CardContent>
      </Card>

      {/* CTA Band */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-heading mb-4">It's Your Time to Shine!</h2>
          {/* <p className="text-xl mb-8">Join She Shine or She Sparkle today and start your journey</p> */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Click here to create your profile.
              </Button>
            </Link>
            {/* <Link href="/signup">
              <Button size="lg" variant="outline" className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary w-full sm:w-auto">
                Join She Sparkle
              </Button>
            </Link> */}
          </div>
        </div>
      </section>

      <Footer />
      <Toaster/>

      <PaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        tier={selectedTier}
      />

      <ProfileViewModal
        profile={selectedProfile}
        open={viewProfileOpen}
        onOpenChange={setViewProfileOpen}
        onViewIncrement={() => {
          if (selectedProfile) {
            setSelectedProfile({...selectedProfile, views: selectedProfile.views});
          }
        }}
      />
    </div>
  );
};

export default Welcome;
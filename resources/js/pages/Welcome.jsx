import { useEffect, useState } from "react";
import { Link, usePage } from "@inertiajs/react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchFilters from "@/components/SearchFilters";
import WelcomeMemberCard from "@/components/WelcomeMemberCard";
import MembershipCard from "@/components/MembershipCard";
import ProfileViewModal from "@/components/ProfileViewModal";
import PaymentModal from "@/components/PaymentModal";

import {
  Data,
  allUsers,
  filter,
  membershipPlans,
  sparkleUser,
  shineUser,
  shinePlusUser,
  getAds
} from "@/lib/apis";

import toast, { Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Badge } from "@/components/ui/badge";

const Welcome = () => {
  const { props } = usePage();
  const user = props.auth?.user;

  // STATES
  const [filters, setFilters] = useState({ industry: [], region: [] });
  const [loading, setLoading] = useState(true);
  const [plans, setPlans] = useState([]);

  const [members, setMembers] = useState([]);
  const [searching, setSearching] = useState(false);

  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState(null);

  const [viewProfileOpen, setViewProfileOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const [sparkleMembers, setSparkleMembers] = useState([]);
  const [shineMembers, setShineMembers] = useState([]);
  const [shinePlusMembers, setShinePlusMembers] = useState([]);
  const [runningAds, setRunningAds] = useState([]);

  // LOAD DEFAULT 3 USERS (featured + shuffled)
  const loadAllUsers = async () => {
    try {
      const res = await allUsers();
      
      if (res.data.status) {
        setMembers(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadAllUsers();
  }, []);

  // LOAD FILTERS
  useEffect(() => {
    const loadFilters = async () => {
      try {
        const res = await Data();
        if (res.status) {
          setFilters({
            industry: res.data.industry,
            region: res.data.region
          });
        }
      } catch {
        toast.error("Failed to load filters");
      } finally {
        setLoading(false);
      }
    };
    loadFilters();
  }, []);

  // LOAD PLANS
  useEffect(() => {
    const loadPlans = async () => {
      try {
        const res = await membershipPlans();
        if (res.status === 200) {
          setPlans(
            res.data.data.map((p) => ({
              id: p.id,
              title: p.tier_name,
              price: p.price,
              features: typeof p.feature === "string" ? JSON.parse(p.feature) : p.feature,
              highlighted: Boolean(p.highlighted)
            }))
          );
        }
      } catch {
        toast.error("Failed to load plans");
      }
    };
    loadPlans();
  }, []);

  // LOAD FEATURED USERS
  useEffect(() => {
    sparkleUser().then((r) => setSparkleMembers(r.data?.data || []));
    shineUser().then((r) => setShineMembers(r.data?.data || []));
    shinePlusUser().then((r) => setShinePlusMembers(r.data?.data || []));
  }, []);

  // LOAD ADS
  useEffect(() => {
    getAds().then((res) => {
      if (res.data.status) setRunningAds(res.data.data);
    });
  }, []);

  // SEARCH LOGIC (IMPORTANT)
  const handleSearch = async (searchFilters) => {
    setSearching(true);

    const hasFilters =
      (searchFilters.name && searchFilters.name.trim() !== "") ||
      (searchFilters.industry && searchFilters.industry !== "") ||
      (searchFilters.location && searchFilters.location !== "");

    // If no filters → Load default
    if (!hasFilters) {
      await loadAllUsers();
      setSearching(false);
      return;
    }

    try {
      const res = await filter(searchFilters);

      if (res.status === 200 && res.data.status) {
        const users = res.data.data.filter((u) => u.role !== "admin");
        setMembers(users);
      } else {
        setMembers([]); // No results
      }
    } catch (err) {
      console.error(err);
      toast.error("Search failed");
    }

    setSearching(false);
  };


  const handleJoinTier = (tier) => {
    if (!user) return (window.location.href = "/login");
    setSelectedTier(tier);
    setPaymentModalOpen(true);
  };

  const handleViewProfile = (member) => {
    // member is the updated object from the card
    setSelectedProfile({
      ...member,
      views: Number(member.views) // guarantee it's a number
    });
    setViewProfileOpen(true);
  };

  

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

              <Carousel className="w-full max-w-6xl mx-auto" 
                opts={{
                  align: "start",
                  loop: true,
                }} plugins={[
                  Autoplay({
                    delay: 2000,
                  }),
                ]}
              >
                <CarouselContent className="mt-4 -ml-2 md:-ml-4" >
                  {plans.map((tier, index) => (
                    <CarouselItem 
                      key={index} 
                      className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                    >
                      <MembershipCard
                        title={tier.title || tier.name}
                        price={`$${tier.price} / year`}
                        features={tier.features || []}
                        highlighted={tier.highlighted || false}
                        onJoin={() => handleJoinTier(tier)}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>

                <CarouselPrevious className="hidden sm:flex"/>
                <CarouselNext className="hidden sm:flex"/>
              </Carousel>

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
            <h2 className="text-4xl font-heading">Find a Superstar</h2>
          </div>

          <div className="max-w-3xl mx-auto mb-12">
            <SearchFilters
              industries={filters.industry}
              regions={filters.region}
              onSearch={handleSearch}
            />
          </div>

          {searching ? (
              <div className="text-center py-8">Searching...</div>
            ) : (
              <div className="grid md:grid-cols-3 gap-8">
                {members.map((m, i) => {
                  const isFeatured =
                    m.featured === true &&
                    m.featured_valid &&
                    new Date(m.featured_valid) > new Date();

                  return (
                    <WelcomeMemberCard
                      key={i}
                      {...m}
                      isFeatured={isFeatured}   // ⭐ PASS FEATURE FLAG
                      onViewProfile={() => handleViewProfile(m)}
                    />
                  );
                })}
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
            <CarouselPrevious className="left-2 hidden -translate-x-0" />
            <CarouselNext className="right-2 hidden translate-x-0" />
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
      />
    </div>
  );
};

export default Welcome;
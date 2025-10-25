import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MembershipCard from "@/components/MembershipCard";
import MemberCard from "@/components/MemberCard";
import SearchFilters from "@/components/SearchFilters";
import heroImage from "@/assets/hero-women.jpg";
import storyImage from "@/assets/story-section.jpg";
import profileAmy from "@/assets/profile-amy.jpg";
import profileShawna from "@/assets/profile-shawna.jpg";
import profileTonya from "@/assets/profile-tonya.jpg";
import { Link } from "@inertiajs/react";

const Welcome = () => {
  const membershipTiers = [
    {
      title: "She Shine",
      price: "$25 / month",
      features: [
        "Basic listing and visibility",
        "Access to member chat (limited)",
        "Add personal details and business info"
      ]
    },
    {
      title: "She Sparkle",
      price: "$50 / month",
      features: [
        "Priority listing placement",
        "Unlimited chat access",
        "Featured badge on profile"
      ],
      highlighted: true
    },
    {
      title: "Premium Elite",
      price: "$200 / year",
      features: [
        "Full access to custom landing page editor",
        "Add services, testimonials, and portfolio",
        "Top placement and advanced visibility"
      ]
    }
  ];
  
  const dummyMembers = [
    { name: "Amy A.", title: "Marketing Expert", tier: "Sparkle", image: profileAmy, views: 124 },
    { name: "Shawna A.", title: "Creative Director", tier: "Shine", image: profileShawna, views: 89 },
    { name: "Tonya D.", title: "Business Coach", tier: "Sparkle", image: profileTonya, views: 156 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
        <div className="container mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-heading mb-6 text-foreground">
                Connect. Be Seen. Grow Your Business Network.
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Join a community of ambitious women and amplify your visibility while opening doors for new opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[var(--shadow-card)] w-full sm:w-auto">
                    Join the Community
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Get Matched
                </Button>
              </div>
            </div>
            <div className="animate-scale-in">
              <img 
                src={heroImage} 
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
                network with peers, and showcase your success.
              </p>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Join the Movement
              </Button>
            </div>
            <div className="order-1 md:order-2">
              <img 
                src={storyImage} 
                alt="Women collaborating" 
                className="rounded-3xl shadow-[var(--shadow-soft)] w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading mb-4 text-foreground">Your Stage, Your Story</h2>
            <p className="text-lg text-muted-foreground">Choose the plan that fits your journey</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {membershipTiers.map((tier, index) => (
              <MembershipCard key={index} {...tier} />
            ))}
          </div>
        </div>
      </section>

      {/* Search & Listing */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading mb-4 text-foreground">Find a Superstar</h2>
            <p className="text-lg text-muted-foreground">Use the filters below to search by name, location, or industry</p>
          </div>
          
          <div className="max-w-3xl mx-auto mb-12">
            <SearchFilters />
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {dummyMembers.map((member, index) => (
              <MemberCard key={index} {...member} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-heading text-center mb-12 text-foreground">
            Meet the Women Who Sparkle
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {dummyMembers.map((member, index) => (
              <MemberCard key={index} {...member} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Active Queens */}
      <section className="py-20 bg-accent">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-heading text-center mb-4 text-accent-foreground">
            Top Active Queens
          </h2>
          <p className="text-center text-lg mb-12 text-accent-foreground/80">
            Recognizing women who shine in the community through active participation and engagement
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {dummyMembers.map((member, index) => (
              <MemberCard key={index} {...member} views={member.views + 50} />
            ))}
          </div>
        </div>
      </section>

      {/* Three Steps */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-heading text-center mb-12 text-foreground">
            Three Simple Steps to Shine
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { num: "1", text: "Pick She Shine or She Sparkle plan" },
              { num: "2", text: "Create your bio, story, services, and testimonials" },
              { num: "3", text: "Get discovered every day by women after events" }
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
            <Link to="/signup">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Start Your Shine Today
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

      {/* CTA Band */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-heading mb-4">It's Your Time to Shine</h2>
          <p className="text-xl mb-8">Join She Shine or She Sparkle today and start your journey</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Join She Shine
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="lg" variant="outline" className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary w-full sm:w-auto">
                Join She Sparkle
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Welcome;
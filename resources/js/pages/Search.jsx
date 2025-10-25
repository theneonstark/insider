import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchFilters from "@/components/SearchFilters";
import MemberCard from "@/components/MemberCard";
import profileAmy from "@/assets/profile-amy.jpg";
import profileShawna from "@/assets/profile-shawna.jpg";
import profileTonya from "@/assets/profile-tonya.jpg";

const Search = () => {
  const allMembers = [
    { name: "Amy A.", title: "Marketing Expert", tier: "Sparkle", image: profileAmy, views: 124 },
    { name: "Shawna A.", title: "Creative Director", tier: "Shine", image: profileShawna, views: 89 },
    { name: "Tonya D.", title: "Business Coach", tier: "Sparkle", image: profileTonya, views: 156 },
    { name: "Amy A.", title: "Marketing Expert", tier: "Elite", image: profileAmy, views: 200 },
    { name: "Shawna A.", title: "Creative Director", tier: "Shine", image: profileShawna, views: 95 },
    { name: "Tonya D.", title: "Business Coach", tier: "Sparkle", image: profileTonya, views: 178 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-heading text-center mb-4 text-foreground">
            Find a Superstar
          </h1>
          <p className="text-center text-lg text-muted-foreground mb-12">
            Search Results
          </p>
          
          <div className="max-w-3xl mx-auto mb-12">
            <SearchFilters />
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {allMembers.map((member, index) => (
              <MemberCard key={index} {...member} />
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Search;
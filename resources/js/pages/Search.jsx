import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchFilters from "@/components/SearchFilters";
import MemberCard from "@/components/MemberCard";
import { Data } from "@/lib/apis"; // ✅ for industry & region
import toast from "react-hot-toast";

const Search = () => {
  const [members, setMembers] = useState([]); // 🧠 search results
  const [dropdownData, setDropdownData] = useState({ industry: [], region: [] });
  const [loading, setLoading] = useState(true);

  // 🟢 Fetch dropdown data (industry & region)
  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const res = await Data();
        if (res.status === 200 && res.data.status === true) {
          setDropdownData({
            industry: res.data.industry || [],
            region: res.data.region || [],
          });
        } else {
          toast.error("Failed to load filters");
        }
      } catch (error) {
        console.error("Dropdown fetch error:", error);
        toast.error("Unable to load filters");
      } finally {
        setLoading(false);
      }
    };

    fetchDropdowns();
  }, []);

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

          {/* 🧭 Filters */}
          <div className="max-w-3xl mx-auto mb-12">
            {loading ? (
              <div className="text-center py-10 text-muted-foreground">
                Loading filters...
              </div>
            ) : (
              <SearchFilters
                industries={dropdownData.industry}
                regions={dropdownData.region}
                onResults={(data) => setMembers(data)} // 👈 real search results
              />
            )}
          </div>

          {/* 🧩 Results */}
          {members.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {members.map((member, index) => (
                <MemberCard
                  key={index}
                  name={member.name}
                  title={member.business_type || "No title"}
                  tier={member.tier || "Member"}
                  image={
                    member.image
                      ? `${import.meta.env.VITE_APP_URL}/${member.image}`
                      : "/assets/default-profile.png"
                  }
                  views={member.views || 0}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-20">
              No members found. Try a different search.
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Search;
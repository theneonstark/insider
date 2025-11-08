import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchFilters from "@/components/SearchFilters";
import MemberCard from "@/components/MemberCard";
import { Data, filter } from "@/lib/apis"; // ✅ using your APIs
import toast from "react-hot-toast";

const Search = () => {
  const [members, setMembers] = useState([]); // All / Filtered members
  const [dropdownData, setDropdownData] = useState({ industry: [], region: [] });
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);

  // 🟢 Fetch dropdown + all members (default load)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Data(); // your existing API for industry & region
        if (res.status === 200 && res.data.status === true) {
          setDropdownData({
            industry: res.data.industry || [],
            region: res.data.region || [],
          });
        }

        // 🧠 Fetch all users by default
        const allRes = await filter({}); // no filters = all users
        if (allRes.status === 200 && allRes.data.status) {
          setMembers(allRes.data.data || []);
        }
      } catch (error) {
        console.error("Error loading data:", error);
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 🧠 Handle filtered search
  const handleSearchResults = async (data) => {
    setSearching(true);
    try {
      const res = await filter(data);
      if (res.status === 200 && res.data.status) {
        setMembers(res.data.data || []);
        if (res.data.data.length > 0) {
          toast.success(`${res.data.count} results found`);
        } else {
          toast.error("No results found");
        }
      }
    } catch (error) {
      console.error("Search error:", error);
      toast.error("Search failed");
    } finally {
      setSearching(false);
    }
  };

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
                onResults={handleSearchResults} // 🧠 now triggers search directly
              />
            )}
          </div>

          {/* 🧩 Results */}
          {loading || searching ? (
            <div className="text-center py-20 text-muted-foreground animate-pulse">
              {loading ? "Loading users..." : "Searching..."}
            </div>
          ) : members.length > 0 ? (
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
              No members found. Try searching again.
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Search;

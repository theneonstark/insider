import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchFilters from "@/components/SearchFilters";
import MemberCard from "@/components/MemberCard";
import { Data, filter } from "@/lib/apis"; // your APIs
import toast from "react-hot-toast";

const Search = () => {
  const [members, setMembers] = useState([]);
  const [dropdownData, setDropdownData] = useState({ industry: [], region: [] });
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);

  // 🧠 Fetch filters + all members on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Data(); // industries + regions
        if (res.status === 200 && res.data.status === true) {
          setDropdownData({
            industry: res.data.industry || [],
            region: res.data.region || [],
          });
        }

        // 🧠 Get all users (default load)
        const allRes = await filter({});
        if (allRes.status === 200 && allRes.data.status) {
          const users = allRes.data.data || [];
          const nonAdmins = users.filter((u) => u.role !== "admin"); // 🔥 remove admins
          setMembers(nonAdmins);
        }
      } catch (error) {
        console.error("Error loading data:", error);
        toast.error("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 🧠 Handle search filters
  const handleSearchResults = async (filters) => {
  setSearching(true);
  try {
    const res = await filter(filters);
    if (res.status === 200 && res.data.status) {
      const users = res.data.data || [];
      const nonAdmins = users.filter((u) => u.role !== "admin");
      setMembers(nonAdmins);

      toast.success(`${nonAdmins.length} result${nonAdmins.length > 1 ? "s" : ""} found`);
    } else {
      setMembers([]);
      toast.error("No results found");
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
            Search members by name, location, or industry
          </p>

          {/* 🔽 Search Filters */}
          <div className="max-w-3xl mx-auto mb-12">
            {loading ? (
              <div className="text-center py-10 text-muted-foreground animate-pulse">
                Loading filters...
              </div>
            ) : (
              <SearchFilters
                industries={dropdownData.industry}
                regions={dropdownData.region}
                onSearch={handleSearchResults}
              />
            )}
          </div>

          {/* 🧾 Results */}
          {loading || searching ? (
            <div className="text-center py-20 text-muted-foreground animate-pulse">
              {loading ? "Loading users..." : "Searching..."}
            </div>
          ) : members.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-300">
              {members.map((member, index) => (
                <MemberCard
                  key={index}
                  name={member.name}
                  title={member.business_type || "No title"}
                  tier={member.tier || "Member"}
                  image={member.image ? member.image : "/assets/default-profile.png"}
                  views={member.views || 0}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-20">
              No members found. Try another filter.
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Search;
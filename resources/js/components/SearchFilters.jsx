import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";
import { filter } from "@/lib/apis"; // ✅ import your API
import toast from "react-hot-toast";

const SearchFilters = ({ industries = [], regions = [], onResults }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [industry, setIndustry] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    // 🧠 Prepare payload
    const payload = {
      name: name.trim() || undefined,
      location: location || undefined,
      industry: industry || undefined,
    };

    // 🚀 Validate empty search
    if (!payload.name && !payload.location && !payload.industry) {
      toast.error("Please enter at least one filter to search.");
      return;
    }

    try {
      setIsLoading(true);
      const res = await filter(payload);

      if (res.data.status && res.data.data?.length > 0) {
        toast.success(`${res.data.count} results found`);
        onResults?.(res.data.data); // send results to parent
      } else {
        toast.error("No results found.");
        onResults?.([]); // empty results
      }
    } catch (error) {
      console.error("Search failed:", error);
      toast.error("Something went wrong while searching.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-card p-6 rounded-2xl shadow-[var(--shadow-soft)] space-y-4">
      {/* Name Input */}
      <Input
        type="text"
        placeholder="Search by name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full"
      />

      {/* Dropdowns */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Location Select */}
        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger>
            <SelectValue placeholder="Select Location" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            {regions.length > 0 ? (
              regions.map((region) => (
                <SelectItem
                  key={region.regionId}
                  value={region.regionName} // ✅ send region name instead of ID
                >
                  {region.regionName}
                </SelectItem>
              ))
            ) : (
              <div className="p-2 text-sm text-muted-foreground">
                No locations available
              </div>
            )}
          </SelectContent>
        </Select>

        {/* Industry Select */}
        <Select value={industry} onValueChange={setIndustry}>
          <SelectTrigger>
            <SelectValue placeholder="Select Industry" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            {industries.length > 0 ? (
              industries.map((ind) => (
                <SelectItem
                  key={ind.industryId}
                  value={ind.industryName} // ✅ send industry name instead of ID
                >
                  {ind.industryName}
                </SelectItem>
              ))
            ) : (
              <div className="p-2 text-sm text-muted-foreground">
                No industries available
              </div>
            )}
          </SelectContent>
        </Select>
      </div>

      {/* Search Button */}
      <Button
        onClick={handleSearch}
        disabled={isLoading}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        <Search className="w-4 h-4 mr-2" />
        {isLoading ? "Searching..." : "Search"}
      </Button>
    </div>
  );
};

export default SearchFilters;
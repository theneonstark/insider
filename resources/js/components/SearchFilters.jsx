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
import toast from "react-hot-toast";

const SearchFilters = ({ industries = [], regions = [], onSearch }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [industry, setIndustry] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    const payload = {
      name: name.trim() || undefined,
      location: location || undefined,
      industry: industry || undefined,
    };

    if (!payload.name && !payload.location && !payload.industry) {
      toast.error("Please enter at least one filter to search.");
      return;
    }

    try {
      setIsLoading(true);
      onSearch?.(payload); // ✅ Directly send filters to parent
    } catch (error) {
      console.error("Search failed:", error);
      toast.error("Something went wrong while searching.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-card p-6 rounded-2xl shadow-[var(--shadow-soft)] space-y-4">
      <Input
        type="text"
        placeholder="Search by name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full"
      />

      <div className="grid md:grid-cols-2 gap-4">
        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger>
            <SelectValue placeholder="Select Location" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            {regions.length > 0 ? (
              regions.map((region) => (
                <SelectItem key={region.regionId} value={region.regionId}>
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

        <Select value={industry} onValueChange={setIndustry}>
          <SelectTrigger>
            <SelectValue placeholder="Select Industry" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            {industries.length > 0 ? (
              industries.map((ind) => (
                <SelectItem key={ind.industryId} value={ind.industryId}>
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
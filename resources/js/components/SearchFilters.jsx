import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";

const SearchFilters = ({ industries = [], regions = [], onSearch }) => {
  
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [industry, setIndustry] = useState("");

  const handleSearch = () => {
    onSearch?.({ name, location: location || undefined, industry: industry || undefined });
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
                  value={region.regionId.toString()} // must be non-empty string
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
                  value={ind.industryId.toString()} // must be non-empty string
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
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        <Search className="w-4 h-4 mr-2" />
        Search
      </Button>
    </div>
  );
};

export default SearchFilters;
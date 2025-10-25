import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const SearchFilters = ({ onSearch }) => {
  return (
    <div className="bg-card p-6 rounded-2xl shadow-[var(--shadow-soft)] space-y-4">
      <Input 
        type="text" 
        placeholder="Search by name" 
        className="w-full"
      />
      
      <div className="grid md:grid-cols-2 gap-4">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select Location" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="new-york">New York</SelectItem>
            <SelectItem value="los-angeles">Los Angeles</SelectItem>
            <SelectItem value="chicago">Chicago</SelectItem>
            <SelectItem value="houston">Houston</SelectItem>
          </SelectContent>
        </Select>
        
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select Industry" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="marketing">Marketing</SelectItem>
            <SelectItem value="tech">Technology</SelectItem>
            <SelectItem value="creative">Creative Services</SelectItem>
            <SelectItem value="consulting">Consulting</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Button 
        onClick={onSearch}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        <Search className="w-4 h-4 mr-2" />
        Search
      </Button>
    </div>
  );
};

export default SearchFilters;

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

const SearchBar = ({ onSearch, isLoading }: SearchBarProps) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-2">
      <Input
        type="text"
        placeholder="Enter city name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="bg-white/70 focus:bg-white/90 transition-all"
      />
      <Button 
        type="submit" 
        disabled={isLoading || !city.trim()}
        className="bg-weather-purple hover:bg-weather-darkPurple text-white"
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin" />
        ) : (
          <Search className="h-5 w-5" />
        )}
      </Button>
    </form>
  );
};

export default SearchBar;

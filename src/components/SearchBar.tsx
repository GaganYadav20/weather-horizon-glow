
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

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
    <form onSubmit={handleSubmit} className="relative w-full max-w-xl mx-auto">
      <Input
        type="text"
        placeholder="Enter city name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="w-full bg-white/10 border-white/20 text-white placeholder:text-white/70 pl-4 pr-12 py-6 rounded-full text-lg focus:bg-white/20 transition-all"
      />
      <button 
        type="submit" 
        disabled={isLoading || !city.trim()}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors disabled:opacity-50"
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin" />
        ) : (
          <Search className="h-5 w-5 text-white" />
        )}
      </button>
    </form>
  );
};

export default SearchBar;

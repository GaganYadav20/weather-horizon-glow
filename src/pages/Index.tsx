
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { 
  fetchCurrentWeather, 
  fetchForecast,
  processForecasts,
  CurrentWeatherData,
  ForecastData
} from "@/services/weatherService";
import { getBackgroundByWeather } from "@/utils/helpers";
import SearchBar from "@/components/SearchBar";
import CurrentWeather from "@/components/CurrentWeather";
import ForecastCard from "@/components/ForecastCard";
import SunTimeCard from "@/components/SunTimeCard";

const Index = () => {
  const [city, setCity] = useState("Paris"); // Default city
  const [currentWeather, setCurrentWeather] = useState<CurrentWeatherData | null>(null);
  const [forecast, setForecast] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState("");

  // Fetch weather data based on city
  const fetchWeatherData = async (cityName: string) => {
    setIsLoading(true);
    try {
      // Fetch current weather
      const currentData = await fetchCurrentWeather(cityName);
      setCurrentWeather(currentData);
      
      // Update background based on weather condition
      const isDay = currentData.dt > currentData.sys.sunrise && currentData.dt < currentData.sys.sunset;
      const bgImage = getBackgroundByWeather(currentData.weather[0].id, isDay);
      setBackgroundImage(bgImage);
      
      // Fetch forecast
      const forecastData = await fetchForecast(cityName);
      const processedForecasts = processForecasts(forecastData);
      setForecast(processedForecasts);
      
      // Update city state
      setCity(cityName);
      
    } catch (error) {
      console.error("Error fetching weather data:", error);
      toast.error("Couldn't find that city. Please try another one.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search
  const handleSearch = (cityName: string) => {
    fetchWeatherData(cityName);
  };

  // Initial data fetch
  useEffect(() => {
    fetchWeatherData(city);
  }, []);

  return (
    <div 
      className="weather-app bg-transition"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${backgroundImage})`,
      }}
    >
      <div className="min-h-screen w-full max-w-7xl mx-auto px-4 py-8 flex flex-col">
        <div className="mb-8 flex justify-center">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>
        
        {isLoading && !currentWeather ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-weather-purple border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {currentWeather && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left side - Forecast */}
                <div className="lg:col-span-3 order-2 lg:order-1">
                  {forecast && forecast.length > 0 && (
                    <ForecastCard forecasts={forecast} />
                  )}
                </div>
                
                {/* Middle - Current Weather */}
                <div className="lg:col-span-6 order-1 lg:order-2">
                  <CurrentWeather data={currentWeather} />
                </div>
                
                {/* Right side - Sun times */}
                <div className="lg:col-span-3 order-3">
                  <SunTimeCard 
                    sunrise={currentWeather.sys.sunrise} 
                    sunset={currentWeather.sys.sunset}
                    timezone={currentWeather.timezone}
                    currentTime={currentWeather.dt}
                  />
                </div>
              </div>
            )}
          </>
        )}
        
        <footer className="mt-auto pt-8 text-center text-white/50 text-sm">
          <p>Weather data provided by OpenWeatherMap</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;

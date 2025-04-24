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
      className="weather-app bg-transition min-h-screen w-full"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
      }}
    >
      <div className="container mx-auto px-4 py-8 flex flex-col items-center min-h-screen">
        <div className="w-full max-w-4xl glass-dark rounded-3xl p-8 backdrop-blur-xl">
          <div className="mb-8">
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          </div>
          
          {isLoading && !currentWeather ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-16 h-16 border-4 border-weather-purple border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <>
              {currentWeather && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-3">
                    {forecast && forecast.length > 0 && (
                      <ForecastCard forecasts={forecast} />
                    )}
                  </div>
                  
                  <div className="lg:col-span-6">
                    <CurrentWeather data={currentWeather} />
                  </div>
                  
                  <div className="lg:col-span-3">
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
        </div>
        
        <footer className="mt-auto pt-8 text-white/50 text-sm">
          <p>Weather data provided by OpenWeatherMap</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;

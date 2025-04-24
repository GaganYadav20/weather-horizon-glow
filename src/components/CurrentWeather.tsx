
import { kelvinToCelsius } from "@/utils/helpers";
import { CurrentWeatherData, getWeatherIconUrl } from "@/services/weatherService";
import { Cloud, Wind, Thermometer } from "lucide-react";

interface CurrentWeatherProps {
  data: CurrentWeatherData;
}

const CurrentWeather = ({ data }: CurrentWeatherProps) => {
  const { 
    name, 
    main: { temp, humidity, feels_like }, 
    weather, 
    wind,
    sys: { country }
  } = data;

  const weatherCondition = weather[0];
  const iconUrl = getWeatherIconUrl(weatherCondition.icon);

  return (
    <div className="glass p-6 rounded-2xl animate-fade-in flex flex-col items-center text-center">
      <div className="mb-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-white text-shadow-md">
          {name}, {country}
        </h1>
        <p className="text-lg text-white/80 text-shadow">
          {weatherCondition.description.charAt(0).toUpperCase() + weatherCondition.description.slice(1)}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <img 
          src={iconUrl} 
          alt={weatherCondition.description}
          className="w-24 h-24 object-contain"
        />
        <div className="text-center sm:text-left">
          <h2 className="text-5xl sm:text-6xl font-bold text-white text-shadow-lg mb-2">
            {kelvinToCelsius(temp)}°C
          </h2>
          <p className="text-white/80 text-shadow flex items-center justify-center sm:justify-start gap-1">
            <Thermometer size={16} className="inline" />
            Feels like {kelvinToCelsius(feels_like)}°C
          </p>
        </div>
      </div>

      <div className="w-full mt-6 grid grid-cols-2 gap-4">
        <div className="glass-dark p-3 rounded-xl flex flex-col items-center">
          <div className="mb-1">
            <Cloud size={24} className="text-weather-lightBlue" />
          </div>
          <p className="text-xs text-white/70">Humidity</p>
          <p className="text-xl font-semibold text-white">{humidity}%</p>
        </div>
        
        <div className="glass-dark p-3 rounded-xl flex flex-col items-center">
          <div className="mb-1">
            <Wind size={24} className="text-weather-lightBlue" />
          </div>
          <p className="text-xs text-white/70">Wind Speed</p>
          <p className="text-xl font-semibold text-white">{wind.speed} m/s</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;

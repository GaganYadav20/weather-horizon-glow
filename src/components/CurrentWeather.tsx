
import { kelvinToCelsius } from "@/utils/helpers";
import { CurrentWeatherData, getWeatherIconUrl } from "@/services/weatherService";
import { Droplet, Wind } from "lucide-react";

interface CurrentWeatherProps {
  data: CurrentWeatherData;
}

const CurrentWeather = ({ data }: CurrentWeatherProps) => {
  const { 
    name, 
    main: { temp, humidity }, 
    weather,
    wind
  } = data;

  const weatherCondition = weather[0];

  return (
    <div className="text-center flex flex-col items-center">
      <img 
        src={getWeatherIconUrl(weatherCondition.icon)}
        alt={weatherCondition.description}
        className="w-32 h-32 mb-4"
      />
      
      <div className="space-y-2">
        <h1 className="text-7xl font-bold text-white text-shadow-lg">
          {kelvinToCelsius(temp)}°C
        </h1>
        <h2 className="text-4xl font-medium text-white/90">
          {name}
        </h2>
      </div>

      <div className="mt-8 w-full grid grid-cols-2 gap-4">
        <div className="flex items-center justify-center space-x-2 text-white/90">
          <Droplet className="h-6 w-6" />
          <div className="text-left">
            <p className="text-sm text-white/70">Humidity</p>
            <p className="text-xl font-semibold">{humidity}%</p>
          </div>
        </div>
        
        <div className="flex items-center justify-center space-x-2 text-white/90">
          <Wind className="h-6 w-6" />
          <div className="text-left">
            <p className="text-sm text-white/70">Wind Speed</p>
            <p className="text-xl font-semibold">{wind.speed} km/h</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;

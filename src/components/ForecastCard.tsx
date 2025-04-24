
import { formatDayOfWeek, kelvinToCelsius } from "@/utils/helpers";
import { getWeatherIconUrl } from "@/services/weatherService";

interface ForecastCardProps {
  forecasts: Array<{
    dt: number;
    main: {
      temp: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
  }>;
}

const ForecastCard = ({ forecasts }: ForecastCardProps) => {
  return (
    <div className="glass p-5 rounded-2xl w-full animate-fade-in">
      <h2 className="text-xl font-semibold text-white text-shadow-md mb-4">3-Day Forecast</h2>
      <div className="space-y-4">
        {forecasts.map((forecast) => (
          <div
            key={forecast.dt}
            className="flex items-center justify-between glass-dark p-3 rounded-xl"
          >
            <div className="flex items-center gap-2">
              <img
                src={getWeatherIconUrl(forecast.weather[0].icon)}
                alt={forecast.weather[0].description}
                className="w-12 h-12"
              />
              <div className="text-left">
                <p className="font-medium text-white">
                  {formatDayOfWeek(forecast.dt)}
                </p>
                <p className="text-sm text-white/70">
                  {forecast.weather[0].description}
                </p>
              </div>
            </div>
            <div className="text-xl font-bold text-white text-shadow">
              {kelvinToCelsius(forecast.main.temp)}°C
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;

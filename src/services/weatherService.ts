
const API_KEY = "5311126d7ce8aefccfcf395ca6344101"; // Updated OpenWeatherMap API key
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export interface CurrentWeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  dt: number;
  timezone: number;
}

export interface ForecastData {
  list: Array<{
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
  city: {
    name: string;
    country: string;
    timezone: number;
  };
}

/**
 * Fetch current weather data for a city
 */
export const fetchCurrentWeather = async (city: string): Promise<CurrentWeatherData> => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`City not found or API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    throw new Error(`Failed to fetch weather: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Fetch forecast data for a city (3 days)
 */
export const fetchForecast = async (city: string): Promise<ForecastData> => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`City not found or API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    throw new Error(`Failed to fetch forecast: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Process forecast data to get one forecast per day (noon time)
 */
export const processForecasts = (data: ForecastData): Array<any> => {
  const dailyForecasts: Array<any> = [];
  const today = new Date().getDate();
  
  // Find unique days in the forecast
  const uniqueDays = new Set<number>();
  
  data.list.forEach(item => {
    const date = new Date(item.dt * 1000);
    const day = date.getDate();
    
    // Skip today, we only want upcoming days
    if (day !== today && !uniqueDays.has(day)) {
      uniqueDays.add(day);
      
      // Find noon forecast for this day
      const noonForecast = data.list.find(forecast => {
        const forecastDate = new Date(forecast.dt * 1000);
        const forecastDay = forecastDate.getDate();
        const forecastHour = forecastDate.getHours();
        
        return forecastDay === day && forecastHour >= 11 && forecastHour <= 14;
      });
      
      if (noonForecast) {
        dailyForecasts.push(noonForecast);
      }
    }
  });
  
  // Limit to 3 days
  return dailyForecasts.slice(0, 3);
};

/**
 * Get weather icon URL from icon code
 */
export const getWeatherIconUrl = (iconCode: string): string => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

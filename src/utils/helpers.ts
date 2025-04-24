
/**
 * Convert temperature from Kelvin to Celsius
 */
export const kelvinToCelsius = (kelvin: number): number => {
  return Math.round(kelvin - 273.15);
};

/**
 * Format date to display day of week
 */
export const formatDayOfWeek = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString("en-US", { weekday: "long" });
};

/**
 * Format time from timestamp
 */
export const formatTime = (timestamp: number, timezone: number = 0): string => {
  const date = new Date((timestamp + timezone) * 1000);
  return date.toLocaleTimeString("en-US", { 
    hour: "2-digit", 
    minute: "2-digit",
    hour12: true
  });
};

/**
 * Get appropriate background image based on weather condition
 */
export const getBackgroundByWeather = (weatherId: number, isDay: boolean = true): string => {
  // Weather condition codes: https://openweathermap.org/weather-conditions
  
  // Clear sky
  if (weatherId === 800) {
    return isDay 
      ? "https://images.unsplash.com/photo-1500375592092-40eb2168fd21"
      : "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb";
  }
  
  // Clouds
  else if (weatherId >= 801 && weatherId <= 804) {
    return "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb";
  }
  
  // Rain, drizzle
  else if ((weatherId >= 300 && weatherId <= 321) || (weatherId >= 500 && weatherId <= 531)) {
    return "https://images.unsplash.com/photo-1433086966358-54859d0ed716";
  }
  
  // Thunderstorm
  else if (weatherId >= 200 && weatherId <= 232) {
    return "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28";
  }
  
  // Snow
  else if (weatherId >= 600 && weatherId <= 622) {
    return "https://images.unsplash.com/photo-1491002052546-bf38f186af56";
  }
  
  // Mist, fog, etc.
  else if (weatherId >= 701 && weatherId <= 781) {
    return "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05";
  }
  
  // Default
  return "https://images.unsplash.com/photo-1500375592092-40eb2168fd21";
};

/**
 * Determine if it's day or night based on current time and sunrise/sunset
 */
export const isDaytime = (current: number, sunrise: number, sunset: number): boolean => {
  return current > sunrise && current < sunset;
};

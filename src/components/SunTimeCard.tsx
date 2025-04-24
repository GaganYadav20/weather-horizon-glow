
import { formatTime, isDaytime } from "@/utils/helpers";
import { Sunrise, Sunset } from "lucide-react";
import { useEffect, useState } from "react";

interface SunTimeCardProps {
  sunrise: number;
  sunset: number;
  timezone: number;
  currentTime: number;
}

const SunTimeCard = ({ sunrise, sunset, timezone, currentTime }: SunTimeCardProps) => {
  const [daytime, setDaytime] = useState(false);

  useEffect(() => {
    setDaytime(isDaytime(currentTime, sunrise, sunset));
  }, [currentTime, sunrise, sunset]);

  return (
    <div className="glass p-5 rounded-2xl w-full animate-fade-in">
      <h2 className="text-xl font-semibold text-white text-shadow-md mb-4">Sun Schedule</h2>
      
      <div className="relative pt-6 pb-2">
        {/* Day/Night indicator */}
        <div className={`absolute top-0 left-0 w-full h-2 rounded-full ${
          daytime ? "bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200" : 
          "bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900"
        }`}>
          {/* Current time indicator */}
          <div 
            className="absolute top-0 h-4 w-4 rounded-full bg-white shadow-lg transform -translate-y-1"
            style={{ 
              left: `${Math.min(100, Math.max(0, 
                ((currentTime - sunrise) / (sunset - sunrise)) * 100))}%`,
              display: currentTime >= sunrise && currentTime <= sunset ? 'block' : 'none'
            }}
          />
        </div>
        
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between glass-dark p-3 rounded-xl">
            <div className="flex items-center gap-2">
              <Sunrise className="h-5 w-5 text-yellow-300" />
              <span className="text-white font-medium">Sunrise</span>
            </div>
            <span className="text-white text-lg">
              {formatTime(sunrise, timezone)}
            </span>
          </div>
          
          <div className="flex items-center justify-between glass-dark p-3 rounded-xl">
            <div className="flex items-center gap-2">
              <Sunset className="h-5 w-5 text-orange-400" />
              <span className="text-white font-medium">Sunset</span>
            </div>
            <span className="text-white text-lg">
              {formatTime(sunset, timezone)}
            </span>
          </div>
          
          <p className="text-center text-sm text-white/60">
            {daytime ? "☀️ Day time" : "🌙 Night time"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SunTimeCard;

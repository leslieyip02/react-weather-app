import { createContext, useContext, useEffect, useState } from "react";
import type { AreaForecast } from "~/data/weather-data";

type WeatherContextValue = {
  forecasts: AreaForecast[];
  favorites: string[];
  toggleFavorite: (area: string) => void;
};

const WeatherContext = createContext<WeatherContextValue | undefined>(undefined);

export function WeatherProvider({ children }: { children: React.ReactNode }) {
  const [forecasts, setForecasts] = useState<AreaForecast[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    fetch("https://api-open.data.gov.sg/v2/real-time/api/two-hr-forecast")
      .then(res => res.json())
      .then(json => setForecasts(json.data.items[0].forecasts))
  }, []);

  const toggleFavorite = (area: string) => {
    setFavorites(prev => {
      if (prev.includes(area)) {
        return prev.filter((fav) => fav !== area);
      }
      return [...prev, area];
    });
  };

  return (
    <WeatherContext.Provider value={{ forecasts, favorites, toggleFavorite }}>
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeather must be used within WeatherProvider");
  }
  return context;
}

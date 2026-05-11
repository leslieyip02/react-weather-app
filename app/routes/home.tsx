import { Link } from "react-router";
import type { Route } from "./+types/home";
import WeatherCard from "~/components/weather-card";
import { useWeather } from "~/context/weather-context";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Weather App" },
    { name: "description", content: "Welcome to the Weather App!" },
  ];
}

export default function Home() {
  const headerStyle = {
    fontSize: '32px',
    fontWeight: 'bold',
  };

  const { forecasts, favorites, toggleFavorite } = useWeather();

  return (
    <div>
      <h1 style={headerStyle}>Weather App</h1>
      <p>You have {favorites.length} favorite locations.</p>
      {forecasts.map((forecast) => (
        <WeatherCard
          key={forecast.area}
          forecast={forecast}
          isFavorite={favorites.includes(forecast.area)}
          onToggleFavorite={toggleFavorite}
        />
      ))}
      <Link to="/about">
        About This App
      </Link>
    </div>
  );
}

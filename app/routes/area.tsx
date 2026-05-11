import { Link } from "react-router";
import type { Route } from "./+types/area";
import { useWeather } from "~/context/weather-context";

export default function Area({ params }: Route.ComponentProps) {
  const { forecasts, favorites } = useWeather();
  const areaParam = params.area ? decodeURIComponent(params.area) : "";
  const forecast = forecasts.find((item) => item.area === areaParam);

  return (
    <div>
      <h1>Area Detail for {areaParam}</h1>
      {forecast ? (
        <>
          <p>Status: {forecast.forecast}</p>
          <p>Favourite: {favorites.includes(forecast.area) ? "Yes" : "No"}</p>
          <Link className="link" to="/">
            Back to Home
          </Link>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

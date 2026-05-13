import type { Route } from "./+types/area";
import WeatherMap from "~/components/weather-map.client";
import { useWeather } from "~/context/weather-context";

export default function Area(_: Route.ComponentProps) {
  const { forecasts } = useWeather();
  return (
    <div>
      <h1>Map</h1>
      <WeatherMap forecasts={forecasts} />
    </div>
  );
}

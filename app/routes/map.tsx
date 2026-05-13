import type { Route } from "./+types/area";
import WeatherMap from "~/components/weather-map";
import { useWeather } from "~/context/weather-context";

export default function Area(_: Route.ComponentProps) {
  const { forecasts } = useWeather();
  return <WeatherMap forecasts={forecasts} />;
}

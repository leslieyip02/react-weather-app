import { MapContainer, TileLayer, GeoJSON, Tooltip } from "react-leaflet"
import "leaflet/dist/leaflet.css"

import type { AreaForecast } from "~/data/weather-data"
import { AREA_FEATURES, type FeatureProperties } from "~/data/map-data";
import { useState } from "react";
import type { Layer } from "leaflet";
import { TiWeatherCloudy, TiWeatherDownpour } from "react-icons/ti";

type WeatherMapProps = {
  forecasts: AreaForecast[];
}

export default function WeatherMap({ forecasts }: WeatherMapProps) {
  const [selectedFeature, setSelectedFeature] = useState<FeatureProperties | null>(null);

  const onEachFeature = (feature: any, layer: Layer) => {
    layer.on("mouseover", (e) => e.target.setStyle({ color: "red" }));
    layer.on("mouseout", (e) => e.target.setStyle({ color: "blue" }));
    layer.on("click", () => setSelectedFeature(feature["properties"]));
  };

  return (
    <div className="flex flex-col gap-4">
      <MapContainer
        className="h-96 w-full"
        center={[1.32, 103.82]}
        zoom={11}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
          AREA_FEATURES["features"].map((feature: any) => (
            <GeoJSON
              pathOptions={{ color: "blue" }}
              key={feature["properties"]["OBJECTID"]}
              data={feature}
              onEachFeature={onEachFeature}
            >
              <Tooltip>{feature["properties"]["PLN_AREA_N"]}</Tooltip>
            </GeoJSON>
          ))
        }
      </MapContainer>

      {
        selectedFeature && <WeatherDescription
          feature={selectedFeature}
          forecasts={forecasts}
        />
      }
    </div>
  )
}

type WeatherDescriptionProps = {
  feature: FeatureProperties;
  forecasts: AreaForecast[];
}

function WeatherDescription({ feature, forecasts }: WeatherDescriptionProps) {
  const forecast = forecasts.find((forecast) => {
    return forecast.area.toLowerCase() === feature.PLN_AREA_N.toLowerCase();
  })?.forecast ?? "unknown";

  const icon = chooseIcon(forecast);

  return (
    <div className="border-1 border border-color-[#cccccc] rounded-md p-4">
      <h2>{feature.PLN_AREA_N} (Region: {feature.REGION_N})</h2>
      <div className="flex flex-row items-center gap-1">
        <p>Forecast: {forecast}</p>
        {icon}
      </div>
    </div>
  )
}

function chooseIcon(forecast: string) {
  // https://data.gov.sg/datasets?query=weather&resultId=d_3f9e064e25005b0e42969944ccaf2e7a
  forecast = forecast.toLocaleLowerCase()
  if (forecast.includes("rain") || forecast.includes("showers")) {
    return <TiWeatherDownpour />;
  } else if (forecast.includes("cloud")) {
    return <TiWeatherCloudy />;
  }
  return null;
}

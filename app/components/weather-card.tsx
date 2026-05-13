import type { AreaForecast } from "~/data/weather-data";
import { Link } from "react-router";

type Props = {
  forecast: AreaForecast;
  isFavorite: boolean;
  onToggleFavorite: (area: string) => void;
};

export default function WeatherCard({ forecast, isFavorite, onToggleFavorite }: Props) {
  const boxStyle = {
    borderRadius: "12px",
    border: "1px solid #ccc",
    padding: "12px",
    marginBottom: "12px",
  };

  return (
    <div style={boxStyle}>
      <p>Location: {forecast.area}</p>
      <p>Status: {forecast.forecast}</p>
      <button onClick={() => onToggleFavorite(forecast.area)}>
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
      <Link className="link" to={`/area/${encodeURIComponent(forecast.area)}`}>
        View Details
      </Link>
    </div>
  );
}

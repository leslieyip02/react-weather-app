// downloaded from https://data.gov.sg/datasets/d_2cc750190544007400b2cfd5d7f53209/view
import rawBoundaries from "./MasterPlan2025PlanningAreaBoundaryNoSea.geojson?raw";

export const AREA_FEATURES = JSON.parse(rawBoundaries);

export type FeatureProperties = {
  OBJECTID: number;
  PLN_AREA_N: string;
  REGION_N: string;
}

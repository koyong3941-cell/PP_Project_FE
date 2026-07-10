import { Route } from "react-router-dom";

import PlantSearch from "../plant/PlantSearch";
import PlantDetail from "../plant/PlantDetail";

export const PlantRoutes = [
  <Route key="plant-search" path="/plantSearch" element={<PlantSearch />} />,
  <Route
    key="plant-detail"
    path="/plants/:plantNo"
    element={<PlantDetail />}
  />,
];

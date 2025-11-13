import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import { createTimeSlider } from "./slider.js";
import { addMODISLayer, updateMODISLayer } from "./modisLayer.js";
import { createSubdivisionMap } from "./subDivisionMap.js";

// Load admin-1 subdivisions
const subdivisions = await d3.json("data/south_america.json");
window.subdivisions = subdivisions; // for console debugging

// Amazon countries to highlight (you can use this later if needed)
const amazonCountries = new Set(["BRA","COL","PER","VEN","BOL","ECU","GUY","SUR","FRA"]);

// Create projection matching MODIS extent
const projection = d3.geoMercator()
    .center([-60, -15])   // roughly center of South America
    .scale(975)           // adjust zoom as needed
    .translate([360, 470]); // center SVG

// Filter out mainland France (keep French Guiana)
const filtered = {
    type: "FeatureCollection",
    features: subdivisions.features.filter(f => {
        const [lon, lat] = d3.geoCentroid(f);
        // Only keep features with centroids west of ~-10 longitude
        // This excludes France (≈2°E) but keeps French Guiana (≈-53°)
        return lon > -10;
    })
};

async function init() {
    // Add MODIS layer
    addMODISLayer("#map-container", "2005-01-01");

    // Add subdivisions (using shared projection)
    createSubdivisionMap(filtered, "#map-container", projection);

    // Add time slider (unchanged)
    createTimeSlider({
        parentSelector: "#slider-container",
        startYear: 2005,
        endYear: 2024,
        onChange: (date) => updateMODISLayer(date)
    });
}

init();

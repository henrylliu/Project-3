// modisLayer.js
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

/**
 * NASA GIBS WMS endpoint and layer configuration
 */
const GIBS_URL = "https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi";
const LAYER = "MODIS_Aqua_L4_Net_Photosynthesis_8Day";

/**
 * Default bounding box covering the Amazon (south, west, north, east)
 * Adjust as needed: lat/lon in EPSG:4326
 */

const DEFAULT_BBOX = "-58,-85,10,-30";

/**
 * Default image resolution
 */
const WIDTH = 800;
const HEIGHT = 800;

/**
 * Build the WMS URL for a given date and bounding box
 * @param {string} dateStr - YYYY-MM-DD
 * @param {string} bbox - bounding box string "south,west,north,east"
 */
function buildWMSUrl(dateStr, bbox = DEFAULT_BBOX) {
  const params = new URLSearchParams({
    service: "WMS",
    version: "1.3.0",
    request: "GetMap",
    layers: LAYER,
    styles: "",
    format: "image/png",
    transparent: "true",
    crs: "EPSG:4326",
    bbox: bbox,
    width: WIDTH,
    height: HEIGHT,
    time: dateStr
  });
  return `${GIBS_URL}?${params.toString()}`;
}

/**
 * Add the MODIS layer to a container
 * @param {string} parentSelector - DOM selector
 * @param {string} dateStr - YYYY-MM-DD
 */
export function addMODISLayer(parentSelector, dateStr = "2020-01-01") {
  const container = d3.select(parentSelector);

  // Check if image already exists
  let img = container.select("#modis-image");
  if (img.empty()) {
    img = container.append("img")
      .attr("id", "modis-image")
      .style("position", "absolute")
      .style("top", "0")
      .style("left", "0")
      .style("width", "100%")
      .style("height", "100%")
      .style("z-index", "0")
  }

  img.attr("src", buildWMSUrl(dateStr));
}

/**
 * Update the MODIS layer to a new date
 * @param {string} dateStr - YYYY-MM-DD
 */
export function updateMODISLayer(dateStr) {
  d3.select("#modis-image").attr("src", buildWMSUrl(dateStr));
}

/**
 * Optional: set custom bounding box for Amazon or subset
 */
export function setMODISBBox(bbox) {
  // override default
  DEFAULT_BBOX = bbox;
}

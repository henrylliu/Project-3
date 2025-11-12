import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import * as topojson from "https://cdn.jsdelivr.net/npm/topojson-client@3/+esm";

/**
 * createSouthAmericaMap
 * 
 * Renders a choropleth map of South America using TopoJSON and D3.
 * 
 * @param {Object[]} data - Array of { id: ISO_A3, value: number }
 * @param {String} parentSelector - CSS selector for parent element
 */
export function createSouthAmericaMap(southAmerica, selector) {
    const width = 0, height = 1000;
  
    const projection = d3.geoMercator()
      .fitSize([width, height], { type: "FeatureCollection", features: southAmerica });
  
    const path = d3.geoPath(projection);
  
    const svg = d3.select(selector)
      .append("svg")
      .attr("width", width)
      .attr("height", height);
  
    // Country borders only
    svg.selectAll("path")
      .data(southAmerica)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("fill", "none")
      .attr("stroke", "#ccc")
      .attr("stroke-width", 0.7);
  }
  
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

/**
 * createColorbarLegend
 * Creates a horizontal color bar legend matching MODIS vegetation colors.
 *
 * @param {string} parentSelector - container where the legend SVG will be appended
 */
export function createColorbarLegend(parentSelector = "#legend-container") {
  const width = 300;   // length of colorbar
  const height = 20;   // thickness
  const margin = { top: 30, right: 30, bottom: 30, left: 30 };

  const svg = d3.select(parentSelector)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  // Define gradient
  const defs = svg.append("defs");
  const gradient = defs.append("linearGradient")
    .attr("id", "color-gradient")
    .attr("x1", "0%")
    .attr("x2", "100%")
    .attr("y1", "0%")
    .attr("y2", "0%");

//Need to tune these offsets to be valid! And also the legend labels as well.
  const colorStops = [
    { offset: "0%", color: "#40004b" },
    { offset: "15%", color: "#2166ac" },
    { offset: "30%", color: "#1a9850" },
    { offset: "50%", color: "#fee08b" },
    { offset: "70%", color: "#f46d43" },
    { offset: "85%", color: "#d73027" },
    { offset: "100%", color: "#a50026" }
  ];

  gradient.selectAll("stop")
    .data(colorStops)
    .enter()
    .append("stop")
    .attr("offset", d => d.offset)
    .attr("stop-color", d => d.color);

  // Draw color bar
  svg.append("rect")
    .attr("x", margin.left)
    .attr("y", margin.top)
    .attr("width", width)
    .attr("height", height)
    .style("fill", "url(#color-gradient)")
    .style("stroke", "#999")
    .style("stroke-width", 0.5)
    .style("rx", 4)
    .style("ry", 4);

  // Define a scale for the axis (e.g. normalized 0–1)
  const scale = d3.scaleLinear().domain([0, 1]).range([margin.left, margin.left + width]);
  const axis = d3.axisBottom(scale)
    .ticks(5)
    .tickFormat(d3.format(".2f"));

  svg.append("g")
    .attr("transform", `translate(0, ${margin.top + height})`)
    .call(axis);

  // Add label
  svg.append("text")
    .attr("x", margin.left + width / 2)
    .attr("y", margin.top - 10)
    .attr("text-anchor", "middle")
    .attr("font-size", "12px")
    .attr("fill", "#333")
    .text("Net Vegetation (g C m⁻² day⁻¹)");
}
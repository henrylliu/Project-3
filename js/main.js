import { createTimeSlider } from "./slider.js";
import { createSouthAmericaMap } from "./southAmericaMap.js";




const sampleData = [
    { id: "BRA", value: 8 },
    { id: "PER", value: 5 },
    { id: "COL", value: 6 },
    { id: "ARG", value: 3 }
  ];
  
  createSouthAmericaMap(sampleData, "#map-container");

createTimeSlider({
    parentSelector: "#slider-container",
    startYear: 2005,
    endYear: 2024,
    onChange: (date) => {
        console.log("Selected date:", date);
        // Later: update the MODIS image here
    }
});
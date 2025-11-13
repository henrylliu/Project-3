import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

async function getGrayOutNames() {
    const subdivisions = await d3.json("data/south_america.json");

    // Amazon bounding box
    const amazonBounds = {
        latMin: -17,
        latMax: 5,
        lonMin: -80,
        lonMax: -50
    };

    // Filter features to gray out (subdivision is gray if NO points are inside the Amazon box)
    const grayFeatures = subdivisions.features.filter(f => {
        if (!f.geometry || !f.geometry.coordinates) return true;

        // Check each polygon or multi-polygon
        const inBounds = f.geometry.coordinates.some(polygon => {
            // polygon might be nested (multi-polygon)
            const rings = Array.isArray(polygon[0][0]) ? polygon : [polygon];

            return rings.some(ring => 
                ring.some(([lon, lat]) => 
                    lon >= amazonBounds.lonMin &&
                    lon <= amazonBounds.lonMax &&
                    lat >= amazonBounds.latMin &&
                    lat <= amazonBounds.latMax
                )
            );
        });

        return !inBounds; // gray out if no point is in Amazon box
    });

    const grayOutNames = grayFeatures.map(f => f.properties.name);
    console.log("Gray-out names:", grayOutNames);

    return grayOutNames;
}

// Example usage
const grayOutNames = await getGrayOutNames();

import { LatLngTuple } from 'leaflet';

// Function to parse the SVG path and convert it to positive LatLng format.
export default function extractCoordinates(svg: string): LatLngTuple[] {
  // Regular expression to match all coordinate pairs in the SVG path.
  const regex = /-?\d+\.\d+/g;

  // Find all matches of the regex.
  let matches = svg.match(regex);

  // If no matches found, return an empty array.
  if (!matches) {
    return [];
  }

  // Convert the flat array of strings to a structured array of LatLngTuples.
  let coordinates: LatLngTuple[] = [];
  for (let i = 0; i < matches.length; i += 2) {
    // Parse and make the longitude (x value) and latitude (y value) positive.
    const latitude = Math.abs(parseFloat(matches[i + 1]));
    const longitude = Math.abs(parseFloat(matches[i]));

    // Add the coordinate tuple to the array.
    coordinates.push([latitude, longitude]);
  }

  return coordinates;
}

export function getPanelPolygon(
  center: { latitude: number; longitude: number },
  panelW: number, // width in meters
  panelH: number, // height in meters
  azimuth: number // rotation in degrees
): [number, number][] {
  const R = 6378137; // Earth radius in meters

  console.log(azimuth);

  // Meters to degrees conversion helpers
  const metersToLat = (meters: number) => (meters / R) * (180 / Math.PI);
  const metersToLng = (meters: number, latitude: number) =>
    (meters / (R * Math.cos((latitude * Math.PI) / 180))) * (180 / Math.PI);

  const halfW = panelW / 2;
  const halfH = panelH / 2;

  const rad = (azimuth * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);

  console.log(rad, cos, sin);

  // Panel corners before rotation (centered at origin)
  const corners = [
    [-halfW, -halfH],
    [halfW, -halfH],
    [halfW, halfH],
    [-halfW, halfH],
  ];

  // Rotate and translate
  const rotatedCorners = corners.map(([x, y]) => {
    const xr = x * cos - y * sin;
    const yr = x * sin + y * cos;

    const dLat = metersToLat(yr);
    const dLng = metersToLng(xr, center.latitude);

    // console.log([center.longitude + dLng, center.latitude + dLat, dLng, dLat]);

    return [center.longitude + dLng, center.latitude + dLat] as [
      number,
      number
    ];
  });

  return [...rotatedCorners, rotatedCorners[0]]; // Close polygon
}

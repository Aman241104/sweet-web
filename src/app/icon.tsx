import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 20,
          background: "#3D2B1F",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#FFF8F0",
          borderRadius: "50%",
          fontFamily: "serif",
          fontWeight: "bold",
        }}
      >
        G
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  );
}

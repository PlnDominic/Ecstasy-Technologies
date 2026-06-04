import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

const services = [
  "Custom Software Development",
  "Web Application Development",
  "Mobile App Development",
  "UI/UX Design",
  "Digital Transformation",
  "Cloud Solutions",
];

export const ServicesScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title animation
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const titleY = interpolate(frame, [0, 20], [-20, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#000000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px",
      }}
    >
      {/* Header */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 80,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <h2
          style={{
            color: "white",
            fontSize: "72px",
            fontWeight: "bold",
            marginBottom: 24,
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          Our Services
        </h2>
      </div>

      {/* Services List */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 32,
        }}
      >
        {services.map((service, index) => {
          const serviceProgress = spring({
            frame: frame - (30 + index * 8),
            fps,
            config: { damping: 20, stiffness: 100 },
          });

          const opacity = interpolate(serviceProgress, [0, 1], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          const translateX = interpolate(serviceProgress, [0, 1], [50, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={service}
              style={{
                color: "white",
                fontSize: "48px",
                fontWeight: "600",
                fontFamily: "system-ui, -apple-system, sans-serif",
                opacity,
                transform: `translateX(${translateX}px)`,
                textAlign: "center",
              }}
            >
              {service}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

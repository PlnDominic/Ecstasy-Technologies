import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

export const CounterScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title animation
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const titleY = interpolate(frame, [0, 20], [-30, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // Counter animation - count from 1 to 30 over 30 frames (2x speed)
  const counterProgress = interpolate(frame, [30, 60], [1, 30], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Add a bounce effect at the end
  const bounceProgress = spring({
    frame: frame - 60,
    fps,
    config: { damping: 10, stiffness: 200 },
  });

  const displayNumber = Math.floor(counterProgress);
  const showPlus = frame > 60;

  // Label animation
  const labelOpacity = interpolate(frame, [45, 60], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const labelY = interpolate(frame, [45, 60], [20, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#F97316", // Orange background
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Title */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          marginBottom: 40,
        }}
      >
        <h2
          style={{
            color: "white",
            fontSize: "48px",
            fontWeight: "bold",
            fontFamily: "system-ui, -apple-system, sans-serif",
            textAlign: "center",
          }}
        >
          Trusted by
        </h2>
      </div>

      {/* Counter */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            color: "white",
            fontSize: "200px",
            fontWeight: "bold",
            fontFamily: "system-ui, -apple-system, sans-serif",
            lineHeight: 1,
          }}
        >
          {displayNumber}
        </span>
        {showPlus && (
          <span
            style={{
              color: "white",
              fontSize: "120px",
              fontWeight: "bold",
              fontFamily: "system-ui, -apple-system, sans-serif",
              opacity: bounceProgress,
              transform: `scale(${0.5 + bounceProgress * 0.5})`,
            }}
          >
            +
          </span>
        )}
      </div>

      {/* Label */}
      <div
        style={{
          opacity: labelOpacity,
          transform: `translateY(${labelY}px)`,
          marginTop: 20,
        }}
      >
        <p
          style={{
            color: "white",
            fontSize: "48px",
            fontWeight: "600",
            fontFamily: "system-ui, -apple-system, sans-serif",
            textAlign: "center",
          }}
        >
          Happy Clients
        </p>
      </div>
    </AbsoluteFill>
  );
};

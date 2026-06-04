import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// Animated background particles component
const Particles = () => {
  const frame = useCurrentFrame();
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: i * 3,
  }));

  return (
    <>
      {particles.map((particle) => {
        const y = interpolate(
          frame,
          [particle.delay, particle.delay + 200],
          [particle.y, particle.y - 30],
          { extrapolateRight: "clamp" }
        );
        const opacity = interpolate(
          frame % 100,
          [0, 50, 100],
          [0, 0.6, 0]
        );

        return (
          <div
            key={particle.id}
            style={{
              position: "absolute",
              left: `${particle.x}%`,
              top: `${y}%`,
              width: particle.size,
              height: particle.size,
              backgroundColor: "#ffffff",
              borderRadius: "50%",
              opacity,
              filter: "blur(1px)",
            }}
          />
        );
      })}
    </>
  );
};

export const OutroScene = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Main headline animation with special effects
  const headlineProgress = spring({
    frame: frame - 15,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const headlineOpacity = interpolate(headlineProgress, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const headlineY = interpolate(headlineProgress, [0, 1], [80, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const headlineScale = interpolate(
    frame,
    [15, 25, 35],
    [0.8, 1.05, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Text glow pulse
  const textGlow = interpolate(frame % 40, [0, 20, 40], [0, 1, 0]);

  // Phone number animation
  const phoneProgress = spring({
    frame: frame - 40,
    fps,
    config: { damping: 18, stiffness: 90 },
  });

  const phoneOpacity = interpolate(phoneProgress, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const phoneX = interpolate(phoneProgress, [0, 1], [-100, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phone number character reveal effect
  const phoneNumber = "0542855399";
  const revealProgress = interpolate(frame, [50, 80], [0, phoneNumber.length], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const revealedDigits = Math.floor(revealProgress);

  // Icon bounce animation
  const iconBounce = spring({
    frame: frame - 45,
    fps,
    config: { damping: 8, stiffness: 200 },
  });

  // Bottom info animation
  const infoProgress = spring({
    frame: frame - 60,
    fps,
    config: { damping: 20, stiffness: 100 },
  });

  const infoOpacity = interpolate(infoProgress, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const infoY = interpolate(infoProgress, [0, 1], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Exit animation
  const exitProgress = interpolate(
    frame,
    [durationInFrames - 25, durationInFrames],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const exitScale = interpolate(
    frame,
    [durationInFrames - 25, durationInFrames],
    [1, 1.1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#000000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: exitProgress,
        transform: `scale(${exitScale})`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated particles */}
      <Particles />

      {/* Glowing orb effects */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: 300,
          height: 300,
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(40px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          right: "10%",
          width: 250,
          height: 250,
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(40px)",
        }}
      />

      {/* Main Headline - Book us now with white text */}
      <div
        style={{
          opacity: headlineOpacity,
          transform: `translateY(${headlineY}px) scale(${headlineScale})`,
          textAlign: "center",
          marginBottom: 70,
          position: "relative",
          zIndex: 1,
        }}
      >
        <h1
          style={{
            color: "white",
            fontSize: "100px",
            fontWeight: "900",
            fontFamily: "system-ui, -apple-system, sans-serif",
            letterSpacing: "-2px",
            lineHeight: 1,
            margin: 0,
            textShadow: `0 0 ${40 + textGlow * 30}px rgba(255, 255, 255, ${0.3 + textGlow * 0.4})`,
            filter: `drop-shadow(0 0 ${20 + textGlow * 15}px rgba(255, 255, 255, 0.5))`,
          }}
        >
          Book us now
        </h1>
      </div>

      {/* Phone Number with Call Icon and effects */}
      <div
        style={{
          opacity: phoneOpacity,
          transform: `translateX(${phoneX}px)`,
          display: "flex",
          alignItems: "center",
          gap: 24,
          padding: "36px 72px",
          background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
          borderRadius: 30,
          border: "3px solid rgba(255, 255, 255, 0.3)",
          position: "relative",
          zIndex: 1,
          boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 ${30 + textGlow * 20}px rgba(255, 255, 255, ${0.2 + textGlow * 0.2})`,
        }}
      >
        {/* Animated Call Icon */}
        <div
          style={{
            transform: `scale(${iconBounce})`,
          }}
        >
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              color: "white",
              filter: `drop-shadow(0 0 ${10 + textGlow * 10}px rgba(255, 255, 255, 0.6))`,
            }}
          >
            <path
              d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        
        <span
          style={{
            color: "white",
            fontSize: "80px",
            fontWeight: "800",
            fontFamily: "system-ui, -apple-system, sans-serif",
            letterSpacing: "6px",
            textShadow: `0 0 ${20 + textGlow * 15}px rgba(255, 255, 255, ${0.3 + textGlow * 0.4})`,
          }}
        >
          {phoneNumber.slice(0, revealedDigits)}
          {revealedDigits < phoneNumber.length && (
            <span style={{ opacity: 0.3 }}>|</span>
          )}
        </span>
      </div>

      {/* Email and Location under phone number */}
      <div
        style={{
          opacity: infoOpacity,
          transform: `translateY(${infoY}px)`,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          marginTop: 60,
          position: "relative",
          zIndex: 1,
        }}
      >
        <p
          style={{
            color: "white",
            fontSize: "42px",
            fontWeight: "600",
            fontFamily: "system-ui, -apple-system, sans-serif",
            margin: 0,
            textShadow: `0 0 ${15 + textGlow * 15}px rgba(255, 255, 255, 0.5)`,
            letterSpacing: "1px",
          }}
        >
          ecstasygeospatialservices@gmail.com
        </p>
        <p
          style={{
            color: "white",
            fontSize: "38px",
            fontWeight: "500",
            fontFamily: "system-ui, -apple-system, sans-serif",
            margin: 0,
            letterSpacing: "4px",
            textShadow: `0 0 ${12 + textGlow * 12}px rgba(255, 255, 255, 0.4)`,
          }}
        >
          Bibiani, Ghana
        </p>
      </div>

      {/* Corner decorative elements */}
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 30,
          width: 60,
          height: 60,
          borderLeft: "3px solid rgba(255, 255, 255, 0.4)",
          borderTop: "3px solid rgba(255, 255, 255, 0.4)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 30,
          right: 30,
          width: 60,
          height: 60,
          borderRight: "3px solid rgba(255, 255, 255, 0.4)",
          borderTop: "3px solid rgba(255, 255, 255, 0.4)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 30,
          left: 30,
          width: 60,
          height: 60,
          borderLeft: "3px solid rgba(255, 255, 255, 0.4)",
          borderBottom: "3px solid rgba(255, 255, 255, 0.4)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 30,
          right: 30,
          width: 60,
          height: 60,
          borderRight: "3px solid rgba(255, 255, 255, 0.4)",
          borderBottom: "3px solid rgba(255, 255, 255, 0.4)",
        }}
      />
    </AbsoluteFill>
  );
};

import {
  AbsoluteFill,
  Img,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  spring,
} from "remotion";

export const HeroScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo entrance animation
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Logo Image */}
      <div
        style={{
          transform: `scale(${logoScale})`,
        }}
      >
        <Img
          src={staticFile("logo.png")}
          style={{
            width: 1000,
            height: 1000,
            objectFit: "contain",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

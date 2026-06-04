import {
  AbsoluteFill,
  Img,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

interface Project3D {
  name: string;
  image: string;
  delay: number;
  initialRotateY: number;
  initialRotateX: number;
  initialZ: number;
  targetRotateY: number;
  targetRotateX: number;
  targetZ: number;
  targetX: number;
  targetY: number;
}

const projects: Project3D[] = [
  {
    name: "Clems Akinaabi",
    image: "Clems Akinaabi Company Limited.png",
    delay: 0,
    initialRotateY: -45,
    initialRotateX: 15,
    initialZ: -200,
    targetRotateY: -40,
    targetRotateX: 5,
    targetZ: 0,
    targetX: -500,
    targetY: 0,
  },
  {
    name: "Nevrol Ventures",
    image: "Nevrol Ventures.png",
    delay: 8,
    initialRotateY: -30,
    initialRotateX: 10,
    initialZ: -150,
    targetRotateY: -22,
    targetRotateX: 3,
    targetZ: 50,
    targetX: -250,
    targetY: 0,
  },
  {
    name: "Peravic Lodge",
    image: "Peravic Lodge.png",
    delay: 16,
    initialRotateY: -15,
    initialRotateX: 5,
    initialZ: -100,
    targetRotateY: -10,
    targetRotateX: 0,
    targetZ: 100,
    targetX: 0,
    targetY: 0,
  },
  {
    name: "Jokran Hotel",
    image: "Jokran Hotel.png",
    delay: 24,
    initialRotateY: 0,
    initialRotateX: 0,
    initialZ: 0,
    targetRotateY: 10,
    targetRotateX: 0,
    targetZ: 50,
    targetX: 250,
    targetY: 0,
  },
  {
    name: "Amor De Dios",
    image: "Amor De Dios Drilling and Civil Construction.png",
    delay: 32,
    initialRotateY: 15,
    initialRotateX: 5,
    initialZ: -50,
    targetRotateY: 22,
    targetRotateX: 3,
    targetZ: 0,
    targetX: 500,
    targetY: 0,
  },
];

const Card3D = ({ project }: { project: Project3D }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - project.delay,
    fps,
    config: { damping: 25, stiffness: 80 },
  });

  const rotateY = interpolate(
    progress,
    [0, 1],
    [project.initialRotateY, project.targetRotateY],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const rotateX = interpolate(
    progress,
    [0, 1],
    [project.initialRotateX, project.targetRotateX],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const translateZ = interpolate(
    progress,
    [0, 1],
    [project.initialZ, project.targetZ],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const translateX = interpolate(
    progress,
    [0, 1],
    [0, project.targetX],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const translateY = interpolate(
    progress,
    [0, 1],
    [150, project.targetY],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const opacity = interpolate(progress, [0, 0.3], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scale = interpolate(progress, [0, 1], [0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: `
          translateX(calc(-50% + ${translateX}px)) 
          translateY(calc(-50% + ${translateY}px)) 
          translateZ(${translateZ}px) 
          rotateY(${rotateY}deg) 
          rotateX(${rotateX}deg)
          scale(${scale})
        `,
        transformStyle: "preserve-3d",
        opacity,
        width: 420,
        height: 580,
        borderRadius: 24,
        overflow: "hidden",
        boxShadow: "0 40px 80px rgba(0, 0, 0, 0.6), 0 20px 40px rgba(0, 0, 0, 0.4)",
        border: "4px solid rgba(255, 255, 255, 0.15)",
      }}
    >
      <Img
        src={staticFile(project.image)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "30px",
          background:
            "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)",
        }}
      >
        <h3
          style={{
            color: "white",
            fontSize: "28px",
            fontWeight: "bold",
            margin: 0,
            fontFamily: "system-ui, -apple-system, sans-serif",
            textShadow: "0 2px 8px rgba(0,0,0,0.8)",
          }}
        >
          {project.name}
        </h3>
      </div>
    </div>
  );
};

export const ProjectsScene = () => {
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
        justifyContent: "flex-start",
        paddingTop: 80,
      }}
    >
      {/* Header */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 40,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          zIndex: 10,
        }}
      >
        <h2
          style={{
            color: "white",
            fontSize: "56px",
            fontWeight: "bold",
            marginBottom: 16,
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          Projects we've worked on
        </h2>
      </div>

      {/* 3D Cards Container */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 650,
          perspective: "1500px",
          perspectiveOrigin: "center center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {projects.map((project) => (
          <Card3D key={project.name} project={project} />
        ))}
      </div>
    </AbsoluteFill>
  );
};

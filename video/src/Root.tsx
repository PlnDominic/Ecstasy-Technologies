import { Composition, Folder } from "remotion";
import { PromoVideo } from "./PromoVideo";
import { HeroScene } from "./scenes/HeroScene";
import { ServicesScene } from "./scenes/ServicesScene";
import { CounterScene } from "./scenes/CounterScene";
import { ProjectsScene } from "./scenes/ProjectsScene";
import { OutroScene } from "./scenes/OutroScene";

export const VIDEO_CONFIG = {
  width: 1920,
  height: 1080,
  fps: 30,
};

export const RemotionRoot = () => {
  return (
    <>
      {/* Main Promo Video */}
      <Composition
        id="PromoVideo"
        component={PromoVideo}
        durationInFrames={660}
        fps={VIDEO_CONFIG.fps}
        width={VIDEO_CONFIG.width}
        height={VIDEO_CONFIG.height}
      />

      {/* Individual Scenes for Preview */}
      <Folder name="Scenes">
        <Composition
          id="HeroScene"
          component={HeroScene}
          durationInFrames={120}
          fps={VIDEO_CONFIG.fps}
          width={VIDEO_CONFIG.width}
          height={VIDEO_CONFIG.height}
        />

        <Composition
          id="ServicesScene"
          component={ServicesScene}
          durationInFrames={150}
          fps={VIDEO_CONFIG.fps}
          width={VIDEO_CONFIG.width}
          height={VIDEO_CONFIG.height}
        />

        <Composition
          id="CounterScene"
          component={CounterScene}
          durationInFrames={120}
          fps={VIDEO_CONFIG.fps}
          width={VIDEO_CONFIG.width}
          height={VIDEO_CONFIG.height}
        />

        <Composition
          id="ProjectsScene"
          component={ProjectsScene}
          durationInFrames={120}
          fps={VIDEO_CONFIG.fps}
          width={VIDEO_CONFIG.width}
          height={VIDEO_CONFIG.height}
        />

        <Composition
          id="OutroScene"
          component={OutroScene}
          durationInFrames={150}
          fps={VIDEO_CONFIG.fps}
          width={VIDEO_CONFIG.width}
          height={VIDEO_CONFIG.height}
        />
      </Folder>
    </>
  );
};

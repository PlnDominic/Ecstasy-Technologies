import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { HeroScene } from "./scenes/HeroScene";
import { ServicesScene } from "./scenes/ServicesScene";
import { CounterScene } from "./scenes/CounterScene";
import { ProjectsScene } from "./scenes/ProjectsScene";
import { OutroScene } from "./scenes/OutroScene";

export const PromoVideo = () => {
  return (
    <TransitionSeries>
      {/* Scene 1: Hero - 4 seconds */}
      <TransitionSeries.Sequence durationInFrames={120}>
        <HeroScene />
      </TransitionSeries.Sequence>

      {/* Transition: Fade to Services */}
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 15 })}
      />

      {/* Scene 2: Services - 5 seconds */}
      <TransitionSeries.Sequence durationInFrames={150}>
        <ServicesScene />
      </TransitionSeries.Sequence>

      {/* Transition: Fade to Counter */}
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 15 })}
      />

      {/* Scene 3: Counter - 4 seconds */}
      <TransitionSeries.Sequence durationInFrames={120}>
        <CounterScene />
      </TransitionSeries.Sequence>

      {/* Transition: Slide to Projects */}
      <TransitionSeries.Transition
        presentation={slide({ direction: "from-right" })}
        timing={linearTiming({ durationInFrames: 20 })}
      />

      {/* Scene 4: Projects - 4 seconds */}
      <TransitionSeries.Sequence durationInFrames={120}>
        <ProjectsScene />
      </TransitionSeries.Sequence>

      {/* Transition: Fade to Outro */}
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 15 })}
      />

      {/* Scene 5: Outro - 5 seconds */}
      <TransitionSeries.Sequence durationInFrames={150}>
        <OutroScene />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};

import React, { useEffect, useRef, RefObject } from "react";

import { Player, Controls } from "@lottiefiles/react-lottie-player";

export interface OwnProps {
  className?: string;
  image: string;
  showControls?: boolean;
  style?: Record<string, string>;
  loop?: boolean;
  // keepLastFrame ensures that the animation ends on the last frame instead of
  // the first. This will only be used for non-looping animations.
  keepLastFrame?: boolean;
  autoplay?: boolean;
}

const LottieWebPlayer: React.FC<OwnProps> = (props: OwnProps) => {
  const {
    className,
    image,
    showControls,
    style,
    loop = false,
    keepLastFrame = false,
    autoplay = true,
  } = props;
  const player = useRef() as RefObject<Player>;

  useEffect(() => {
    if (autoplay) {
      player.current && player.current.play();
    } else {
      player.current && player.current.stop();
    }
  }, [autoplay]);

  return (
    <div className={className}>
      <Player
        autoplay={autoplay}
        src={image}
        style={style}
        loop={loop}
        keepLastFrame={keepLastFrame}
        ref={player}
      >
        <Controls
          visible={showControls}
          buttons={["play", "repeat", "frame", "debug"]}
        />
      </Player>
    </div>
  );
};

export default LottieWebPlayer;
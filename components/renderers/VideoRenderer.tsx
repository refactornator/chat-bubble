import { Track } from "@mux/spaces-web";
import React, { useEffect, useRef } from "react";

interface Props {
  local: boolean;
  track?: Track;
  hidden: boolean;
  onLoad: () => void;
}

export default function VideoRenderer({
  local,
  track,
  hidden,
  onLoad = () => {},
}: Props): JSX.Element {
  const videoEl = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const el = videoEl.current;
    if (!el) return;

    track?.attach(el);
    return () => {
      track?.detach(el);
    };
  }, [track]);

  return (
    <video
      ref={videoEl}
      autoPlay
      playsInline
      style={{
        width: "250px",
        height: "250px",
        maxWidth: "250px",
        objectFit: "cover",
        borderRadius: "50%",
        transform: local ? "scaleX(-1)" : "scaleX(1)",
        display: hidden ? "none" : "inline",
      }}
      onLoadedData={onLoad}
    />
  );
}

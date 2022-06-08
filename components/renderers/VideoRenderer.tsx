import { Track } from "@mux/spaces-web";
import React, { useEffect, useRef } from "react";

import styles from "../../styles/VideoRenderer.module.css";

interface Props {
  local: boolean;
  track?: Track;
}

export default function VideoRenderer({ local, track }: Props): JSX.Element {
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
      className={styles.video}
      autoPlay
      playsInline
      style={{
        transform: local ? "scaleX(-1)" : "scaleX(1)",
      }}
    />
  );
}

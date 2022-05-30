import {
  LocalParticipant,
  ParticipantEvent,
  RemoteParticipant,
  Track,
  TrackSource,
} from "@mux/spaces-web";
import React, { useCallback, useEffect, useRef } from "react";

import styles from "../../styles/VideoRenderer.module.css";

interface Props {
  local: boolean;
  participant?: LocalParticipant | RemoteParticipant;
}

export default function VideoRenderer({
  local,
  participant,
}: Props): JSX.Element {
  const videoEl = useRef<HTMLVideoElement | null>(null);

  const attachCameraTrack = useCallback((track) => {
    const el = videoEl.current;
    if (!el) {
      return;
    }
    if (track.source === TrackSource.Camera) {
      track.attach(el);
    }
  }, []);

  useEffect(() => {
    if (!participant) return;

    participant?.getVideoTracks().forEach((track: Track) => {
      attachCameraTrack(track);
    });

    participant?.on(ParticipantEvent.TrackPublished, attachCameraTrack);
    participant?.on(ParticipantEvent.TrackSubscribed, attachCameraTrack);

    return () => {
      participant?.off(ParticipantEvent.TrackPublished, attachCameraTrack);
      participant?.off(ParticipantEvent.TrackSubscribed, attachCameraTrack);
    };
  }, [participant, attachCameraTrack]);

  return (
    <video
      id={participant?.connectionId}
      className={styles.video}
      ref={videoEl}
      autoPlay
      playsInline
      style={{
        transform: local ? "scaleX(-1)" : "scaleX(1)",
      }}
    />
  );
}

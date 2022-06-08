import React from "react";
import {
  LocalParticipant,
  RemoteParticipant,
  TrackSource,
} from "@mux/spaces-web";

import VideoRenderer from "./renderers/VideoRenderer";
import { useParticipant } from "../hooks/useParticipant";

interface Props {
  participant: LocalParticipant | RemoteParticipant;
}

export default function Participant({ participant }: Props): JSX.Element {
  const { isLocal, isMuted, isSpeaking, isCameraOff, subscribedTracks } =
    useParticipant(participant);

  const cameraTrack = subscribedTracks.find(
    (track) => track.source === TrackSource.Camera
  );

  return !participant ? (
    <div style={{ width: "250px", height: "250px", borderRadius: "50%" }}>
      Loading...
    </div>
  ) : (
    <VideoRenderer local={isLocal} track={cameraTrack} />
  );
}

import React, { useState } from "react";
import { Center, Spinner } from "@chakra-ui/react";
import {
  LocalParticipant,
  RemoteParticipant,
  TrackSource,
} from "@mux/spaces-web";

import { useParticipant } from "../hooks/useParticipant";

import VideoRenderer from "./renderers/VideoRenderer";

interface Props {
  participant: LocalParticipant | RemoteParticipant;
}

export default function Participant({ participant }: Props): JSX.Element {
  const { isLocal, isMuted, isSpeaking, isCameraOff, subscribedTracks } =
    useParticipant(participant);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const cameraTrack = subscribedTracks.find(
    (track) => track.source === TrackSource.Camera
  );

  return (
    <Center
      width="254px"
      height="254px"
      borderRadius="50%"
      border="2px solid black"
    >
      {!videoLoaded && <Spinner />}
      <VideoRenderer
        local={isLocal}
        track={cameraTrack}
        hidden={!videoLoaded}
        onLoad={() => setVideoLoaded(true)}
      />
    </Center>
  );
}

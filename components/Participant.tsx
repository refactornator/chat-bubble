import React from "react";
import { LocalParticipant, RemoteParticipant } from "@mux/spaces-web";

import VideoRenderer from "./renderers/VideoRenderer";

interface Props {
  participant: LocalParticipant | RemoteParticipant;
}

export default function Participant({ participant }: Props): JSX.Element {
  const local = participant instanceof LocalParticipant;

  return !participant ? (
    <div style={{ width: "250px", height: "250px", borderRadius: "50%" }}>
      Loading...
    </div>
  ) : (
    <VideoRenderer local={local} participant={participant} />
  );
}

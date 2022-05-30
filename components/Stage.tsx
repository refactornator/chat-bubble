import React, { useEffect } from "react";

import { CreateLocalMediaOptions, LocalTrack } from "@mux/spaces-web";

import Participant from "./Participant";

import { useLocalParticipant } from "../hooks/useLocalParticipant";
import { useParticipants } from "../hooks/useParticipants";

export default function Stage(): JSX.Element {
  const localParticipant = useLocalParticipant();
  const participants = useParticipants();

  useEffect(() => {
    async function publishTracks() {
      if (!localParticipant) {
        return;
      }

      let options: CreateLocalMediaOptions = { video: {}, audio: {} };
      let tracks: LocalTrack[] | undefined = undefined;
      try {
        tracks = await localParticipant.getUserMedia(options);
      } catch (e) {
        // May occur if previously set device IDs are no longer available
        if (e instanceof DOMException) {
          // permission denied to camera
        } else {
          console.error(e);
        }
      }
      if (tracks) {
        localParticipant.publishTracks(tracks);
      }
    }
    publishTracks();
  }, [localParticipant]);

  return (
    <>
      <Participant participant={localParticipant} />
      {participants.map((participant) => (
        <Participant key={participant.connectionId} participant={participant} />
      ))}
    </>
  );
}

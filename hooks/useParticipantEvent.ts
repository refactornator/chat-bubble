import { useEffect } from "react";
import {
  LocalParticipant,
  ParticipantEvent,
  RemoteParticipant,
} from "@mux/spaces-web";

interface Props {
  participant?: LocalParticipant | RemoteParticipant;
  event: ParticipantEvent;
  callback: () => void;
}

export const useTrackPublished = (
  callback: () => void,
  participant?: LocalParticipant | RemoteParticipant
) => {
  useParticipantEvent({
    participant,
    event: ParticipantEvent.TrackPublished,
    callback,
  });
};

export const useTrackUnpublished = (
  callback: () => void,
  participant?: LocalParticipant | RemoteParticipant
) => {
  useParticipantEvent({
    participant,
    event: ParticipantEvent.TrackUnpublished,
    callback,
  });
};

export const useParticipantEvent = ({
  participant,
  event,
  callback,
}: Props) => {
  useEffect(() => {
    participant?.on(event, callback);
    return () => {
      participant?.off(event, callback);
    };
  }, [participant, event, callback]);
};

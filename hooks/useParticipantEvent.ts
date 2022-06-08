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

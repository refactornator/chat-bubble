import React, { useEffect, useRef, useState } from "react";
import {
  LocalParticipant,
  RemoteParticipant,
  Space,
  SpaceEvent,
} from "@mux/spaces-web";

import { MuxContext } from "./MuxContext";

type Props = {
  jwt: string;
  children: JSX.Element;
};

export const SpaceProvider = ({ jwt, children }: Props) => {
  const spaceRef = useRef<Space>(null);
  const [participants, setParticipants] = useState<RemoteParticipant[]>([]);
  const [localParticipant, setLocalParticipant] =
    useState<LocalParticipant>(null);

  useEffect(() => {
    if (!jwt) {
      return;
    }

    const space = new Space(jwt);

    const handleParticipantJoined = (newParticipant: RemoteParticipant) => {
      setParticipants((oldParticipantArray) => {
        // Prevent duplicate participant object from being added
        const found = oldParticipantArray.find(
          (p) => p.connectionId === newParticipant.connectionId
        );
        if (!found) {
          return [...oldParticipantArray, newParticipant];
        }
        return oldParticipantArray;
      });
    };

    const handleParticipantLeft = (participantLeaving: RemoteParticipant) => {
      setParticipants((oldParticipantArray) =>
        oldParticipantArray.filter(
          (p) => p.connectionId !== participantLeaving.connectionId
        )
      );
    };

    space.on(SpaceEvent.ParticipantJoined, handleParticipantJoined);
    space.on(SpaceEvent.ParticipantLeft, handleParticipantLeft);

    space.join().then((localParticipant: LocalParticipant) => {
      setLocalParticipant(localParticipant);
    });

    spaceRef.current = space;

    return () => {
      space.off(SpaceEvent.ParticipantJoined, handleParticipantJoined);
      space.off(SpaceEvent.ParticipantLeft, handleParticipantLeft);

      setParticipants([]);
      space.leave();
    };
  }, [jwt]);

  return spaceRef.current && localParticipant ? (
    <MuxContext.Provider
      value={{ space: spaceRef.current, participants, localParticipant }}
    >
      {children}
    </MuxContext.Provider>
  ) : null;
};

import React, { useEffect, useState } from "react";
import { Box, Center, Flex, Spinner } from "@chakra-ui/react";
import { CreateLocalMediaOptions, LocalTrack } from "@mux/spaces-web";

import { useLocalParticipant } from "../hooks/useLocalParticipant";
import {
  useTrackPublished,
  useTrackUnpublished,
} from "../hooks/useParticipantEvent";
import { useParticipants } from "../hooks/useParticipants";

import Participant from "./Participant";

export default function Stage(): JSX.Element {
  const localParticipant = useLocalParticipant();
  const participants = useParticipants();
  const [tracksPublished, setTracksPublished] = useState(false);

  useTrackPublished(() => setTracksPublished(true), localParticipant);
  useTrackUnpublished(() => setTracksPublished(false), localParticipant);

  useEffect(() => {
    if (!localParticipant) {
      return;
    }

    async function publishTracks() {
      let options: CreateLocalMediaOptions = { video: {}, audio: {} };
      let tracks: LocalTrack[] = [];
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
      if (tracks.length) {
        localParticipant.publishTracks(tracks);
      }
    }

    publishTracks();
  }, [localParticipant]);

  return (
    <Box height="100%">
      {!tracksPublished ? (
        <Center height="100%">
          <Spinner size="xl" />
        </Center>
      ) : (
        <Flex
          height="100%"
          justifyContent="space-around"
          alignItems="center"
          wrap="wrap"
        >
          <Participant participant={localParticipant} />
          {participants.map((participant) => (
            <Participant
              key={participant.connectionId}
              participant={participant}
            />
          ))}
        </Flex>
      )}
    </Box>
  );
}

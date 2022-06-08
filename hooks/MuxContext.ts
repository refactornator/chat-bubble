import { LocalParticipant, RemoteParticipant, Space } from "@mux/spaces-web";
import { createContext } from "react";

interface Mux {
  space: Space;
  localParticipant: LocalParticipant;
  participants: RemoteParticipant[];
}

export const MuxContext = createContext<Mux>(null);

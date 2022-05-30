import { LocalParticipant, RemoteParticipant, Space } from "@mux/spaces-web";
import { createContext } from "react";

interface Mux {
  space: Space | null;
  localParticipant: LocalParticipant | null;
  participants: RemoteParticipant[];
}

export const MuxContext = createContext<Mux>(null);

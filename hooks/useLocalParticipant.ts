import { LocalParticipant } from "@mux/spaces-web";
import { useContext } from "react";

import { MuxContext } from "./MuxContext";

/**
 * Returns localParticipant instance passed to or created by closest <SpaceProvider>.
 */
export const useLocalParticipant = (): LocalParticipant => {
  const mux = useContext(MuxContext);

  return mux.localParticipant;
};

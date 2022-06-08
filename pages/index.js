import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { SpaceProvider } from "../hooks/SpaceProvider";
import Stage from "../components/Stage";

import styles from "../styles/Home.module.css";

const SPACE_ID = "3PeWMqP1ogDeAAUyQ8NTSKDN3GihgfRFQj9CNG95jgY";

export default function Home() {
  const router = useRouter();
  const { isReady: isRouterReady } = router;
  const [spaceJWT, setSpaceJWT] = useState("");

  useEffect(() => {
    if (!isRouterReady) return;

    const fetchJWT = async () => {
      const response = await fetch(`/api/token/${SPACE_ID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const parsedResponse = await response.json();
      setSpaceJWT(parsedResponse?.spaceJWT);
    };

    fetchJWT();
  }, [isRouterReady]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Chat-Bubble</title>
        <meta name="description" content="A bubble chat app." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SpaceProvider jwt={spaceJWT}>
        <Stage />
      </SpaceProvider>
    </div>
  );
}

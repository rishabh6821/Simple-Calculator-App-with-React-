import React from "react";
import Particles from "react-tsparticles";

export default function BackgroundParticles() {
  return (
    <Particles
      id="tsparticles"
      options={{
        background: { color: "#0d0d0d" },
        particles: {
          number: { value: 50 },
          size: { value: 4 },
          move: { speed: 2 },
          color: { value: "#ffffff" }
        }
      }}
    />
  );
}

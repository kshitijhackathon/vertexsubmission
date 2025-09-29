import React from "react";
import { Hero } from "../components/Hero";
import { DisasterModules } from "../components/DisasterModules";
import { LiveAlerts } from "../components/LiveAlerts";
import { VirtualDrills } from "../components/VirtualDrills";
import { Leaderboard } from "../components/Leaderboard";

export const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <DisasterModules />
      <LiveAlerts />
      <VirtualDrills />
      <Leaderboard />
    </>
  );
};



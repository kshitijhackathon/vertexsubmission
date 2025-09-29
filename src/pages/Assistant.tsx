import React from "react";
import { FloodAssistant } from "../components/FloodAssistant";

export const Assistant: React.FC = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">AI Flood Assistant</h1>
        <p className="text-gray-600 mb-6">Ask questions about flood preparedness, evacuation, emergency kits, alerts, and more.</p>
        <FloodAssistant />
      </div>
    </section>
  );
};



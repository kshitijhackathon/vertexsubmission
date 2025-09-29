import React from "react";

export const Demo: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Platform Demo</h1>
        <p className="text-gray-600 mb-8">
          Watch this short walkthrough of DisasterPrep features: learning modules, real-time alerts, and virtual drills.
        </p>
        <div className="aspect-video w-full bg-black rounded-xl overflow-hidden shadow-xl">
          <iframe
            className="w-full h-full"
            src="https://www.youtube-nocookie.com/embed/MfPXRBC7XKU"
            title="School Mock Drill Demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
};



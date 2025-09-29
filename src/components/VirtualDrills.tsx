import React, { useState } from 'react';
import { PlayCircle, CheckCircle, AlertCircle, Timer, Users, Target } from 'lucide-react';

export const VirtualDrills: React.FC = () => {
  const [activeDrill, setActiveDrill] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const drills = [
    {
      id: 'earthquake-drill',
      title: 'Earthquake Evacuation Drill',
      description: 'Practice Drop, Cover, and Hold procedures with guided instructions.',
      duration: '8 minutes',
      participants: 45,
      difficulty: 'Intermediate',
      steps: [
        'Drop to hands and knees immediately',
        'Take cover under desk or table',
        'Hold on and protect head and neck',
        'Wait for shaking to stop completely',
        'Exit building via designated routes',
        'Gather at assembly point'
      ],
      color: 'from-yellow-500 to-orange-600',
      bgColor: 'bg-yellow-50'
    },
    {
      id: 'fire-drill',
      title: 'Fire Emergency Drill',
      description: 'Learn proper evacuation routes and assembly procedures for fire emergencies.',
      duration: '6 minutes',
      participants: 38,
      difficulty: 'Basic',
      steps: [
        'Alert others nearby immediately',
        'Activate fire alarm if present',
        'Exit via nearest safe route',
        'Close doors behind you',
        'Do not use elevators',
        'Meet at designated assembly area'
      ],
      color: 'from-red-500 to-red-700',
      bgColor: 'bg-red-50'
    },
    {
      id: 'flood-drill',
      title: 'Flood Response Drill',
      description: 'Practice vertical evacuation and water safety procedures.',
      duration: '10 minutes',
      participants: 32,
      difficulty: 'Advanced',
      steps: [
        'Move to higher ground immediately',
        'Avoid walking through flowing water',
        'Turn off electrical power if safe',
        'Gather emergency supplies',
        'Signal for help if needed',
        'Wait for rescue assistance'
      ],
      color: 'from-blue-500 to-blue-700',
      bgColor: 'bg-blue-50'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      'Basic': 'bg-green-100 text-green-800',
      'Intermediate': 'bg-yellow-100 text-yellow-800',
      'Advanced': 'bg-red-100 text-red-800'
    };
    return colors[difficulty as keyof typeof colors];
  };

  const startDrill = (drillId: string) => {
    setActiveDrill(drillId);
    setCurrentStep(0);
  };

  const nextStep = () => {
    const drill = drills.find(d => d.id === activeDrill);
    if (drill && currentStep < drill.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const completeDrill = () => {
    setActiveDrill(null);
    setCurrentStep(0);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Virtual Emergency Drills
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Practice emergency response procedures with guided virtual drills 
            and step-by-step instructions for various disaster scenarios.
          </p>
        </div>
        
        {!activeDrill ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {drills.map((drill) => (
              <div
                key={drill.id}
                className={`${drill.bgColor} rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{drill.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(drill.difficulty)}`}>
                    {drill.difficulty}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-6">{drill.description}</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Timer className="w-4 h-4" />
                      <span>{drill.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{drill.participants} joined</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Target className="w-4 h-4 mr-1" />
                    <span>{drill.steps.length} steps to complete</span>
                  </div>
                </div>
                
                <button
                  onClick={() => startDrill(drill.id)}
                  className={`w-full bg-gradient-to-r ${drill.color} text-white py-3 rounded-xl font-medium flex items-center justify-center space-x-2 hover:shadow-lg transition-all duration-200`}
                >
                  <PlayCircle className="w-5 h-5" />
                  <span>Start Drill</span>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {(() => {
              const drill = drills.find(d => d.id === activeDrill);
              if (!drill) return null;
              
              return (
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className={`bg-gradient-to-r ${drill.color} text-white p-6`}>
                    <h3 className="text-2xl font-bold mb-2">{drill.title}</h3>
                    <p className="opacity-90">Step {currentStep + 1} of {drill.steps.length}</p>
                  </div>
                  
                  <div className="p-8">
                    <div className="mb-8">
                      <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                        <div 
                          className={`bg-gradient-to-r ${drill.color} h-3 rounded-full transition-all duration-500`}
                          style={{ width: `${((currentStep + 1) / drill.steps.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="text-center mb-8">
                      <div className={`w-16 h-16 bg-gradient-to-r ${drill.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <AlertCircle className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-4">
                        {drill.steps[currentStep]}
                      </h4>
                      <p className="text-gray-600 max-w-2xl mx-auto">
                        Follow this instruction carefully and click next when completed. 
                        Take your time to perform this step properly.
                      </p>
                    </div>
                    
                    <div className="flex justify-center space-x-4">
                      {currentStep < drill.steps.length - 1 ? (
                        <button
                          onClick={nextStep}
                          className={`bg-gradient-to-r ${drill.color} text-white px-8 py-3 rounded-xl font-medium flex items-center space-x-2`}
                        >
                          <span>Next Step</span>
                          <CheckCircle className="w-5 h-5" />
                        </button>
                      ) : (
                        <button
                          onClick={completeDrill}
                          className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-xl font-medium flex items-center space-x-2"
                        >
                          <CheckCircle className="w-5 h-5" />
                          <span>Complete Drill</span>
                        </button>
                      )}
                      
                      <button
                        onClick={() => setActiveDrill(null)}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-xl font-medium transition-colors duration-200"
                      >
                        Exit Drill
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </section>
  );
};
import React, { useEffect, useMemo, useState } from 'react';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';
import { 
  Zap, 
  Waves, 
  Flame, 
  Wind, 
  Play, 
  BookOpen, 
  Clock,
  Users
} from 'lucide-react';
// import { FloodAssistant } from './FloodAssistant';

export const DisasterModules: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});
  const [playerError, setPlayerError] = useState<boolean>(false);
  const navigate = useNavigate();

  // Persisted progress
  useEffect(() => {
    const saved = localStorage.getItem('moduleProgress');
    if (saved) {
      try {
        setProgressMap(JSON.parse(saved));
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('moduleProgress', JSON.stringify(progressMap));
  }, [progressMap]);

  useEffect(() => {
    // Close assistant when switching modules
    setPlayerError(false);
  }, [selectedModule]);

  const modules = [
    {
      id: 'earthquake',
      title: 'Earthquake Safety',
      description: 'Learn how to respond during seismic activities and protect yourself.',
      icon: Zap,
      color: 'from-yellow-500 to-orange-600',
      bgColor: 'bg-yellow-50',
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      progress: 0,
      lessons: 12,
      duration: '45 min',
      participants: 1248
    },
    {
      id: 'flood',
      title: 'Flood Response',
      description: 'Understanding flood risks and evacuation procedures.',
      icon: Waves,
      color: 'from-blue-500 to-blue-700',
      bgColor: 'bg-blue-50',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      progress: 0,
      lessons: 10,
      duration: '35 min',
      participants: 956
    },
    {
      id: 'fire',
      title: 'Fire Safety',
      description: 'Fire prevention, detection, and emergency evacuation tactics.',
      icon: Flame,
      color: 'from-red-500 to-red-700',
      bgColor: 'bg-red-50',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      progress: 0,
      lessons: 8,
      duration: '30 min',
      participants: 1567
    },
    {
      id: 'cyclone',
      title: 'Cyclone Preparedness',
      description: 'Tropical cyclone awareness and shelter protocols.',
      icon: Wind,
      color: 'from-purple-500 to-purple-700',
      bgColor: 'bg-purple-50',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      progress: 0,
      lessons: 15,
      duration: '50 min',
      participants: 723
    }
  ];

  // Module video URLs (school mock drills and safety explainers)
  const moduleVideoUrl: Record<string, string> = useMemo(() => ({
    earthquake: 'https://youtu.be/w2dXSGVQ2Go',
    flood: 'https://youtu.be/7dPIqK09mKI',
    fire: 'https://youtu.be/GVBamXXVD30',
    cyclone: 'https://youtu.be/O4pFdLJmG7M'
  }), []);

  // Type-friendly alias to avoid TS friction from react-player types
  const Player = ReactPlayer as unknown as React.ComponentType<any>;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Interactive Learning Modules
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Master disaster preparedness through engaging videos, interactive quizzes, and realistic simulations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {modules.map((module) => {
            const Icon = module.icon;
            const percent = Math.max(0, Math.min(100, progressMap[module.id] ?? module.progress));
            return (
              <div
                key={module.id}
                className={`${module.bgColor} rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer`}
                onClick={() => setSelectedModule(module.id)}
              >
                <div className={`w-14 h-14 ${module.iconBg} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className={`w-7 h-7 ${module.iconColor}`} />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{module.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{module.description}</p>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Progress</span>
                    <span>{percent}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`bg-gradient-to-r ${module.color} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <BookOpen className="w-3 h-3" />
                    <span>{module.lessons} lessons</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{module.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-3 h-3" />
                    <span>{module.participants}</span>
                  </div>
                </div>
                
                <button className={`w-full bg-gradient-to-r ${module.color} text-white py-3 rounded-xl font-medium flex items-center justify-center space-x-2 hover:shadow-lg transition-all duration-200`}>
                  <Play className="w-4 h-4" />
                  <span>Continue Learning</span>
                </button>
              </div>
            );
          })}
        </div>
        
        {selectedModule && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/60" onClick={() => setSelectedModule(null)} />
            <div className="relative bg-white rounded-2xl shadow-2xl w-11/12 max-w-5xl p-6">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 text-center">
                {modules.find(m => m.id === selectedModule)?.title} Module
              </h3>
              <div className="aspect-video w-full rounded-xl overflow-hidden bg-black">
                <Player
                  url={moduleVideoUrl[selectedModule]}
                  width="100%"
                  height="100%"
                  controls
                  config={{ youtube: { playerVars: { rel: 0 }}}}
                  onError={() => setPlayerError(true)}
                  onProgress={(state: any) => {
                    const playedPercent = Math.round((state?.played ?? 0) * 100);
                    setProgressMap(prev => {
                      const current = prev[selectedModule] ?? 0;
                      if (playedPercent <= current) return prev;
                      return { ...prev, [selectedModule]: Math.min(100, playedPercent) };
                    });
                  }}
                />
              </div>
              {playerError && (
                <div className="mt-3 text-sm text-red-600 text-center">
                  Video failed to load. <a className="underline" href={moduleVideoUrl[selectedModule]!} target="_blank" rel="noreferrer">Open on YouTube</a>
                </div>
              )}
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                {selectedModule === 'flood' && (
                  <>
                    <button
                      onClick={() => navigate('/quiz/flood')}
                      className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-5 py-2 rounded-xl font-medium"
                    >
                      Take Flood Quiz
                    </button>
                    <a
                      href={moduleVideoUrl[selectedModule]!}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-white border border-blue-600 text-blue-700 px-5 py-2 rounded-xl font-medium"
                    >
                      Open on YouTube
                    </a>
                  </>
                )}
                <button
                  onClick={() => setSelectedModule(null)}
                  className="bg-gray-800 text-white px-5 py-2 rounded-xl font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
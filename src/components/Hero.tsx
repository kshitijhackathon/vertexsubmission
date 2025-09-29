
import React from 'react';
import { Shield, Siren, Play, BookOpen, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Hero: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-blue-50">
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-r from-blue-700 to-blue-800 p-4 rounded-full shadow-md">
              <Siren className="w-6 h-6 text-white" />
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Disaster Preparedness
            <span className="bg-gradient-to-r from-blue-700 to-blue-800 bg-clip-text text-transparent block">
              Education System
            </span>
          </h1>

          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-10">
            Empowering schools and colleges with comprehensive disaster preparedness training through 
            interactive learning, real-time alerts, and emergency response capabilities.
          </p>

          {/* ✅ Government-style buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate('/learn')} className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 shadow-md flex items-center justify-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <span>Start Learning Now</span>
            </button>
            
            <button onClick={() => navigate('/demo')} className="bg-white hover:bg-gray-100 text-blue-700 border border-blue-700 px-8 py-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2">
              <Play className="w-5 h-5" />
              <span>Watch Demo</span>
            </button>
          </div>
        </div>

        {/* ✅ Cards remain, but still match official look */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-blue-700" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Interactive Learning</h3>
            <p className="text-gray-700">Comprehensive modules covering earthquakes, floods, fires, and cyclones with videos, quizzes, and simulations.</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <AlertCircle className="w-6 h-6 text-green-700" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Alerts</h3>
            <p className="text-gray-700">Location-based weather alerts and disaster notifications to keep your institution prepared.</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-orange-700" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Virtual Drills</h3>
            <p className="text-gray-700">Practice emergency response with guided virtual drills and step-by-step instructions.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

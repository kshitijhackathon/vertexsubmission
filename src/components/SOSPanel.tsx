import React, { useState } from 'react';
import { Phone, MessageSquare, MapPin, AlertCircle } from 'lucide-react';

export const SOSPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const emergencyContacts = [
    {
      service: 'Police',
      number: '100',
      icon: '🚔',
      color: 'from-blue-600 to-blue-700'
    },
    {
      service: 'Fire Department',
      number: '101',
      icon: '🚒',
      color: 'from-red-600 to-red-700'
    },
    {
      service: 'Ambulance',
      number: '108',
      icon: '🚑',
      color: 'from-green-600 to-green-700'
    },
    {
      service: 'Disaster Management',
      number: '1078',
      icon: '🆘',
      color: 'from-orange-600 to-orange-700'
    }
  ];

  return (
    <>
      {/* SOS Button - Fixed Position */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-full shadow-lg flex items-center justify-center z-50 transform hover:scale-110 transition-all duration-200"
      >
        <AlertCircle className="w-8 h-8" />
      </button>

      {/* SOS Panel Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden">
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold flex items-center space-x-2">
                    <AlertCircle className="w-6 h-6" />
                    <span>Emergency SOS</span>
                  </h3>
                  <p className="text-red-100 text-sm mt-1">Quick access to emergency services</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-red-200 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                {emergencyContacts.map((contact, index) => (
                  <a
                    key={index}
                    href={`tel:${contact.number}`}
                    className={`bg-gradient-to-r ${contact.color} text-white p-4 rounded-xl flex flex-col items-center text-center hover:shadow-lg transition-all duration-200 transform hover:scale-105`}
                  >
                    <div className="text-2xl mb-2">{contact.icon}</div>
                    <div className="text-sm font-medium">{contact.service}</div>
                    <div className="text-lg font-bold">{contact.number}</div>
                  </a>
                ))}
              </div>
              
              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-medium flex items-center justify-center space-x-2 hover:shadow-lg transition-all duration-200">
                  <MessageSquare className="w-5 h-5" />
                  <span>Send Emergency SMS</span>
                </button>
                
                <button className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-3 rounded-xl font-medium flex items-center justify-center space-x-2 hover:shadow-lg transition-all duration-200">
                  <MapPin className="w-5 h-5" />
                  <span>Share Location</span>
                </button>
              </div>
              
              <div className="mt-6 p-4 bg-red-50 rounded-xl border border-red-200">
                <h4 className="font-semibold text-red-900 mb-2">Emergency Guidelines:</h4>
                <ul className="text-sm text-red-800 space-y-1">
                  <li>• Stay calm and speak clearly</li>
                  <li>• Provide your exact location</li>
                  <li>• Describe the emergency situation</li>
                  <li>• Follow dispatcher instructions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
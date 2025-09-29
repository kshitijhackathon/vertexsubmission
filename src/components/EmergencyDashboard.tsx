import React, { useState, useEffect } from 'react';
import {
  AlertTriangle,
  Heart,
  MapPin,
  Phone,
  Shield,
  Siren,
  Users,
  Zap,
  Cloud,
  Clock,
  Bell
} from 'lucide-react';

interface EmergencyDashboardProps {
  user: any;
}

const EmergencyDashboard: React.FC<EmergencyDashboardProps> = ({ user }) => {
  const [sosActive, setSosActive] = useState(false);
  const [emergencyType, setEmergencyType] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const activateSOS = (type: string) => {
    setEmergencyType(type);
    setSosActive(true);
    // In a real app, trigger emergency protocols here
    setTimeout(() => {
      setSosActive(false);
    }, 5000);
  };

  const emergencyContacts = [
    { name: 'Police', number: '100', color: 'bg-blue-500', icon: Shield },
    { name: 'Fire Department', number: '101', color: 'bg-red-500', icon: Siren },
    { name: 'Ambulance', number: '102', color: 'bg-green-500', icon: Heart },
    { name: 'Disaster Helpline', number: '1078', color: 'bg-orange-500', icon: AlertTriangle }
  ];

  const localContacts = [
    { name: 'Delhi Hospital', number: '+91-11-2234-5678', location: 'Central Delhi' },
    { name: 'Delhi Police Station', number: '+91-11-1234-5678', location: 'Connaught Place' },
    { name: 'NDRF Team Delhi', number: '+91-11-3456-7890', location: 'Delhi NCR' },
    { name: 'School Admin', number: '+91-11-9876-5432', location: user.institution }
  ];

  const alerts = [
    {
      id: 1,
      type: 'weather',
      severity: 'high',
      title: 'Heavy Rainfall Warning',
      location: 'Mumbai, Maharashtra',
      description: 'Intense rainfall expected in next 2-4 hours. Flooding possible in low-lying areas.',
      time: '2 minutes ago',
      icon: Cloud,
      color: 'from-orange-500 to-red-600',
      bgColor: 'bg-orange-50 border-orange-200'
    },
    {
      id: 2,
      type: 'earthquake',
      severity: 'medium',
      title: 'Seismic Activity Detected',
      location: 'Delhi NCR',
      description: 'Minor tremors reported. No immediate danger. Stay alert for aftershocks.',
      time: '15 minutes ago',
      icon: AlertTriangle,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50 border-yellow-200'
    },
    {
      id: 3,
      type: 'cyclone',
      severity: 'low',
      title: 'Cyclone Watch',
      location: 'Chennai, Tamil Nadu',
      description: 'Tropical depression forming in Bay of Bengal. Monitor for updates.',
      time: '1 hour ago',
      icon: Cloud,
      color: 'from-blue-500 to-purple-500',
      bgColor: 'bg-blue-50 border-blue-200'
    }
  ];

  const getSeverityBadge = (severity: string) => {
    const styles = {
      high: 'bg-red-100 text-red-800 border-red-200',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      low: 'bg-blue-100 text-blue-800 border-blue-200'
    };
    return styles[severity as keyof typeof styles];
  };

  if (sosActive) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-500 text-white rounded-xl p-8 text-center animate-pulse">
          <Siren className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-4">SOS ACTIVATED</h1>
          <p className="text-xl mb-6">Emergency Type: {emergencyType}</p>
          <div className="bg-red-600 rounded-lg p-4 mb-6">
            <p className="text-lg font-semibold">Alert sent to:</p>
            <p>• School Administration</p>
            <p>• Local Emergency Services</p>
            <p>• Registered Emergency Contacts</p>
          </div>
          <p className="text-sm opacity-90">
            Location: {user.institution}, {user.region}
          </p>
          <p className="text-sm opacity-90">Time: {new Date().toLocaleString()}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Emergency Dashboard</h1>
        <p className="text-gray-600">
          Real-time alerts, SOS activation, and emergency contacts in one place.
        </p>
      </div>

      {/* SOS Section */}
      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-red-800 mb-4 flex items-center">
          <AlertTriangle className="h-6 w-6 mr-2" />
          Emergency SOS
        </h2>
        <p className="text-red-700 mb-6">
          Use these buttons only in real emergencies. Your location and contact information will be immediately shared with emergency services and school administration.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => activateSOS('Fire Emergency')}
            className="bg-red-500 hover:bg-red-600 text-white p-4 rounded-lg flex flex-col items-center"
          >
            <Siren className="h-8 w-8 mb-2" />
            <span className="font-semibold">FIRE</span>
          </button>
          <button
            onClick={() => activateSOS('Medical Emergency')}
            className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-lg flex flex-col items-center"
          >
            <Heart className="h-8 w-8 mb-2" />
            <span className="font-semibold">MEDICAL</span>
          </button>
          <button
            onClick={() => activateSOS('Security Emergency')}
            className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg flex flex-col items-center"
          >
            <Shield className="h-8 w-8 mb-2" />
            <span className="font-semibold">SECURITY</span>
          </button>
          <button
            onClick={() => activateSOS('Natural Disaster')}
            className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-lg flex flex-col items-center"
          >
            <Zap className="h-8 w-8 mb-2" />
            <span className="font-semibold">DISASTER</span>
          </button>
        </div>
      </div>

      {/* Real-Time Alerts */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Real-Time Alerts & Monitoring
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {alerts.map((alert) => {
              const Icon = alert.icon;
              return (
                <div
                  key={alert.id}
                  className={`${alert.bgColor} border-2 rounded-2xl p-6 hover:shadow-lg transition-all`}
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${alert.color} rounded-xl flex items-center justify-center`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{alert.title}</h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${getSeverityBadge(alert.severity)}`}
                        >
                          {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{alert.location}</span>
                        <Clock className="w-4 h-4 ml-4 mr-1" />
                        <span>{alert.time}</span>
                      </div>
                      <p className="text-gray-700 mb-4">{alert.description}</p>
                      <div className="flex space-x-3">
                        <button className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium">
                          View Details
                        </button>
                        <button
                          onClick={() => activateSOS(`${alert.title} Emergency`)}
                          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium"
                        >
                          Take Action
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Bell className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Alert Settings</h3>
              </div>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                  <span className="ml-2 text-sm text-gray-700">Weather Warnings</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                  <span className="ml-2 text-sm text-gray-700">Earthquake Alerts</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="ml-2 text-sm text-gray-700">Fire Incidents</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                  <span className="ml-2 text-sm text-gray-700">Cyclone Updates</span>
                </label>
              </div>
              <button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 rounded-lg font-medium">
                Update Preferences
              </button>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Location</span>
                  <span className="font-medium">Delhi, India</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Weather</span>
                  <span className="font-medium">Partly Cloudy</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Risk Level</span>
                  <span className="text-emerald-600 font-medium">Low</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Updated</span>
                  <span className="font-medium">{currentTime.toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contacts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Phone className="h-5 w-5 mr-2 text-blue-600" />
            National Emergency Numbers
          </h3>
          <div className="space-y-3">
            {emergencyContacts.map((contact) => {
              const Icon = contact.icon;
              return (
                <div
                  key={contact.name}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center">
                    <div className={`p-2 rounded-lg ${contact.color} mr-3`}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-medium text-gray-900">{contact.name}</span>
                  </div>
                  <a
                    href={`tel:${contact.number}`}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    {contact.number}
                  </a>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-green-600" />
            Local Emergency Contacts
          </h3>
          <div className="space-y-3">
            {localContacts.map((contact, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-gray-900">{contact.name}</span>
                  <a
                    href={`tel:${contact.number}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Call
                  </a>
                </div>
                <p className="text-sm text-gray-600">{contact.location}</p>
                <p className="text-sm text-gray-500">{contact.number}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Assembly Points */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <Users className="h-5 w-5 mr-2 text-purple-600" />
          Emergency Assembly Points
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-800">Primary Assembly Point</h4>
            <p className="text-green-700 text-sm mt-1">Main Playground</p>
            <p className="text-green-600 text-xs mt-1">Capacity: 1500 people</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800">Secondary Assembly Point</h4>
            <p className="text-blue-700 text-sm mt-1">Basketball Court</p>
            <p className="text-blue-600 text-xs mt-1">Capacity: 800 people</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
            <h4 className="font-semibold text-orange-800">Emergency Exit</h4>
            <p className="text-orange-700 text-sm mt-1">Main Gate</p>
            <p className="text-orange-600 text-xs mt-1">Width: 12 meters</p>
          </div>
        </div>
      </div>

      {/* Important Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-yellow-800 mb-2">
          Important Emergency Guidelines
        </h3>
        <ul className="text-yellow-700 text-sm space-y-1">
          <li>• Stay calm and follow your teacher's instructions</li>
          <li>• Do not use elevators during emergencies</li>
          <li>• Move quickly but do not run</li>
          <li>• Help others if it's safe to do so</li>
          <li>• Report to the designated assembly point</li>
          <li>• Wait for further instructions from emergency personnel</li>
        </ul>
      </div>
    </div>
  );
};

export default EmergencyDashboard;

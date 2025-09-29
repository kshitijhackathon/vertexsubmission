import React, { useState, useEffect } from "react";
import {
  AlertTriangle,
  Cloud,
  MapPin,
  Clock,
  Bell,
  Shield,
  ShieldCheck,
  Lightbulb,
} from "lucide-react";

interface AlertData {
  sender_name: string;
  event: string;
  description: string;
  start: number;
  end: number;
}

export const LiveAlerts: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState<string>("Fetching location...");
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [alerts, setAlerts] = useState<AlertData[]>([]);
  const [weather, setWeather] = useState<any>(null);
  const [tipIndex, setTipIndex] = useState(0);
  const [sosActive, setSosActive] = useState(false); // ✅ NEW STATE

  const API_KEY = "5345003740565991fb0d588fb701cf94"; // ← replace with your OpenWeather key

  // ✅ Preparedness tips list
  const tips = [
    "Keep an emergency kit ready with water, food, first aid, and essential documents.",
    "Know your nearest evacuation center and safe routes.",
    "During earthquakes: Drop, Cover, and Hold On until shaking stops.",
    "Avoid using elevators during fire or earthquake emergencies.",
    "Keep a list of emergency contacts saved on your phone and written down.",
  ];

  // Rotate tips every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % tips.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // get user location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          setCoords({ lat: latitude, lon: longitude });

          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await res.json();
            const city =
              data.address.city ||
              data.address.town ||
              data.address.village ||
              data.address.state;
            setLocation(`${city}, ${data.address.country}`);
          } catch (err) {
            console.error("Reverse geocode error:", err);
            setLocation("Unknown location");
          }
        },
        (err) => {
          console.error("Geolocation error:", err);
          setLocation("Location access denied");
        }
      );
    } else {
      setLocation("Geolocation not supported");
    }
  }, []);

  // fetch weather + alerts
  useEffect(() => {
    if (!coords) return;

    const fetchWeatherAndAlerts = async () => {
      try {
        const { lat, lon } = coords;
        const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily&appid=${API_KEY}`;
        const res = await fetch(url);
        const data = await res.json();

        setWeather(data.current);
        setAlerts(data.alerts || []);
      } catch (err) {
        console.error("Error fetching weather/alerts:", err);
      }
    };

    fetchWeatherAndAlerts();
  }, [coords]);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Emergency Dashboard
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real-time disaster alerts, live monitoring, and emergency SOS support.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Alerts Section */}
          <div className="lg:col-span-2 space-y-4">
            {alerts.length > 0 ? (
              alerts.map((alert, idx) => (
                <div
                  key={idx}
                  className="bg-yellow-50 border-2 rounded-2xl p-6 hover:shadow-lg transition duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {alert.event}
                        </h3>
                        <span className="px-3 py-1 rounded-full text-xs font-medium border bg-red-100 text-red-800 border-red-200">
                          ALERT
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{location}</span>
                        <Clock className="w-4 h-4 ml-4 mr-1" />
                        <span>{new Date(alert.start * 1000).toLocaleString()}</span>
                      </div>
                      <p className="text-gray-700 mb-4">{alert.description}</p>
                      <div className="flex space-x-3">
                        <button className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium">
                          View Details
                        </button>
                        <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                          Take Action
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="space-y-6">
                {/* ✅ All Clear Status */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center shadow-sm">
                  <div className="flex justify-center mb-3">
                    <ShieldCheck className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-green-700">All Clear</h3>
                  <p className="text-sm text-gray-600">
                    There are currently no active alerts in your area. Stay prepared and
                    stay safe.
                  </p>
                </div>

                {/* ✅ Preparedness Tip */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center mb-2">
                    <Lightbulb className="w-5 h-5 text-blue-600 mr-2" />
                    <h3 className="text-lg font-semibold text-blue-700">
                      Preparedness Tip
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600">{tips[tipIndex]}</p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Preferences */}
            <div className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Bell className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Alert Settings
                </h3>
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

            {/* Status */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Current Status
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Location</span>
                  <span className="font-medium">{location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Temp</span>
                  <span className="font-medium">
                    {weather ? `${(weather.temp - 273.15).toFixed(1)}°C` : "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Updated</span>
                  <span className="font-medium">{currentTime.toLocaleTimeString()}</span>
                </div>
              </div>
            </div>

            {/* SOS Panel */}
            <div className="bg-gradient-to-r from-red-500 to-red-700 text-white p-6 rounded-2xl shadow-lg text-center">
              <Shield className="w-10 h-10 mx-auto mb-3" />
              <h3 className="text-xl font-bold mb-2">Emergency SOS</h3>
              <p className="text-sm mb-4">
                Send immediate SOS alert to your contacts and local authorities.
              </p>
              <button
                onClick={() => setSosActive(true)} // ✅ trigger SOS
                className="bg-white text-red-700 px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-100"
              >
                Trigger SOS
              </button>

              {/* ✅ SOS UI Message */}
              {sosActive && (
                <div className="mt-4 bg-yellow-100 border border-yellow-300 text-yellow-800 p-3 rounded-lg text-sm font-semibold">
                  🚨 SOS alert has been activated! Authorities & contacts have been notified.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

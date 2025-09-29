import React from "react";
import { NavLink } from "react-router-dom";

interface HeaderProps {
  user: { email: string; role: string; name: string } | null;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* ✅ Logo + Brand */}
          <div className="flex items-center space-x-3">
            <img
              src="/GOP.png" // Place logo in /public folder
              alt="Govt. Punjab Logo"
              className="w-12 h-12"
            />
            <div>
              <span className="text-2xl font-extrabold text-blue-700 tracking-wide">
                DisasterPrep
              </span>
              <p className="text-sm text-gray-500 -mt-1">Education System</p>
            </div>
          </div>

          {/* ✅ Navigation */}
          <nav className="hidden md:flex space-x-10">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `uppercase font-semibold tracking-wide px-2 pb-1 text-lg transition-all duration-200 ${
                  isActive
                    ? "text-blue-700 border-b-4 border-blue-700"
                    : "text-gray-700 hover:text-blue-700 hover:border-b-2 hover:border-blue-400"
                }`
              }
            >
              home
            </NavLink>
            <NavLink
              to="/learn"
              className={({ isActive }) =>
                `uppercase font-semibold tracking-wide px-2 pb-1 text-lg transition-all duration-200 ${
                  isActive
                    ? "text-blue-700 border-b-4 border-blue-700"
                    : "text-gray-700 hover:text-blue-700 hover:border-b-2 hover:border-blue-400"
                }`
              }
            >
              learn
            </NavLink>
            <NavLink
              to="/alerts"
              className={({ isActive }) =>
                `uppercase font-semibold tracking-wide px-2 pb-1 text-lg transition-all duration-200 ${
                  isActive
                    ? "text-blue-700 border-b-4 border-blue-700"
                    : "text-gray-700 hover:text-blue-700 hover:border-b-2 hover:border-blue-400"
                }`
              }
            >
              alerts
            </NavLink>
            <NavLink
              to="/drills"
              className={({ isActive }) =>
                `uppercase font-semibold tracking-wide px-2 pb-1 text-lg transition-all duration-200 ${
                  isActive
                    ? "text-blue-700 border-b-4 border-blue-700"
                    : "text-gray-700 hover:text-blue-700 hover:border-b-2 hover:border-blue-400"
                }`
              }
            >
              drills
            </NavLink>
            <NavLink
              to="/leaderboard"
              className={({ isActive }) =>
                `uppercase font-semibold tracking-wide px-2 pb-1 text-lg transition-all duration-200 ${
                  isActive
                    ? "text-blue-700 border-b-4 border-blue-700"
                    : "text-gray-700 hover:text-blue-700 hover:border-b-2 hover:border-blue-400"
                }`
              }
            >
              leaderboard
            </NavLink>
            <NavLink
              to="/assistant"
              className={({ isActive }) =>
                `uppercase font-semibold tracking-wide px-2 pb-1 text-lg transition-all duration-200 ${
                  isActive
                    ? "text-blue-700 border-b-4 border-blue-700"
                    : "text-gray-700 hover:text-blue-700 hover:border-b-2 hover:border-blue-400"
                }`
              }
            >
              assistant
            </NavLink>
            {user?.role === "admin" && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `uppercase font-semibold tracking-wide px-2 pb-1 text-lg transition-all duration-200 ${
                    isActive
                      ? "text-blue-700 border-b-4 border-blue-700"
                      : "text-gray-700 hover:text-blue-700 hover:border-b-2 hover:border-blue-400"
                  }`
                }
              >
                admin
              </NavLink>
            )}
          </nav>

          {/* ✅ User Profile + Logout */}
          <div className="flex items-center space-x-6">
            {user && (
              <span className="text-base font-medium text-gray-800">
                {user.name}{" "}
                <span className="text-gray-500 text-sm">({user.role})</span>
              </span>
            )}
            <button
              onClick={onLogout}
              className="text-red-600 font-semibold hover:underline text-base"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};


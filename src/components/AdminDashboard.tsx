import React from 'react';
import { 
  BarChart3, 
  Users, 
  BookOpen, 
  AlertTriangle, 
  TrendingUp, 
  Calendar,
  Award,
  MapPin
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total Students',
      value: '2,847',
      change: '+12%',
      changeType: 'positive',
      icon: Users,
      color: 'from-blue-500 to-blue-700'
    },
    {
      title: 'Modules Completed',
      value: '8,432',
      change: '+18%',
      changeType: 'positive',
      icon: BookOpen,
      color: 'from-emerald-500 to-emerald-700'
    },
    {
      title: 'Drills Conducted',
      value: '156',
      change: '+8%',
      changeType: 'positive',
      icon: AlertTriangle,
      color: 'from-orange-500 to-orange-700'
    },
    {
      title: 'Preparedness Score',
      value: '87.5%',
      change: '+5%',
      changeType: 'positive',
      icon: Award,
      color: 'from-purple-500 to-purple-700'
    }
  ];

  const recentActivities = [
    {
      type: 'drill',
      message: 'Fire drill completed at Delhi Public School',
      time: '2 hours ago',
      participants: 245
    },
    {
      type: 'completion',
      message: 'Earthquake module completed by 34 students',
      time: '4 hours ago',
      participants: 34
    },
    {
      type: 'alert',
      message: 'Weather alert sent to Mumbai region schools',
      time: '6 hours ago',
      participants: 1250
    },
    {
      type: 'achievement',
      message: 'Ryan International earned "Safety Champion" badge',
      time: '1 day ago',
      participants: 450
    }
  ];

  const schoolPerformance = [
    {
      name: 'Delhi Public School',
      students: 485,
      completionRate: 94,
      preparednessScore: 92
    },
    {
      name: 'Ryan International',
      students: 567,
      completionRate: 89,
      preparednessScore: 87
    },
    {
      name: 'Kendriya Vidyalaya',
      students: 423,
      completionRate: 85,
      preparednessScore: 83
    },
    {
      name: 'DAV Public School',
      students: 392,
      completionRate: 81,
      preparednessScore: 79
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h2>
          <p className="text-gray-600">Monitor progress, track preparedness scores, and manage disaster education across institutions.</p>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-gray-600 text-sm">{stat.title}</p>
              </div>
            );
          })}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg border">
            <div className="flex items-center space-x-3 mb-6">
              <Calendar className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-900">Recent Activities</h3>
            </div>
            
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl">
                  <div className={`w-3 h-3 rounded-full mt-2 ${
                    activity.type === 'drill' ? 'bg-orange-500' :
                    activity.type === 'completion' ? 'bg-green-500' :
                    activity.type === 'alert' ? 'bg-red-500' : 'bg-purple-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium">{activity.message}</p>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                      <span>{activity.time}</span>
                      <span>•</span>
                      <span>{activity.participants} participants</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* School Performance */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border">
            <div className="flex items-center space-x-3 mb-6">
              <BarChart3 className="w-6 h-6 text-emerald-600" />
              <h3 className="text-xl font-semibold text-gray-900">School Performance</h3>
            </div>
            
            <div className="space-y-4">
              {schoolPerformance.map((school, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{school.name}</h4>
                    <span className="text-sm text-gray-600">{school.students} students</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Completion Rate</span>
                        <span>{school.completionRate}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                          style={{ width: `${school.completionRate}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Preparedness Score</span>
                        <span>{school.preparednessScore}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full"
                          style={{ width: `${school.preparednessScore}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="mt-8 bg-gradient-to-br from-blue-50 to-emerald-50 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="bg-white hover:bg-gray-50 border border-gray-200 p-4 rounded-xl text-left transition-colors duration-200">
              <AlertTriangle className="w-6 h-6 text-orange-600 mb-2" />
              <div className="font-medium text-gray-900">Send Alert</div>
              <div className="text-sm text-gray-600">Broadcast emergency notification</div>
            </button>
            
            <button className="bg-white hover:bg-gray-50 border border-gray-200 p-4 rounded-xl text-left transition-colors duration-200">
              <Users className="w-6 h-6 text-blue-600 mb-2" />
              <div className="font-medium text-gray-900">Schedule Drill</div>
              <div className="text-sm text-gray-600">Organize virtual emergency drill</div>
            </button>
            
            <button className="bg-white hover:bg-gray-50 border border-gray-200 p-4 rounded-xl text-left transition-colors duration-200">
              <BarChart3 className="w-6 h-6 text-emerald-600 mb-2" />
              <div className="font-medium text-gray-900">View Reports</div>
              <div className="text-sm text-gray-600">Generate detailed analytics</div>
            </button>
            
            <button className="bg-white hover:bg-gray-50 border border-gray-200 p-4 rounded-xl text-left transition-colors duration-200">
              <MapPin className="w-6 h-6 text-purple-600 mb-2" />
              <div className="font-medium text-gray-900">Manage Regions</div>
              <div className="text-sm text-gray-600">Configure location settings</div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
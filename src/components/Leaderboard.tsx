import React from 'react';
import { Trophy, Star, Medal, TrendingUp, Users, Award } from 'lucide-react';

export const Leaderboard: React.FC = () => {
  const topUsers = [
    {
      rank: 1,
      name: 'Arjun Kumar',
      school: 'Delhi Public School',
      points: 2450,
      badges: 12,
      completedModules: 4,
      avatar: '🏆'
    },
    {
      rank: 2,
      name: 'Priya Sharma',
      school: 'Ryan International',
      points: 2380,
      badges: 11,
      completedModules: 4,
      avatar: '🥈'
    },
    {
      rank: 3,
      name: 'Rahul Verma',
      school: 'Kendriya Vidyalaya',
      points: 2210,
      badges: 10,
      completedModules: 3,
      avatar: '🥉'
    },
    {
      rank: 4,
      name: 'Sneha Patel',
      school: 'DAV Public School',
      points: 2150,
      badges: 9,
      completedModules: 3,
      avatar: '🎓'
    },
    {
      rank: 5,
      name: 'Vikash Singh',
      school: 'St. Mary\'s School',
      points: 2080,
      badges: 8,
      completedModules: 3,
      avatar: '📚'
    }
  ];

  const achievements = [
    {
      title: 'Earthquake Expert',
      description: 'Completed all earthquake modules',
      icon: Medal,
      color: 'from-yellow-400 to-orange-500',
      earned: true
    },
    {
      title: 'Drill Master',
      description: 'Completed 10+ virtual drills',
      icon: Trophy,
      color: 'from-blue-500 to-purple-600',
      earned: true
    },
    {
      title: 'First Responder',
      description: 'Perfect score on emergency response',
      icon: Star,
      color: 'from-emerald-500 to-green-600',
      earned: false
    },
    {
      title: 'Safety Champion',
      description: 'Top 3 in monthly leaderboard',
      icon: Award,
      color: 'from-red-500 to-pink-600',
      earned: true
    }
  ];

  const getRankBadge = (rank: number) => {
    const colors = {
      1: 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white',
      2: 'bg-gradient-to-r from-gray-300 to-gray-500 text-white',
      3: 'bg-gradient-to-r from-orange-400 to-orange-600 text-white'
    };
    return colors[rank as keyof typeof colors] || 'bg-gray-100 text-gray-600';
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Leaderboard & Achievements
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Compete with peers, earn badges, and track your progress through 
            our gamified disaster preparedness learning system.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Trophy className="w-6 h-6 text-yellow-600" />
                <h3 className="text-xl font-semibold text-gray-900">Top Performers</h3>
              </div>
              
              <div className="space-y-4">
                {topUsers.map((user) => (
                  <div
                    key={user.rank}
                    className="bg-white rounded-xl p-4 flex items-center space-x-4 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${getRankBadge(user.rank)}`}>
                      {user.rank}
                    </div>
                    
                    <div className="text-2xl">{user.avatar}</div>
                    
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{user.name}</h4>
                      <p className="text-sm text-gray-600">{user.school}</p>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="font-semibold text-gray-900">{user.points}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-xs text-gray-600">
                        <span>{user.badges} badges</span>
                        <span>{user.completedModules}/4 modules</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-white rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">Your Ranking</h4>
                    <p className="text-sm text-gray-600">Keep learning to climb higher!</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">#12</div>
                    <div className="flex items-center space-x-1 text-sm text-green-600">
                      <TrendingUp className="w-4 h-4" />
                      <span>+3 this week</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Total Points</span>
                    <span className="font-semibold">1,850</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Modules Completed</span>
                    <span className="font-semibold">3/4</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-emerald-500 to-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Badges Earned</span>
                    <span className="font-semibold">7</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-600 h-2 rounded-full" style={{ width: '58%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
              <div className="space-y-3">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <div
                      key={index}
                      className={`flex items-center space-x-3 p-3 rounded-lg ${
                        achievement.earned ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                      } border`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        achievement.earned 
                          ? `bg-gradient-to-r ${achievement.color}`
                          : 'bg-gray-300'
                      }`}>
                        <Icon className={`w-4 h-4 ${achievement.earned ? 'text-white' : 'text-gray-500'}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className={`text-sm font-medium ${achievement.earned ? 'text-gray-900' : 'text-gray-500'}`}>
                          {achievement.title}
                        </h4>
                        <p className={`text-xs ${achievement.earned ? 'text-gray-600' : 'text-gray-400'}`}>
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
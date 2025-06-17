
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Award, Leaf, Zap, Car, Utensils, Target } from "lucide-react";
import { CarbonData } from "@/pages/Index";
import { calculateCarbonFootprint, US_AVERAGE_FOOTPRINT } from "@/utils/carbonCalculations";

interface CarbonBadgesProps {
  carbonData: CarbonData;
}

const CarbonBadges: React.FC<CarbonBadgesProps> = ({ carbonData }) => {
  const results = calculateCarbonFootprint(carbonData);

  const getBadges = () => {
    const badges = [];
    
    // Overall performance badges
    if (results.total < US_AVERAGE_FOOTPRINT * 0.5) {
      badges.push({
        title: "Carbon Hero! 🦸‍♀️",
        description: "Your footprint is less than half the US average!",
        icon: Trophy,
        color: "bg-yellow-100 text-yellow-800 border-yellow-300",
        level: "gold"
      });
    } else if (results.total < US_AVERAGE_FOOTPRINT * 0.75) {
      badges.push({
        title: "Eco Champion! 🌟",
        description: "You're doing great - below 75% of US average!",
        icon: Star,
        color: "bg-blue-100 text-blue-800 border-blue-300",
        level: "silver"
      });
    } else if (results.total < US_AVERAGE_FOOTPRINT) {
      badges.push({
        title: "Carbon Saver! 🌱",
        description: "You're below the US average - keep it up!",
        icon: Leaf,
        color: "bg-green-100 text-green-800 border-green-300",
        level: "bronze"
      });
    }

    // Category-specific badges
    if (results.energy < 3000) {
      badges.push({
        title: "Energy Efficient! ⚡",
        description: "Your energy usage is impressively low!",
        icon: Zap,
        color: "bg-yellow-100 text-yellow-800 border-yellow-300",
        level: "category"
      });
    }

    if (results.transportation < 2000) {
      badges.push({
        title: "Green Commuter! 🚲",
        description: "You're keeping transport emissions low!",
        icon: Car,
        color: "bg-blue-100 text-blue-800 border-blue-300",
        level: "category"
      });
    }

    if (results.categories.beef < 500) {
      badges.push({
        title: "Plant Power! 🥬",
        description: "Low meat consumption - great for the planet!",
        icon: Utensils,
        color: "bg-green-100 text-green-800 border-green-300",
        level: "category"
      });
    }

    // Motivational badges for higher emissions
    if (results.total > US_AVERAGE_FOOTPRINT * 1.5) {
      badges.push({
        title: "Ready to Improve! 💪",
        description: "Every journey starts with a first step!",
        icon: Target,
        color: "bg-orange-100 text-orange-800 border-orange-300",
        level: "motivational"
      });
    }

    return badges;
  };

  const badges = getBadges();

  const getMotivationalMessage = () => {
    if (results.total === 0) {
      return "Complete the calculator to earn your first badge! 🎯";
    }
    
    if (results.total < US_AVERAGE_FOOTPRINT * 0.5) {
      return "Incredible! You're a true environmental champion! Keep inspiring others! 🌟";
    } else if (results.total < US_AVERAGE_FOOTPRINT) {
      return "Great job! You're already making a difference. Small changes lead to big impacts! 🌱";
    } else {
      return "You're on the right track! Every action counts towards a greener future! 💚";
    }
  };

  const getProgressLevel = () => {
    const percentage = (results.total / US_AVERAGE_FOOTPRINT) * 100;
    if (percentage < 50) return { level: "Expert", color: "text-yellow-600", progress: 100 };
    if (percentage < 75) return { level: "Advanced", color: "text-blue-600", progress: 75 };
    if (percentage < 100) return { level: "Intermediate", color: "text-green-600", progress: 50 };
    return { level: "Beginner", color: "text-orange-600", progress: 25 };
  };

  const progressInfo = getProgressLevel();

  if (results.total === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <Trophy className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg mb-2">Complete the calculator to earn badges!</p>
          <p className="text-gray-400">Track your progress and celebrate your achievements</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with motivational message */}
      <Card className="bg-gradient-to-r from-green-100 to-blue-100">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-gray-800">Your Carbon Journey</CardTitle>
          <CardDescription className="text-lg font-medium text-gray-700">
            {getMotivationalMessage()}
          </CardDescription>
          <div className="flex items-center justify-center gap-2 mt-2">
            <Award className={`h-5 w-5 ${progressInfo.color}`} />
            <span className={`font-semibold ${progressInfo.color}`}>
              Level: {progressInfo.level}
            </span>
          </div>
        </CardHeader>
      </Card>

      {/* Achievement Badges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-600" />
            Your Achievements
          </CardTitle>
          <CardDescription>
            {badges.length > 0 
              ? `You've earned ${badges.length} badge${badges.length > 1 ? 's' : ''}!`
              : "Keep working towards your first badge!"
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {badges.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {badges.map((badge, index) => (
                <div
                  key={index}
                  className={`border-2 rounded-lg p-4 ${badge.color} hover:shadow-md transition-shadow`}
                >
                  <div className="flex items-start gap-3">
                    <badge.icon className="h-6 w-6 mt-1" />
                    <div className="space-y-1">
                      <h3 className="font-bold text-lg">{badge.title}</h3>
                      <p className="text-sm opacity-90">{badge.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Star className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 mb-2">No badges earned yet</p>
              <p className="text-gray-400 text-sm">
                Reduce your emissions to unlock achievements!
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Next Goals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            Next Goals
          </CardTitle>
          <CardDescription>Work towards these achievements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {results.total >= US_AVERAGE_FOOTPRINT && (
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Leaf className="h-5 w-5 text-green-600" />
                <span>Get below US average to earn "Carbon Saver" badge</span>
              </div>
            )}
            {results.energy >= 3000 && (
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Zap className="h-5 w-5 text-yellow-600" />
                <span>Reduce energy usage below 3 tonnes CO₂ for "Energy Efficient" badge</span>
              </div>
            )}
            {results.transportation >= 2000 && (
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Car className="h-5 w-5 text-blue-600" />
                <span>Lower transport emissions below 2 tonnes for "Green Commuter" badge</span>
              </div>
            )}
            {results.categories.beef >= 500 && (
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Utensils className="h-5 w-5 text-green-600" />
                <span>Reduce beef consumption for "Plant Power" badge</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CarbonBadges;

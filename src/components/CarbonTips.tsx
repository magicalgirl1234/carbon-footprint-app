
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Leaf, Zap, Car, Utensils } from "lucide-react";
import { CarbonData } from "@/pages/Index";
import { calculateCarbonFootprint, formatCO2 } from "@/utils/carbonCalculations";

interface CarbonTipsProps {
  carbonData: CarbonData;
}

interface Tip {
  category: 'energy' | 'transport' | 'food';
  title: string;
  description: string;
  impact: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  icon: React.ComponentType<any>;
}

const CarbonTips: React.FC<CarbonTipsProps> = ({ carbonData }) => {
  const results = calculateCarbonFootprint(carbonData);

  const generatePersonalizedTips = (): Tip[] => {
    const tips: Tip[] = [];

    // Energy tips
    if (results.categories.electricity > 2000) {
      tips.push({
        category: 'energy',
        title: 'Switch to LED Bulbs',
        description: 'Replace incandescent bulbs with LED bulbs to reduce electricity consumption by up to 75%.',
        impact: `Could save ~${formatCO2(results.categories.electricity * 0.15)}`,
        difficulty: 'Easy',
        icon: Lightbulb,
      });
    }

    if (results.categories.gas > 3000) {
      tips.push({
        category: 'energy',
        title: 'Improve Home Insulation',
        description: 'Better insulation can reduce heating costs by 15-30% and significantly cut gas usage.',
        impact: `Could save ~${formatCO2(results.categories.gas * 0.25)}`,
        difficulty: 'Hard',
        icon: Zap,
      });
    }

    // Transportation tips
    if (results.categories.carMiles > 5000) {
      tips.push({
        category: 'transport',
        title: 'Use Public Transportation',
        description: 'Replace 25% of car trips with public transport to significantly reduce your carbon footprint.',
        impact: `Could save ~${formatCO2(results.categories.carMiles * 0.25)}`,
        difficulty: 'Medium',
        icon: Car,
      });
    }

    if (results.categories.flights > 2000) {
      tips.push({
        category: 'transport',
        title: 'Reduce Air Travel',
        description: 'Consider local vacations or combining multiple trips to reduce flight emissions.',
        impact: `Could save ~${formatCO2(results.categories.flights * 0.5)}`,
        difficulty: 'Medium',
        icon: Car,
      });
    }

    // Food tips
    if (results.categories.beef > 1000) {
      tips.push({
        category: 'food',
        title: 'Reduce Beef Consumption',
        description: 'Replace beef with chicken or plant-based alternatives 2 days per week.',
        impact: `Could save ~${formatCO2(results.categories.beef * 0.3)}`,
        difficulty: 'Medium',
        icon: Utensils,
      });
    }

    if (results.categories.vegetables < 500) {
      tips.push({
        category: 'food',
        title: 'Eat More Plant-Based Meals',
        description: 'Increase vegetable consumption and try one plant-based meal per day.',
        impact: `Could save ~${formatCO2(300)}`,
        difficulty: 'Easy',
        icon: Leaf,
      });
    }

    // General tips if specific ones don't apply
    if (tips.length < 3) {
      tips.push({
        category: 'energy',
        title: 'Unplug Electronics',
        description: 'Unplug devices when not in use to eliminate phantom power consumption.',
        impact: `Could save ~${formatCO2(200)}`,
        difficulty: 'Easy',
        icon: Zap,
      });

      tips.push({
        category: 'transport',
        title: 'Walk or Bike More',
        description: 'For trips under 2 miles, walking or biking can replace car usage.',
        impact: `Could save ~${formatCO2(500)}`,
        difficulty: 'Easy',
        icon: Car,
      });
    }

    return tips.slice(0, 6); // Return top 6 tips
  };

  const tips = generatePersonalizedTips();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'energy': return 'border-l-yellow-500';
      case 'transport': return 'border-l-blue-500';
      case 'food': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };

  if (results.total === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <p className="text-gray-500 text-lg">Enter your data in the Calculator tab to get personalized tips</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-green-100 to-blue-100">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-gray-800">Personalized Reduction Tips</CardTitle>
          <CardDescription className="text-lg">
            Based on your carbon footprint of {formatCO2(results.total)}, here are the most impactful changes you can make
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tips.map((tip, index) => (
          <Card key={index} className={`border-l-4 ${getCategoryColor(tip.category)} hover:shadow-lg transition-shadow`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <tip.icon className="h-5 w-5 text-gray-600" />
                  <CardTitle className="text-lg">{tip.title}</CardTitle>
                </div>
                <Badge className={getDifficultyColor(tip.difficulty)}>
                  {tip.difficulty}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-3">{tip.description}</p>
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-green-800 font-medium">💡 Potential Impact: {tip.impact} CO₂/year</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-green-600" />
            Quick Wins
          </CardTitle>
          <CardDescription>Small changes that add up to big impact</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Daily Habits</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Turn off lights when leaving rooms</li>
                <li>• Take shorter showers</li>
                <li>• Walk or bike for short trips</li>
                <li>• Eat one plant-based meal per day</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Long-term Changes</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Consider renewable energy options</li>
                <li>• Improve home energy efficiency</li>
                <li>• Choose fuel-efficient transportation</li>
                <li>• Support sustainable food sources</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CarbonTips;

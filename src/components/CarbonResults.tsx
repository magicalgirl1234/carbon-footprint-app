
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Zap, Car, Utensils } from "lucide-react";
import { CarbonData } from "@/pages/Index";
import { calculateCarbonFootprint, formatCO2, getFootprintComparison, US_AVERAGE_FOOTPRINT } from "@/utils/carbonCalculations";

interface CarbonResultsProps {
  carbonData: CarbonData;
}

const CarbonResults: React.FC<CarbonResultsProps> = ({ carbonData }) => {
  const results = calculateCarbonFootprint(carbonData);
  
  if (results.total === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <p className="text-gray-500 text-lg">Enter your data in the Calculator tab to see your results</p>
        </CardContent>
      </Card>
    );
  }

  const categoryData = [
    {
      name: 'Energy',
      value: results.energy,
      icon: Zap,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-700',
    },
    {
      name: 'Transportation',
      value: results.transportation,
      icon: Car,
      color: 'bg-blue-500',
      textColor: 'text-blue-700',
    },
    {
      name: 'Food',
      value: results.food,
      icon: Utensils,
      color: 'bg-green-500',
      textColor: 'text-green-700',
    },
  ];

  const maxCategory = Math.max(results.energy, results.transportation, results.food);

  return (
    <div className="space-y-6">
      {/* Total Footprint */}
      <Card className="bg-gradient-to-r from-green-100 to-blue-100">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl text-gray-800">Your Annual Carbon Footprint</CardTitle>
          <div className="text-5xl font-bold text-green-600 my-4">
            {formatCO2(results.total)}
          </div>
          <CardDescription className="text-lg">
            {getFootprintComparison(results.total)}
          </CardDescription>
          <div className="flex items-center justify-center mt-2">
            {results.total < US_AVERAGE_FOOTPRINT ? (
              <Badge className="bg-green-100 text-green-800">
                <TrendingDown className="h-4 w-4 mr-1" />
                Below Average
              </Badge>
            ) : (
              <Badge className="bg-orange-100 text-orange-800">
                <TrendingUp className="h-4 w-4 mr-1" />
                Above Average
              </Badge>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Category Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Emissions Breakdown</CardTitle>
          <CardDescription>Your carbon footprint by category</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {categoryData.map((category) => (
            <div key={category.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <category.icon className={`h-5 w-5 ${category.textColor}`} />
                  <span className="font-medium">{category.name}</span>
                </div>
                <span className="font-bold">{formatCO2(category.value)}</span>
              </div>
              <div className="space-y-1">
                <Progress 
                  value={(category.value / results.total) * 100} 
                  className="h-3"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{((category.value / results.total) * 100).toFixed(1)}% of total</span>
                  <span>{((category.value / maxCategory) * 100).toFixed(0)}% of highest category</span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-700">
              <Zap className="h-5 w-5" />
              Energy Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span>Electricity</span>
              <span className="font-medium">{formatCO2(results.categories.electricity)}</span>
            </div>
            <div className="flex justify-between">
              <span>Natural Gas</span>
              <span className="font-medium">{formatCO2(results.categories.gas)}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <Car className="h-5 w-5" />
              Transport Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span>Car Travel</span>
              <span className="font-medium">{formatCO2(results.categories.carMiles)}</span>
            </div>
            <div className="flex justify-between">
              <span>Public Transport</span>
              <span className="font-medium">{formatCO2(results.categories.publicTransport)}</span>
            </div>
            <div className="flex justify-between">
              <span>Flights</span>
              <span className="font-medium">{formatCO2(results.categories.flights)}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <Utensils className="h-5 w-5" />
              Food Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span>Beef</span>
              <span className="font-medium">{formatCO2(results.categories.beef)}</span>
            </div>
            <div className="flex justify-between">
              <span>Other Meat</span>
              <span className="font-medium">{formatCO2(results.categories.pork + results.categories.chicken + results.categories.fish)}</span>
            </div>
            <div className="flex justify-between">
              <span>Dairy</span>
              <span className="font-medium">{formatCO2(results.categories.dairy)}</span>
            </div>
            <div className="flex justify-between">
              <span>Vegetables</span>
              <span className="font-medium">{formatCO2(results.categories.vegetables)}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CarbonResults;

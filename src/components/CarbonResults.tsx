
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Zap, Car, Utensils, ChartPie } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
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
      chartColor: '#EAB308',
    },
    {
      name: 'Transportation',
      value: results.transportation,
      icon: Car,
      color: 'bg-blue-500',
      textColor: 'text-blue-700',
      chartColor: '#3B82F6',
    },
    {
      name: 'Food',
      value: results.food,
      icon: Utensils,
      color: 'bg-green-500',
      textColor: 'text-green-700',
      chartColor: '#10B981',
    },
  ];

  const pieData = categoryData.map(category => ({
    name: category.name,
    value: Math.round(category.value),
    color: category.chartColor,
  })).filter(item => item.value > 0);

  const detailedPieData = [
    { name: 'Electricity', value: Math.round(results.categories.electricity), color: '#FCD34D' },
    { name: 'Natural Gas', value: Math.round(results.categories.gas), color: '#F59E0B' },
    { name: 'Car Travel', value: Math.round(results.categories.carMiles), color: '#60A5FA' },
    { name: 'Public Transport', value: Math.round(results.categories.publicTransport), color: '#3B82F6' },
    { name: 'Flights', value: Math.round(results.categories.flights), color: '#1E40AF' },
    { name: 'Beef', value: Math.round(results.categories.beef), color: '#DC2626' },
    { name: 'Other Meat', value: Math.round(results.categories.pork + results.categories.chicken + results.categories.fish), color: '#16A34A' },
    { name: 'Dairy', value: Math.round(results.categories.dairy), color: '#84CC16' },
    { name: 'Vegetables', value: Math.round(results.categories.vegetables), color: '#22C55E' },
  ].filter(item => item.value > 0);

  const maxCategory = Math.max(results.energy, results.transportation, results.food);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm text-gray-600">{formatCO2(data.value)} CO₂</p>
          <p className="text-xs text-gray-500">
            {((data.value / results.total) * 100).toFixed(1)}% of total
          </p>
        </div>
      );
    }
    return null;
  };

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

      {/* Pie Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ChartPie className="h-5 w-5" />
              Category Breakdown
            </CardTitle>
            <CardDescription>Your emissions by main category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ChartPie className="h-5 w-5" />
              Detailed Breakdown
            </CardTitle>
            <CardDescription>Your emissions by specific source</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={detailedPieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {detailedPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    formatter={(value) => <span className="text-xs">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

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

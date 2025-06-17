
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CarbonInputForm from "@/components/CarbonInputForm";
import CarbonResults from "@/components/CarbonResults";
import CarbonTips from "@/components/CarbonTips";
import { Leaf, Calculator, TrendingDown } from "lucide-react";

export interface CarbonData {
  electricity: number;
  gas: number;
  carMiles: number;
  publicTransport: number;
  flights: number;
  beef: number;
  pork: number;
  chicken: number;
  fish: number;
  dairy: number;
  vegetables: number;
}

const Index = () => {
  const [carbonData, setCarbonData] = useState<CarbonData>({
    electricity: 0,
    gas: 0,
    carMiles: 0,
    publicTransport: 0,
    flights: 0,
    beef: 0,
    pork: 0,
    chicken: 0,
    fish: 0,
    dairy: 0,
    vegetables: 0,
  });

  const [activeTab, setActiveTab] = useState("calculator");

  const handleCalculate = () => {
    setActiveTab("results");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Leaf className="h-8 w-8 text-green-600 mr-2" />
            <h1 className="text-4xl font-bold text-gray-800">Carbon Calculator</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Measure your household's carbon footprint and discover personalized ways to reduce your environmental impact
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="calculator" className="flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                Calculator
              </TabsTrigger>
              <TabsTrigger value="results" className="flex items-center gap-2">
                <TrendingDown className="h-4 w-4" />
                Results
              </TabsTrigger>
              <TabsTrigger value="tips" className="flex items-center gap-2">
                <Leaf className="h-4 w-4" />
                Tips
              </TabsTrigger>
            </TabsList>

            <TabsContent value="calculator" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-green-700">Calculate Your Carbon Footprint</CardTitle>
                  <CardDescription>
                    Enter your household's monthly usage data to calculate your annual CO₂ emissions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CarbonInputForm 
                    carbonData={carbonData} 
                    setCarbonData={setCarbonData}
                    onCalculate={handleCalculate}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="results" className="space-y-6">
              <CarbonResults carbonData={carbonData} />
            </TabsContent>

            <TabsContent value="tips" className="space-y-6">
              <CarbonTips carbonData={carbonData} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Copyright Footer */}
        <div className="text-center mt-16 pt-8 border-t border-gray-200">
          <div className="space-y-2">
            <p className="text-gray-600">Made by <span className="font-semibold text-green-700">Bhargavi Battula</span></p>
            <p className="text-gray-500 text-sm">bhargavibattula1234@gmail.com</p>
            <p className="text-gray-500 text-sm">© 2024 Carbon Calculator. All rights reserved.</p>
            <p className="text-gray-500 text-xs">Help reduce your carbon footprint • Make a difference for our planet</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

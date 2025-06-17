
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Zap, Car, Utensils } from "lucide-react";
import { CarbonData } from "@/pages/Index";

interface CarbonInputFormProps {
  carbonData: CarbonData;
  setCarbonData: React.Dispatch<React.SetStateAction<CarbonData>>;
}

const CarbonInputForm: React.FC<CarbonInputFormProps> = ({ carbonData, setCarbonData }) => {
  const handleInputChange = (field: keyof CarbonData, value: string) => {
    const numericValue = parseFloat(value) || 0;
    setCarbonData(prev => ({
      ...prev,
      [field]: numericValue
    }));
  };

  return (
    <div className="space-y-6">
      {/* Energy Section */}
      <Card className="border-l-4 border-l-yellow-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-700">
            <Zap className="h-5 w-5" />
            Energy Usage
          </CardTitle>
          <CardDescription>Monthly household energy consumption</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="electricity">Electricity (kWh/month)</Label>
            <Input
              id="electricity"
              type="number"
              value={carbonData.electricity || ''}
              onChange={(e) => handleInputChange('electricity', e.target.value)}
              placeholder="e.g., 500"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="gas">Natural Gas (therms/month)</Label>
            <Input
              id="gas"
              type="number"
              value={carbonData.gas || ''}
              onChange={(e) => handleInputChange('gas', e.target.value)}
              placeholder="e.g., 50"
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Transportation Section */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-700">
            <Car className="h-5 w-5" />
            Transportation
          </CardTitle>
          <CardDescription>Monthly travel patterns</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="carMiles">Car Miles/month</Label>
            <Input
              id="carMiles"
              type="number"
              value={carbonData.carMiles || ''}
              onChange={(e) => handleInputChange('carMiles', e.target.value)}
              placeholder="e.g., 1000"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="publicTransport">Public Transport (miles/month)</Label>
            <Input
              id="publicTransport"
              type="number"
              value={carbonData.publicTransport || ''}
              onChange={(e) => handleInputChange('publicTransport', e.target.value)}
              placeholder="e.g., 200"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="flights">Flight Miles/year</Label>
            <Input
              id="flights"
              type="number"
              value={carbonData.flights || ''}
              onChange={(e) => handleInputChange('flights', e.target.value)}
              placeholder="e.g., 2000"
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Diet Section */}
      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-700">
            <Utensils className="h-5 w-5" />
            Diet & Food
          </CardTitle>
          <CardDescription>Weekly food consumption (servings per week)</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="beef">Beef (servings/week)</Label>
            <Input
              id="beef"
              type="number"
              value={carbonData.beef || ''}
              onChange={(e) => handleInputChange('beef', e.target.value)}
              placeholder="e.g., 3"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="pork">Pork (servings/week)</Label>
            <Input
              id="pork"
              type="number"
              value={carbonData.pork || ''}
              onChange={(e) => handleInputChange('pork', e.target.value)}
              placeholder="e.g., 2"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="chicken">Chicken (servings/week)</Label>
            <Input
              id="chicken"
              type="number"
              value={carbonData.chicken || ''}
              onChange={(e) => handleInputChange('chicken', e.target.value)}
              placeholder="e.g., 4"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="fish">Fish (servings/week)</Label>
            <Input
              id="fish"
              type="number"
              value={carbonData.fish || ''}
              onChange={(e) => handleInputChange('fish', e.target.value)}
              placeholder="e.g., 2"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="dairy">Dairy (servings/week)</Label>
            <Input
              id="dairy"
              type="number"
              value={carbonData.dairy || ''}
              onChange={(e) => handleInputChange('dairy', e.target.value)}
              placeholder="e.g., 14"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="vegetables">Vegetables (servings/week)</Label>
            <Input
              id="vegetables"
              type="number"
              value={carbonData.vegetables || ''}
              onChange={(e) => handleInputChange('vegetables', e.target.value)}
              placeholder="e.g., 20"
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CarbonInputForm;

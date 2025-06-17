
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TreePine, Bike, Zap, ExternalLink, Globe } from "lucide-react";
import { CarbonData } from "@/pages/Index";
import { calculateCarbonFootprint, formatCO2 } from "@/utils/carbonCalculations";

interface CarbonOffsetsProps {
  carbonData: CarbonData;
}

const CarbonOffsets: React.FC<CarbonOffsetsProps> = ({ carbonData }) => {
  const results = calculateCarbonFootprint(carbonData);

  const offsetOptions = [
    {
      title: "Plant Trees",
      description: "One tree absorbs approximately 22 kg of CO₂ per year. Plant trees to offset your emissions.",
      icon: TreePine,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      treesNeeded: Math.ceil(results.total / 22),
      links: [
        { name: "One Tree Planted", url: "https://onetreeplanted.org/" },
        { name: "Tree-Nation", url: "https://tree-nation.com/" }
      ]
    },
    {
      title: "Switch to Cycling",
      description: "Replace short car trips with cycling. Each mile cycled instead of driven saves 0.89 kg CO₂.",
      icon: Bike,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      potential: "Could save 2-5 tonnes CO₂/year",
      links: [
        { name: "Bike Share Programs", url: "https://www.citibikenyc.com/" },
        { name: "Local Bike Shops", url: "#" }
      ]
    },
    {
      title: "Solar Energy",
      description: "Install solar panels to reduce electricity emissions. Average home solar system offsets 3-4 tonnes CO₂/year.",
      icon: Zap,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      potential: "Could offset 3-4 tonnes CO₂/year",
      links: [
        { name: "Solar Power World", url: "https://www.solarpowerworldonline.com/" },
        { name: "EnergySage", url: "https://www.energysage.com/" }
      ]
    }
  ];

  const trustedPlatforms = [
    {
      name: "Gold Standard",
      description: "High-quality carbon offset projects worldwide",
      url: "https://www.goldstandard.org/",
      type: "Certification"
    },
    {
      name: "Verra",
      description: "Verified Carbon Standard projects",
      url: "https://verra.org/",
      type: "Registry"
    },
    {
      name: "Cool Effect",
      description: "Easy-to-use carbon offset marketplace",
      url: "https://www.cooleffect.org/",
      type: "Marketplace"
    },
    {
      name: "Terrapass",
      description: "Carbon footprint reduction solutions",
      url: "https://www.terrapass.com/",
      type: "Provider"
    }
  ];

  if (results.total === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <p className="text-gray-500 text-lg">Calculate your footprint first to see offset suggestions</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-green-100 to-blue-100">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-gray-800">Carbon Offset Options</CardTitle>
          <CardDescription className="text-lg">
            Take action to offset your {formatCO2(results.total)} annual carbon footprint
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Offset Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {offsetOptions.map((option, index) => (
          <Card key={index} className={`${option.borderColor} border-2 hover:shadow-lg transition-shadow`}>
            <CardHeader className={option.bgColor}>
              <div className="flex items-center gap-2">
                <option.icon className={`h-6 w-6 ${option.color}`} />
                <CardTitle className="text-lg">{option.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">{option.description}</p>
              
              {option.treesNeeded && (
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-green-800 font-medium">
                    🌳 You would need to plant ~{option.treesNeeded} trees to offset your annual emissions
                  </p>
                </div>
              )}
              
              {option.potential && (
                <div className={`${option.bgColor} p-3 rounded-lg`}>
                  <p className={`${option.color} font-medium`}>
                    💡 {option.potential}
                  </p>
                </div>
              )}
              
              <div className="space-y-2">
                {option.links.map((link, linkIndex) => (
                  <Button
                    key={linkIndex}
                    variant="outline"
                    size="sm"
                    className="w-full justify-between"
                    onClick={() => window.open(link.url, '_blank')}
                  >
                    {link.name}
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Trusted Platforms */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-blue-600" />
            Trusted Carbon Offset Platforms
          </CardTitle>
          <CardDescription>
            Verified platforms for purchasing high-quality carbon offsets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trustedPlatforms.map((platform, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{platform.name}</h4>
                    <Badge variant="outline" className="text-xs">
                      {platform.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{platform.description}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(platform.url, '_blank')}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800 text-sm">
              💡 <strong>Tip:</strong> Look for offsets that are verified, additional, permanent, and from recent projects. 
              A typical offset costs $10-30 per tonne of CO₂.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CarbonOffsets;

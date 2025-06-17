
import { CarbonData } from "@/pages/Index";

// Emission factors (kg CO2 per unit)
export const EMISSION_FACTORS = {
  // Energy (kg CO2 per kWh/therm)
  electricity: 0.92, // kg CO2 per kWh (US average)
  gas: 11.7, // kg CO2 per therm
  
  // Transportation (kg CO2 per mile)
  carMiles: 0.89, // kg CO2 per mile (average car)
  publicTransport: 0.33, // kg CO2 per mile (bus/train average)
  flights: 0.53, // kg CO2 per mile (domestic flights)
  
  // Food (kg CO2 per serving)
  beef: 3.3, // kg CO2 per serving
  pork: 1.2, // kg CO2 per serving
  chicken: 0.7, // kg CO2 per serving
  fish: 1.1, // kg CO2 per serving
  dairy: 0.9, // kg CO2 per serving
  vegetables: 0.4, // kg CO2 per serving
};

export interface CarbonBreakdown {
  energy: number;
  transportation: number;
  food: number;
  total: number;
  categories: {
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
  };
}

export const calculateCarbonFootprint = (data: CarbonData): CarbonBreakdown => {
  // Calculate annual emissions for each category
  const categories = {
    electricity: data.electricity * 12 * EMISSION_FACTORS.electricity,
    gas: data.gas * 12 * EMISSION_FACTORS.gas,
    carMiles: data.carMiles * 12 * EMISSION_FACTORS.carMiles,
    publicTransport: data.publicTransport * 12 * EMISSION_FACTORS.publicTransport,
    flights: data.flights * EMISSION_FACTORS.flights, // Already annual
    beef: data.beef * 52 * EMISSION_FACTORS.beef, // Weekly to annual
    pork: data.pork * 52 * EMISSION_FACTORS.pork,
    chicken: data.chicken * 52 * EMISSION_FACTORS.chicken,
    fish: data.fish * 52 * EMISSION_FACTORS.fish,
    dairy: data.dairy * 52 * EMISSION_FACTORS.dairy,
    vegetables: data.vegetables * 52 * EMISSION_FACTORS.vegetables,
  };

  // Group by main categories
  const energy = categories.electricity + categories.gas;
  const transportation = categories.carMiles + categories.publicTransport + categories.flights;
  const food = categories.beef + categories.pork + categories.chicken + 
               categories.fish + categories.dairy + categories.vegetables;
  
  const total = energy + transportation + food;

  return {
    energy,
    transportation,
    food,
    total,
    categories,
  };
};

export const formatCO2 = (kg: number): string => {
  if (kg >= 1000) {
    return `${(kg / 1000).toFixed(1)} tonnes`;
  }
  return `${kg.toFixed(0)} kg`;
};

// Average US household carbon footprint for comparison
export const US_AVERAGE_FOOTPRINT = 16000; // kg CO2 per year

export const getFootprintComparison = (total: number): string => {
  const percentage = ((total / US_AVERAGE_FOOTPRINT) * 100).toFixed(0);
  if (total < US_AVERAGE_FOOTPRINT) {
    return `${percentage}% of US average (Great job!)`;
  } else {
    return `${percentage}% of US average`;
  }
};

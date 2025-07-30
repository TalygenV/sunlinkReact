export interface Battery {
  id: string;
  name: string;
  manufacturer: string;
  capacity: string;
  warranty: string;
  efficiency: string;
  price: number;
  batteryNameplatePower: number;
  batteryNameplateCapacity: number;
  batteryMinSoc: number;
  batteryMaxSoc: number;
  batteryInitialSoc: number;
  batteryDcCoupled: boolean;
  batteryAcToDcEfficiency: number;
  batteryDcToAcEfficiency: number;
  batteryInputEfficiency: number;
  batteryDegradationCost: number;
  solarDcToAcEfficiency: number;
  allowBatteryToGrid: boolean;
  allowGridToBattery: boolean;
  allowSolarToGrid: boolean;
  allowSolarToBattery: boolean;
  features: string[];
}

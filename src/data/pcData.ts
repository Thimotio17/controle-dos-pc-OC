export interface PC {
  id: number;
  motherboard: string;
  cpu: string;
  ram: number;
  lastUpdated: string;
  updatedBy: string;
  floor: 1 | 2;
  department: string;
  position: { top: number; left: number };
}

const cpuScores: Record<string, number> = {


  "Ryzen 3 5300": 7,
  "Intel i7 4700": 4,
  "Intel i5 12400": 5,
  "Intel i5 6400": 5,
  "Intel i5 10400": 5,
  "Intel i5 7500": 5,
  "Intel i5 6600": 5,
  "Intel i5 6500": 5,
  "Intel i5 8500": 5,
  "Intel i5 7600": 5,
  "Intel i3 12100": 4,
  "Intel i3 10105": 4,
  "Ryzen 5 5600G": 5,
  "Ryzen 3 4100": 3,
  "Intel Gold 6405": 2,
  "Intel Gold 5420": 2,
  "Intel Gold 5400": 2,
};

export function getPerformanceScore(pc: PC): number {
  const cpuScore = cpuScores[pc.cpu] ?? 5;
  const ramScore = Math.min(pc.ram / 4, 10);
  return Math.round(((cpuScore + ramScore) / 2) * 10) / 10;
}

export function getPerformanceLevel(score: number): "high" | "mid" | "low" {
  if (score >= 7) return "high";
  if (score >= 4) return "mid";
  return "low";
}

export const initialPCs: PC[] = [
  // ===================== FLOOR 1 (1920×1920) — pixel-measured positions =====================
  // Right-right column (image: 01–07)
  { id: 1, motherboard: "", cpu: "", ram: 32, lastUpdated: "", updatedBy: "", floor: 1, department: "Finance", position: { top: 37.2, left: 85.8 } },
  { id: 2, motherboard: "", cpu: "", ram: 16, lastUpdated: "", updatedBy: "", floor: 1, department: "Finance", position: { top: 46.2, left: 85.8 } },
  { id: 3, motherboard: "", cpu: "", ram: 8, lastUpdated: "", updatedBy: "", floor: 1, department: "Finance", position: { top: 52.0, left: 85.9 } },
  { id: 4, motherboard: "", cpu: "", ram: 8, lastUpdated: "", updatedBy: "", floor: 1, department: "Finance", position: { top: 61.4, left: 85.8 } },
  { id: 5, motherboard: "", cpu: "", ram: 4, lastUpdated: "", updatedBy: "", floor: 1, department: "Finance", position: { top: 67.2, left: 85.8 } },
  { id: 6, motherboard: "", cpu: "", ram: 16, lastUpdated: "", updatedBy: "", floor: 1, department: "Finance", position: { top: 76.2, left: 85.9 } },
  { id: 7, motherboard: "", cpu: "", ram: 32, lastUpdated: "", updatedBy: "", floor: 1, department: "Finance", position: { top: 82.3, left: 86.1 } },

  // Right-left column (image: 14–08)
  { id: 14, motherboard: "", cpu: "", ram: 32, lastUpdated: "", updatedBy: "", floor: 1, department: "Video Room", position: { top: 37.9, left: 82.1 } },
  { id: 13, motherboard: "", cpu: "", ram: 32, lastUpdated: "", updatedBy: "", floor: 1, department: "Video Room", position: { top: 46.8, left: 82.1 } },
  { id: 12, motherboard: "", cpu: "", ram: 64, lastUpdated: "", updatedBy: "", floor: 1, department: "Video Room", position: { top: 52.8, left: 82.1 } },
  { id: 11, motherboard: "", cpu: "", ram: 64, lastUpdated: "", updatedBy: "", floor: 1, department: "Video Room", position: { top: 61.7, left: 82.2 } },
  { id: 10, motherboard: "", cpu: "", ram: 8, lastUpdated: "", updatedBy: "", floor: 1, department: "Support", position: { top: 67.9, left: 82.1 } },
  { id: 9, motherboard: "", cpu: "", ram: 16, lastUpdated: "", updatedBy: "", floor: 1, department: "Support", position: { top: 76.8, left: 82.2 } },
  { id: 8, motherboard: "", cpu: "", ram: 16, lastUpdated: "", updatedBy: "", floor: 1, department: "Support", position: { top: 82.7, left: 82.2 } },

  // Center-right column (image: 15b, 16–21)
  { id: 32, motherboard: "", cpu: "", ram: 32, lastUpdated: "", updatedBy: "", floor: 1, department: "General", position: { top: 37.1, left: 71.7 } },
  { id: 16, motherboard: "", cpu: "", ram: 16, lastUpdated: "", updatedBy: "", floor: 1, department: "General", position: { top: 46.2, left: 71.8 } },
  { id: 17, motherboard: "", cpu: "", ram: 8, lastUpdated: "", updatedBy: "", floor: 1, department: "General", position: { top: 52.1, left: 71.8 } },
  { id: 18, motherboard: "", cpu: "", ram: 16, lastUpdated: "", updatedBy: "", floor: 1, department: "General", position: { top: 61.0, left: 71.8 } },
  { id: 19, motherboard: "", cpu: "", ram: 8, lastUpdated: "", updatedBy: "", floor: 1, department: "General", position: { top: 66.9, left: 71.9 } },
  { id: 20, motherboard: "", cpu: "", ram: 8, lastUpdated: "", updatedBy: "", floor: 1, department: "General", position: { top: 76.0, left: 71.8 } },
  { id: 21, motherboard: "", cpu: "", ram: 64, lastUpdated: "", updatedBy: "", floor: 1, department: "General", position: { top: 83.2, left: 72.5 } },

  // Center-left column (image: 15, 27–22)
  { id: 15, motherboard: "", cpu: "", ram: 32, lastUpdated: "", updatedBy: "", floor: 1, department: "Video Room", position: { top: 37.8, left: 67.9 } },
  { id: 27, motherboard: "", cpu: "", ram: 16, lastUpdated: "", updatedBy: "", floor: 1, department: "General", position: { top: 46.8, left: 68.0 } },
  { id: 26, motherboard: "", cpu: "", ram: 16, lastUpdated: "", updatedBy: "", floor: 1, department: "General", position: { top: 52.8, left: 67.9 } },
  { id: 25, motherboard: "", cpu: "", ram: 32, lastUpdated: "", updatedBy: "", floor: 1, department: "General", position: { top: 61.6, left: 68.1 } },
  { id: 24, motherboard: "", cpu: "", ram: 32, lastUpdated: "", updatedBy: "", floor: 1, department: "General", position: { top: 67.7, left: 68.0 } },
  { id: 23, motherboard: "", cpu: "", ram: 32, lastUpdated: "", updatedBy: "", floor: 1, department: "General", position: { top: 76.8, left: 68.0 } },
  { id: 22, motherboard: "", cpu: "", ram: 64, lastUpdated: "", updatedBy: "", floor: 1, department: "General", position: { top: 82.6, left: 68.0 } },

  // Standalone column (image: 1, 2, 3, 31, 33, 34)
  { id: 28, motherboard: "", cpu: "", ram: 16, lastUpdated: "", updatedBy: "", floor: 1, department: "General", position: { top: 39.2, left: 57.2 } },
  { id: 29, motherboard: "", cpu: "", ram: 16, lastUpdated: "", updatedBy: "", floor: 1, department: "General", position: { top: 44.3, left: 57.2 } },
  { id: 30, motherboard: "", cpu: "", ram: 16, lastUpdated: "", updatedBy: "", floor: 1, department: "General", position: { top: 54.3, left: 57.3 } },
  { id: 31, motherboard: "", cpu: "", ram: 32, lastUpdated: "", updatedBy: "", floor: 1, department: "General", position: { top: 59.2, left: 57.2 } },
  { id: 33, motherboard: "", cpu: "", ram: 16, lastUpdated: "", updatedBy: "", floor: 1, department: "General", position: { top: 69.0, left: 57.1 } },
  { id: 34, motherboard: "", cpu: "", ram: 16, lastUpdated: "", updatedBy: "", floor: 1, department: "General", position: { top: 74.3, left: 57.2 } },

  // ===================== FLOOR 2 (1920×1072) — pixel-measured positions =====================
  // Row 1 (y≈49.2%): PCs 35–42
  { id: 35, motherboard: "", cpu: "", ram: 8, lastUpdated: "", updatedBy: "", floor: 2, department: "Development", position: { top: 49.2, left: 44.6 } },
  { id: 36, motherboard: "", cpu: "", ram: 8, lastUpdated: "", updatedBy: "", floor: 2, department: "Development", position: { top: 49.2, left: 48.1 } },
  { id: 37, motherboard: "", cpu: "", ram: 8, lastUpdated: "", updatedBy: "", floor: 2, department: "HR", position: { top: 49.2, left: 51.9 } },
  { id: 38, motherboard: "", cpu: "", ram: 8, lastUpdated: "", updatedBy: "", floor: 2, department: "HR", position: { top: 49.2, left: 55.5 } },
  { id: 39, motherboard: "", cpu: "", ram: 4, lastUpdated: "", updatedBy: "", floor: 2, department: "HR", position: { top: 49.2, left: 59.2 } },
  { id: 40, motherboard: "", cpu: "", ram: 8, lastUpdated: "", updatedBy: "", floor: 2, department: "HR", position: { top: 49.2, left: 62.7 } },
  { id: 41, motherboard: "", cpu: "", ram: 32, lastUpdated: "", updatedBy: "", floor: 2, department: "Development", position: { top: 49.2, left: 66.5 } },
  { id: 42, motherboard: "", cpu: "", ram: 16, lastUpdated: "", updatedBy: "", floor: 2, department: "Development", position: { top: 49.2, left: 69.6 } },

  // Row 2 (y≈53.2%): PCs 50→43
  { id: 50, motherboard: "", cpu: "", ram: 16, lastUpdated: "", updatedBy: "", floor: 2, department: "Development", position: { top: 53.2, left: 44.6 } },
  { id: 49, motherboard: "", cpu: "", ram: 16, lastUpdated: "", updatedBy: "", floor: 2, department: "Development", position: { top: 53.2, left: 48.1 } },
  { id: 48, motherboard: "", cpu: "", ram: 32, lastUpdated: "", updatedBy: "", floor: 2, department: "Development", position: { top: 53.2, left: 51.9 } },
  { id: 47, motherboard: "", cpu: "", ram: 16, lastUpdated: "", updatedBy: "", floor: 2, department: "Development", position: { top: 53.2, left: 55.5 } },
  { id: 46, motherboard: "", cpu: "", ram: 8, lastUpdated: "", updatedBy: "", floor: 2, department: "Development", position: { top: 53.2, left: 59.2 } },
  { id: 45, motherboard: "", cpu: "", ram: 4, lastUpdated: "", updatedBy: "", floor: 2, department: "Development", position: { top: 53.2, left: 62.7 } },
  { id: 44, motherboard: "", cpu: "", ram: 8, lastUpdated: "", updatedBy: "", floor: 2, department: "Development", position: { top: 53.2, left: 66.5 } },
  { id: 43, motherboard: "", cpu: "", ram: 8, lastUpdated: "", updatedBy: "", floor: 2, department: "Development", position: { top: 53.2, left: 69.6 } },

  // Row 3 (y≈62.4%): PCs 51–58
  { id: 51, motherboard: "", cpu: "", ram: 8, lastUpdated: "", updatedBy: "", floor: 2, department: "Development", position: { top: 62.4, left: 44.6 } },
  { id: 52, motherboard: "", cpu: "", ram: 64, lastUpdated: "", updatedBy: "", floor: 2, department: "Development", position: { top: 62.4, left: 48.1 } },
  { id: 53, motherboard: "", cpu: "", ram: 64, lastUpdated: "", updatedBy: "", floor: 2, department: "Design", position: { top: 62.4, left: 51.9 } },
  { id: 54, motherboard: "", cpu: "", ram: 32, lastUpdated: "", updatedBy: "", floor: 2, department: "Design", position: { top: 62.4, left: 55.5 } },
  { id: 55, motherboard: "", cpu: "", ram: 32, lastUpdated: "", updatedBy: "", floor: 2, department: "Design", position: { top: 62.4, left: 59.1 } },
  { id: 56, motherboard: "", cpu: "", ram: 32, lastUpdated: "", updatedBy: "", floor: 2, department: "Design", position: { top: 62.4, left: 62.7 } },
  { id: 57, motherboard: "", cpu: "", ram: 16, lastUpdated: "", updatedBy: "", floor: 2, department: "Design", position: { top: 62.4, left: 66.5 } },
  { id: 58, motherboard: "", cpu: "", ram: 8, lastUpdated: "", updatedBy: "", floor: 2, department: "Design", position: { top: 62.4, left: 69.6 } },

  // Row 4 (y≈66.4%): PCs 64,65,66,63,62,61,60,59
  { id: 64, motherboard: "", cpu: "", ram: 32, lastUpdated: "", updatedBy: "", floor: 2, department: "Development", position: { top: 66.4, left: 44.6 } },
  { id: 65, motherboard: "", cpu: "", ram: 32, lastUpdated: "", updatedBy: "", floor: 2, department: "Development", position: { top: 66.4, left: 48.1 } },
  { id: 66, motherboard: "", cpu: "", ram: 32, lastUpdated: "", updatedBy: "", floor: 2, department: "Development", position: { top: 66.4, left: 51.9 } },
  { id: 63, motherboard: "", cpu: "", ram: 64, lastUpdated: "", updatedBy: "", floor: 2, department: "Development", position: { top: 66.4, left: 55.4 } },
  { id: 62, motherboard: "", cpu: "", ram: 64, lastUpdated: "", updatedBy: "", floor: 2, department: "Development", position: { top: 66.4, left: 59.2 } },
  { id: 61, motherboard: "", cpu: "", ram: 8, lastUpdated: "", updatedBy: "", floor: 2, department: "Design", position: { top: 66.4, left: 62.7 } },
  { id: 60, motherboard: "", cpu: "", ram: 8, lastUpdated: "", updatedBy: "", floor: 2, department: "Design", position: { top: 66.4, left: 66.5 } },
  { id: 59, motherboard: "", cpu: "", ram: 16, lastUpdated: "", updatedBy: "", floor: 2, department: "Design", position: { top: 66.4, left: 69.9 } },

  // Row 5 (y≈74.4%): PCs 67–76 (10 PCs, 5 pairs)
  { id: 67, motherboard: "", cpu: "", ram: 32, lastUpdated: "", updatedBy: "", floor: 2, department: "Development", position: { top: 74.4, left: 37.3 } },
  { id: 68, motherboard: "", cpu: "", ram: 16, lastUpdated: "", updatedBy: "", floor: 2, department: "Development", position: { top: 74.4, left: 40.7 } },
  { id: 69, motherboard: "", cpu: "", ram: 16, lastUpdated: "", updatedBy: "", floor: 2, department: "Development", position: { top: 74.4, left: 44.6 } },
  { id: 70, motherboard: "", cpu: "", ram: 16, lastUpdated: "", updatedBy: "", floor: 2, department: "Development", position: { top: 74.4, left: 48.0 } },
  { id: 71, motherboard: "", cpu: "", ram: 16, lastUpdated: "", updatedBy: "", floor: 2, department: "Development", position: { top: 74.4, left: 51.8 } },
  { id: 72, motherboard: "", cpu: "", ram: 16, lastUpdated: "", updatedBy: "", floor: 2, department: "Development", position: { top: 74.4, left: 55.3 } },
  { id: 73, motherboard: "", cpu: "", ram: 32, lastUpdated: "", updatedBy: "", floor: 2, department: "Development", position: { top: 74.4, left: 59.2 } },
  { id: 74, motherboard: "", cpu: "", ram: 32, lastUpdated: "", updatedBy: "", floor: 2, department: "Development", position: { top: 74.4, left: 62.7 } },
  { id: 75, motherboard: "", cpu: "", ram: 16, lastUpdated: "", updatedBy: "", floor: 2, department: "Development", position: { top: 74.4, left: 66.5 } },
  { id: 76, motherboard: "", cpu: "", ram: 16, lastUpdated: "", updatedBy: "", floor: 2, department: "Development", position: { top: 74.4, left: 69.9 } },

  // Row 6 (y≈78.3%): PCs 86→77
  { id: 86, motherboard: "", cpu: "", ram: 4, lastUpdated: "", updatedBy: "", floor: 2, department: "Development", position: { top: 78.3, left: 37.3 } },
  { id: 85, motherboard: "", cpu: "", ram: 8, lastUpdated: "", updatedBy: "", floor: 2, department: "Development", position: { top: 78.3, left: 40.7 } },
  { id: 84, motherboard: "", cpu: "", ram: 8, lastUpdated: "", updatedBy: "", floor: 2, department: "Development", position: { top: 78.3, left: 44.6 } },
  { id: 83, motherboard: "", cpu: "", ram: 8, lastUpdated: "", updatedBy: "", floor: 2, department: "Development", position: { top: 78.3, left: 48.0 } },
  { id: 82, motherboard: "", cpu: "", ram: 8, lastUpdated: "", updatedBy: "", floor: 2, department: "Development", position: { top: 78.3, left: 51.8 } },
  { id: 81, motherboard: "", cpu: "", ram: 8, lastUpdated: "", updatedBy: "", floor: 2, department: "Development", position: { top: 78.3, left: 55.3 } },
  { id: 80, motherboard: "", cpu: "", ram: 32, lastUpdated: "", updatedBy: "", floor: 2, department: "Development", position: { top: 78.3, left: 59.2 } },
  { id: 79, motherboard: "", cpu: "", ram: 16, lastUpdated: "", updatedBy: "", floor: 2, department: "Development", position: { top: 78.3, left: 62.7 } },
  { id: 78, motherboard: "", cpu: "", ram: 8, lastUpdated: "", updatedBy: "", floor: 2, department: "Development", position: { top: 78.3, left: 66.5 } },
  { id: 77, motherboard: "", cpu: "", ram: 8, lastUpdated: "", updatedBy: "", floor: 2, department: "Development", position: { top: 78.3, left: 69.9 } },

  // Row 7 (y≈87.9%): PCs 87–96
  { id: 87, motherboard: "", cpu: "", ram: 8, lastUpdated: "", updatedBy: "", floor: 2, department: "Development", position: { top: 87.9, left: 37.9 } },
  { id: 88, motherboard: "", cpu: "", ram: 32, lastUpdated: "", updatedBy: "", floor: 2, department: "Development", position: { top: 87.9, left: 40.3 } },
  { id: 89, motherboard: "", cpu: "", ram: 16, lastUpdated: "", updatedBy: "", floor: 2, department: "Development", position: { top: 87.9, left: 45.2 } },
  { id: 90, motherboard: "", cpu: "", ram: 8, lastUpdated: "", updatedBy: "", floor: 2, department: "Development", position: { top: 87.9, left: 48.0 } },
  { id: 91, motherboard: "", cpu: "", ram: 8, lastUpdated: "", updatedBy: "", floor: 2, department: "Development", position: { top: 87.9, left: 52.4 } },
  { id: 92, motherboard: "", cpu: "", ram: 4, lastUpdated: "", updatedBy: "", floor: 2, department: "Development", position: { top: 87.9, left: 54.8 } },
  { id: 93, motherboard: "", cpu: "", ram: 16, lastUpdated: "", updatedBy: "", floor: 2, department: "Development", position: { top: 87.9, left: 59.2 } },
  { id: 94, motherboard: "", cpu: "", ram: 32, lastUpdated: "", updatedBy: "", floor: 2, department: "Development", position: { top: 87.9, left: 62.1 } },
  { id: 95, motherboard: "", cpu: "", ram: 16, lastUpdated: "", updatedBy: "", floor: 2, department: "Development", position: { top: 87.9, left: 67.0 } },
  { id: 96, motherboard: "", cpu: "", ram: 16, lastUpdated: "", updatedBy: "", floor: 2, department: "Development", position: { top: 87.9, left: 69.5 } },
];

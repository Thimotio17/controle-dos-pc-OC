export interface PC {
  id: number;
  status: 'top' | 'meia boca' | 'porqueira';
  floor: number;
  description?: string;
  top: number;   // Solto conforme a interface que você quer
  left: number;  // Solto conforme a interface que você quer
  // Campos adicionais usados no seu código
  motherboard?: string;
  cpu: string;
  ram: number;
  lastUpdated?: string;
  updatedBy?: string;
  department?: string;
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

// Corrigindo a lista: removendo o objeto "position" e deixando top/left soltos
export const initialPCs: PC[] = [
  // FLOOR 1
  { id: 1, motherboard: "", cpu: "", ram: 32, floor: 1, status: 'top', top: 37.2, left: 85.8 },
  { id: 2, motherboard: "", cpu: "", ram: 16, floor: 1, status: 'top', top: 46.2, left: 85.8 },
  { id: 3, motherboard: "", cpu: "", ram: 8, floor: 1, status: 'meia boca', top: 52.0, left: 85.9 },
  { id: 4, motherboard: "", cpu: "", ram: 8, floor: 1, status: 'meia boca', top: 61.4, left: 85.8 },
  { id: 5, motherboard: "", cpu: "", ram: 4, floor: 1, status: 'porqueira', top: 67.2, left: 85.8 },
  { id: 6, motherboard: "", cpu: "", ram: 16, floor: 1, status: 'top', top: 76.2, left: 85.9 },
  { id: 7, motherboard: "", cpu: "", ram: 32, floor: 1, status: 'top', top: 82.3, left: 86.1 },

  // FLOOR 2
  { id: 35, motherboard: "", cpu: "", ram: 8, floor: 2, status: 'meia boca', top: 49.2, left: 44.6 },
  { id: 36, motherboard: "", cpu: "", ram: 8, floor: 2, status: 'meia boca', top: 49.2, left: 48.1 },
  { id: 37, motherboard: "", cpu: "", ram: 8, floor: 2, status: 'meia boca', top: 49.2, left: 51.9 },
  // ... continue seguindo este padrão: remova o "position: { ... }" e coloque apenas "top: X, left: Y"
];
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
  "Intel Core i9-13900K": 10,
  "Intel Core i7-13700K": 8,
  "Intel Core i5-13600K": 7,
  "AMD Ryzen 9 7950X": 10,
  "AMD Ryzen 7 7700X": 8,
  "AMD Ryzen 5 7600X": 7,
  "Intel Core i7-12700K": 7,
  "Intel Core i5-12400": 5,
  "Intel Core i3-12100": 4,
  "AMD Ryzen 5 5600G": 5,
  "AMD Ryzen 3 4100": 3,
  "Intel Celeron G6900": 2,
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
  { id: 1, motherboard: "ASUS ROG Strix B660", cpu: "Intel Core i7-13700K", ram: 32, lastUpdated: "2026-04-01", updatedBy: "Carlos Silva", floor: 1, department: "Finance", position: { top: 37.2, left: 85.8 } },
  { id: 2, motherboard: "MSI MAG B660M", cpu: "Intel Core i5-13600K", ram: 16, lastUpdated: "2026-03-28", updatedBy: "Ana Costa", floor: 1, department: "Finance", position: { top: 46.2, left: 85.8 } },
  { id: 3, motherboard: "Gigabyte B660M DS3H", cpu: "Intel Core i5-12400", ram: 8, lastUpdated: "2026-03-15", updatedBy: "João Santos", floor: 1, department: "Finance", position: { top: 52.0, left: 85.9 } },
  { id: 4, motherboard: "ASRock B660 Pro", cpu: "Intel Core i3-12100", ram: 8, lastUpdated: "2026-02-20", updatedBy: "Maria Lima", floor: 1, department: "Finance", position: { top: 61.4, left: 85.8 } },
  { id: 5, motherboard: "ASUS Prime H610M", cpu: "Intel Celeron G6900", ram: 4, lastUpdated: "2026-01-10", updatedBy: "Pedro Oliveira", floor: 1, department: "Finance", position: { top: 67.2, left: 85.8 } },
  { id: 6, motherboard: "MSI PRO B660M-A", cpu: "Intel Core i5-13600K", ram: 16, lastUpdated: "2026-04-05", updatedBy: "Lucas Souza", floor: 1, department: "Finance", position: { top: 76.2, left: 85.9 } },
  { id: 7, motherboard: "Gigabyte B550M AORUS", cpu: "AMD Ryzen 7 7700X", ram: 32, lastUpdated: "2026-04-08", updatedBy: "Rafael Mendes", floor: 1, department: "Finance", position: { top: 82.3, left: 86.1 } },

  // Right-left column (image: 14–08)
  { id: 14, motherboard: "ASUS ProArt X670E", cpu: "AMD Ryzen 7 7700X", ram: 32, lastUpdated: "2026-03-30", updatedBy: "Isabela Cardoso", floor: 1, department: "Video Room", position: { top: 37.9, left: 82.1 } },
  { id: 13, motherboard: "Gigabyte X670E AORUS", cpu: "AMD Ryzen 9 7950X", ram: 32, lastUpdated: "2026-04-07", updatedBy: "Diego Martins", floor: 1, department: "Video Room", position: { top: 46.8, left: 82.1 } },
  { id: 12, motherboard: "MSI MEG X670E ACE", cpu: "Intel Core i9-13900K", ram: 64, lastUpdated: "2026-04-09", updatedBy: "Camila Ferreira", floor: 1, department: "Video Room", position: { top: 52.8, left: 82.1 } },
  { id: 11, motherboard: "ASUS ROG Crosshair X670E", cpu: "AMD Ryzen 9 7950X", ram: 64, lastUpdated: "2026-04-10", updatedBy: "Thiago Nunes", floor: 1, department: "Video Room", position: { top: 61.7, left: 82.2 } },
  { id: 10, motherboard: "ASRock B550 Phantom", cpu: "AMD Ryzen 3 4100", ram: 8, lastUpdated: "2026-02-15", updatedBy: "Juliana Rocha", floor: 1, department: "Support", position: { top: 67.9, left: 82.1 } },
  { id: 9, motherboard: "MSI B550M PRO-VDH", cpu: "AMD Ryzen 5 5600G", ram: 16, lastUpdated: "2026-03-10", updatedBy: "Bruno Alves", floor: 1, department: "Support", position: { top: 76.8, left: 82.2 } },
  { id: 8, motherboard: "ASUS TUF B550-PLUS", cpu: "AMD Ryzen 5 7600X", ram: 16, lastUpdated: "2026-03-22", updatedBy: "Fernanda Dias", floor: 1, department: "Support", position: { top: 82.7, left: 82.2 } },

  // Center-right column (image: 15b, 16–21)
  { id: 32, motherboard: "MSI Creator B660", cpu: "AMD Ryzen 7 7700X", ram: 32, lastUpdated: "2026-04-08", updatedBy: "Daniela Fonseca", floor: 1, department: "General", position: { top: 37.1, left: 71.7 } },
  { id: 16, motherboard: "ASUS Prime B660M-A", cpu: "Intel Core i5-12400", ram: 16, lastUpdated: "2026-03-18", updatedBy: "Patricia Lopes", floor: 1, department: "General", position: { top: 46.2, left: 71.8 } },
  { id: 17, motherboard: "MSI PRO H610M", cpu: "Intel Core i3-12100", ram: 8, lastUpdated: "2026-03-12", updatedBy: "André Campos", floor: 1, department: "General", position: { top: 52.1, left: 71.8 } },
  { id: 18, motherboard: "Gigabyte H610M S2H", cpu: "Intel Core i5-13600K", ram: 16, lastUpdated: "2026-04-02", updatedBy: "Vanessa Costa", floor: 1, department: "General", position: { top: 61.0, left: 71.8 } },
  { id: 19, motherboard: "ASRock H610M-HDV", cpu: "AMD Ryzen 5 5600G", ram: 8, lastUpdated: "2026-02-28", updatedBy: "Roberto Nascimento", floor: 1, department: "General", position: { top: 66.9, left: 71.9 } },
  { id: 20, motherboard: "ASUS PRIME A520M-K", cpu: "AMD Ryzen 3 4100", ram: 8, lastUpdated: "2026-01-20", updatedBy: "Tatiana Barros", floor: 1, department: "General", position: { top: 76.0, left: 71.8 } },
  { id: 21, motherboard: "ASUS ROG Strix Z790-E", cpu: "Intel Core i9-13900K", ram: 64, lastUpdated: "2026-04-10", updatedBy: "Felipe Moreira", floor: 1, department: "General", position: { top: 83.2, left: 72.5 } },

  // Center-left column (image: 15, 27–22)
  { id: 15, motherboard: "MSI MAG X670E TOMAHAWK", cpu: "Intel Core i7-13700K", ram: 32, lastUpdated: "2026-03-25", updatedBy: "Gustavo Ribeiro", floor: 1, department: "Video Room", position: { top: 37.8, left: 67.9 } },
  { id: 27, motherboard: "Gigabyte Z790 AORUS Elite", cpu: "Intel Core i5-13600K", ram: 16, lastUpdated: "2026-04-04", updatedBy: "Marcos Pereira", floor: 1, department: "General", position: { top: 46.8, left: 68.0 } },
  { id: 26, motherboard: "MSI MEG Z790 Godlike", cpu: "AMD Ryzen 7 7700X", ram: 16, lastUpdated: "2026-04-05", updatedBy: "Larissa Cunha", floor: 1, department: "General", position: { top: 52.8, left: 67.9 } },
  { id: 25, motherboard: "ASUS ROG Maximus Z790", cpu: "Intel Core i7-13700K", ram: 32, lastUpdated: "2026-04-06", updatedBy: "Eduardo Freitas", floor: 1, department: "General", position: { top: 61.6, left: 68.1 } },
  { id: 24, motherboard: "ASRock Z790 Taichi", cpu: "AMD Ryzen 9 7950X", ram: 32, lastUpdated: "2026-04-07", updatedBy: "Carolina Pinto", floor: 1, department: "General", position: { top: 67.7, left: 68.0 } },
  { id: 23, motherboard: "Gigabyte Z790 AORUS Master", cpu: "Intel Core i7-13700K", ram: 32, lastUpdated: "2026-04-08", updatedBy: "Ricardo Teixeira", floor: 1, department: "General", position: { top: 76.8, left: 68.0 } },
  { id: 22, motherboard: "MSI MPG Z790 Carbon", cpu: "Intel Core i9-13900K", ram: 64, lastUpdated: "2026-04-09", updatedBy: "Amanda Vieira", floor: 1, department: "General", position: { top: 82.6, left: 68.0 } },

  // Standalone column (image: 1, 2, 3, 31, 33, 34)
  { id: 28, motherboard: "ASUS TUF Z790-PLUS", cpu: "AMD Ryzen 5 7600X", ram: 16, lastUpdated: "2026-04-03", updatedBy: "Beatriz Azevedo", floor: 1, department: "General", position: { top: 39.2, left: 57.2 } },
  { id: 29, motherboard: "MSI PRO Z790-A", cpu: "Intel Core i5-12400", ram: 16, lastUpdated: "2026-03-28", updatedBy: "Hugo Monteiro", floor: 1, department: "General", position: { top: 44.3, left: 57.2 } },
  { id: 30, motherboard: "ASRock Z790 PG Lightning", cpu: "Intel Core i5-13600K", ram: 16, lastUpdated: "2026-03-25", updatedBy: "Natália Ramos", floor: 1, department: "General", position: { top: 54.3, left: 57.3 } },
  { id: 31, motherboard: "ASUS ProArt B660", cpu: "Intel Core i7-13700K", ram: 32, lastUpdated: "2026-04-09", updatedBy: "Gabriel Correia", floor: 1, department: "General", position: { top: 59.2, left: 57.2 } },
  { id: 33, motherboard: "Gigabyte B660 AORUS Pro", cpu: "Intel Core i5-13600K", ram: 16, lastUpdated: "2026-04-05", updatedBy: "Vinícius Araújo", floor: 1, department: "General", position: { top: 69.0, left: 57.1 } },
  { id: 34, motherboard: "ASUS Prime B660-PLUS", cpu: "AMD Ryzen 5 7600X", ram: 16, lastUpdated: "2026-04-02", updatedBy: "Aline Borges", floor: 1, department: "General", position: { top: 74.3, left: 57.2 } },

  // ===================== FLOOR 2 (1920×1072) — pixel-measured positions =====================
  // Row 1 (y≈49.2%): PCs 35–42
  { id: 35, motherboard: "MSI MAG B660M Mortar", cpu: "Intel Core i5-12400", ram: 8, lastUpdated: "2026-03-20", updatedBy: "Renato Duarte", floor: 2, department: "Development", position: { top: 49.2, left: 44.6 } },
  { id: 36, motherboard: "ASRock B660M Steel", cpu: "AMD Ryzen 5 5600G", ram: 8, lastUpdated: "2026-03-15", updatedBy: "Priscila Nogueira", floor: 2, department: "Development", position: { top: 49.2, left: 48.1 } },
  { id: 37, motherboard: "ASUS Prime H610M-E", cpu: "Intel Core i3-12100", ram: 8, lastUpdated: "2026-03-10", updatedBy: "Otávio Marques", floor: 2, department: "HR", position: { top: 49.2, left: 51.9 } },
  { id: 38, motherboard: "MSI PRO H610M-B", cpu: "Intel Core i5-12400", ram: 8, lastUpdated: "2026-03-05", updatedBy: "Simone Gomes", floor: 2, department: "HR", position: { top: 49.2, left: 55.5 } },
  { id: 39, motherboard: "Gigabyte H610M H", cpu: "Intel Celeron G6900", ram: 4, lastUpdated: "2026-02-25", updatedBy: "Leandro Castro", floor: 2, department: "HR", position: { top: 49.2, left: 59.2 } },
  { id: 40, motherboard: "ASRock H610M-HVS", cpu: "AMD Ryzen 3 4100", ram: 8, lastUpdated: "2026-02-10", updatedBy: "Elisa Santos", floor: 2, department: "HR", position: { top: 49.2, left: 62.7 } },
  { id: 41, motherboard: "ASUS ROG Strix B660", cpu: "Intel Core i7-13700K", ram: 32, lastUpdated: "2026-04-01", updatedBy: "Carlos Silva", floor: 2, department: "Development", position: { top: 49.2, left: 66.5 } },
  { id: 42, motherboard: "MSI MAG B660M", cpu: "Intel Core i5-13600K", ram: 16, lastUpdated: "2026-03-28", updatedBy: "Ana Costa", floor: 2, department: "Development", position: { top: 49.2, left: 69.6 } },

  // Row 2 (y≈53.2%): PCs 50→43
  { id: 50, motherboard: "MSI B550M PRO-VDH", cpu: "AMD Ryzen 5 5600G", ram: 16, lastUpdated: "2026-03-10", updatedBy: "Bruno Alves", floor: 2, department: "Development", position: { top: 53.2, left: 44.6 } },
  { id: 49, motherboard: "ASUS TUF B550-PLUS", cpu: "AMD Ryzen 5 7600X", ram: 16, lastUpdated: "2026-03-22", updatedBy: "Fernanda Dias", floor: 2, department: "Development", position: { top: 53.2, left: 48.1 } },
  { id: 48, motherboard: "Gigabyte B550M AORUS", cpu: "AMD Ryzen 7 7700X", ram: 32, lastUpdated: "2026-04-08", updatedBy: "Rafael Mendes", floor: 2, department: "Development", position: { top: 53.2, left: 51.9 } },
  { id: 47, motherboard: "MSI PRO B660M-A", cpu: "Intel Core i5-13600K", ram: 16, lastUpdated: "2026-04-05", updatedBy: "Lucas Souza", floor: 2, department: "Development", position: { top: 53.2, left: 55.5 } },
  { id: 46, motherboard: "ASUS Prime H610M", cpu: "Intel Core i5-12400", ram: 8, lastUpdated: "2026-03-01", updatedBy: "Marcelo Dias", floor: 2, department: "Development", position: { top: 53.2, left: 59.2 } },
  { id: 45, motherboard: "ASUS Prime H610M", cpu: "Intel Celeron G6900", ram: 4, lastUpdated: "2026-01-10", updatedBy: "Pedro Oliveira", floor: 2, department: "Development", position: { top: 53.2, left: 62.7 } },
  { id: 44, motherboard: "ASRock B660 Pro", cpu: "Intel Core i3-12100", ram: 8, lastUpdated: "2026-02-20", updatedBy: "Maria Lima", floor: 2, department: "Development", position: { top: 53.2, left: 66.5 } },
  { id: 43, motherboard: "Gigabyte B660M DS3H", cpu: "Intel Core i5-12400", ram: 8, lastUpdated: "2026-03-15", updatedBy: "João Santos", floor: 2, department: "Development", position: { top: 53.2, left: 69.6 } },

  // Row 3 (y≈62.4%): PCs 51–58
  { id: 51, motherboard: "ASRock B550 Phantom", cpu: "AMD Ryzen 3 4100", ram: 8, lastUpdated: "2026-02-15", updatedBy: "Juliana Rocha", floor: 2, department: "Development", position: { top: 62.4, left: 44.6 } },
  { id: 52, motherboard: "ASUS ROG Crosshair X670E", cpu: "AMD Ryzen 9 7950X", ram: 64, lastUpdated: "2026-04-10", updatedBy: "Thiago Nunes", floor: 2, department: "Development", position: { top: 62.4, left: 48.1 } },
  { id: 53, motherboard: "MSI MEG X670E ACE", cpu: "Intel Core i9-13900K", ram: 64, lastUpdated: "2026-04-09", updatedBy: "Camila Ferreira", floor: 2, department: "Design", position: { top: 62.4, left: 51.9 } },
  { id: 54, motherboard: "Gigabyte X670E AORUS", cpu: "AMD Ryzen 9 7950X", ram: 32, lastUpdated: "2026-04-07", updatedBy: "Diego Martins", floor: 2, department: "Design", position: { top: 62.4, left: 55.5 } },
  { id: 55, motherboard: "ASUS ProArt X670E", cpu: "AMD Ryzen 7 7700X", ram: 32, lastUpdated: "2026-03-30", updatedBy: "Isabela Cardoso", floor: 2, department: "Design", position: { top: 62.4, left: 59.1 } },
  { id: 56, motherboard: "MSI MAG X670E TOMAHAWK", cpu: "Intel Core i7-13700K", ram: 32, lastUpdated: "2026-03-25", updatedBy: "Gustavo Ribeiro", floor: 2, department: "Design", position: { top: 62.4, left: 62.7 } },
  { id: 57, motherboard: "ASUS Prime B660M-A", cpu: "Intel Core i5-12400", ram: 16, lastUpdated: "2026-03-18", updatedBy: "Patricia Lopes", floor: 2, department: "Design", position: { top: 62.4, left: 66.5 } },
  { id: 58, motherboard: "MSI PRO H610M", cpu: "Intel Core i3-12100", ram: 8, lastUpdated: "2026-03-12", updatedBy: "André Campos", floor: 2, department: "Design", position: { top: 62.4, left: 69.6 } },

  // Row 4 (y≈66.4%): PCs 64,65,66,63,62,61,60,59
  { id: 64, motherboard: "Gigabyte Z790 AORUS Master", cpu: "Intel Core i7-13700K", ram: 32, lastUpdated: "2026-04-08", updatedBy: "Ricardo Teixeira", floor: 2, department: "Development", position: { top: 66.4, left: 44.6 } },
  { id: 65, motherboard: "ASRock Z790 Taichi", cpu: "AMD Ryzen 9 7950X", ram: 32, lastUpdated: "2026-04-07", updatedBy: "Carolina Pinto", floor: 2, department: "Development", position: { top: 66.4, left: 48.1 } },
  { id: 66, motherboard: "ASUS ROG Strix Z790-E", cpu: "Intel Core i7-13700K", ram: 32, lastUpdated: "2026-04-06", updatedBy: "Felipe Moreira", floor: 2, department: "Development", position: { top: 66.4, left: 51.9 } },
  { id: 63, motherboard: "MSI MPG Z790 Carbon", cpu: "Intel Core i9-13900K", ram: 64, lastUpdated: "2026-04-09", updatedBy: "Amanda Vieira", floor: 2, department: "Development", position: { top: 66.4, left: 55.4 } },
  { id: 62, motherboard: "ASUS ROG Strix Z790-E", cpu: "Intel Core i9-13900K", ram: 64, lastUpdated: "2026-04-10", updatedBy: "Felipe Moreira", floor: 2, department: "Development", position: { top: 66.4, left: 59.2 } },
  { id: 61, motherboard: "ASUS PRIME A520M-K", cpu: "AMD Ryzen 3 4100", ram: 8, lastUpdated: "2026-01-20", updatedBy: "Tatiana Barros", floor: 2, department: "Design", position: { top: 66.4, left: 62.7 } },
  { id: 60, motherboard: "ASRock H610M-HDV", cpu: "AMD Ryzen 5 5600G", ram: 8, lastUpdated: "2026-02-28", updatedBy: "Roberto Nascimento", floor: 2, department: "Design", position: { top: 66.4, left: 66.5 } },
  { id: 59, motherboard: "Gigabyte H610M S2H", cpu: "Intel Core i5-13600K", ram: 16, lastUpdated: "2026-04-02", updatedBy: "Vanessa Costa", floor: 2, department: "Design", position: { top: 66.4, left: 69.9 } },

  // Row 5 (y≈74.4%): PCs 67–76 (10 PCs, 5 pairs)
  { id: 67, motherboard: "ASUS ROG Maximus Z790", cpu: "Intel Core i7-13700K", ram: 32, lastUpdated: "2026-04-06", updatedBy: "Eduardo Freitas", floor: 2, department: "Development", position: { top: 74.4, left: 37.3 } },
  { id: 68, motherboard: "MSI MEG Z790 Godlike", cpu: "AMD Ryzen 7 7700X", ram: 16, lastUpdated: "2026-04-05", updatedBy: "Larissa Cunha", floor: 2, department: "Development", position: { top: 74.4, left: 40.7 } },
  { id: 69, motherboard: "Gigabyte Z790 AORUS Elite", cpu: "Intel Core i5-13600K", ram: 16, lastUpdated: "2026-04-04", updatedBy: "Marcos Pereira", floor: 2, department: "Development", position: { top: 74.4, left: 44.6 } },
  { id: 70, motherboard: "ASUS TUF Z790-PLUS", cpu: "AMD Ryzen 5 7600X", ram: 16, lastUpdated: "2026-04-03", updatedBy: "Beatriz Azevedo", floor: 2, department: "Development", position: { top: 74.4, left: 48.0 } },
  { id: 71, motherboard: "MSI PRO Z790-A", cpu: "Intel Core i5-12400", ram: 16, lastUpdated: "2026-03-28", updatedBy: "Hugo Monteiro", floor: 2, department: "Development", position: { top: 74.4, left: 51.8 } },
  { id: 72, motherboard: "ASRock Z790 PG Lightning", cpu: "Intel Core i5-13600K", ram: 16, lastUpdated: "2026-03-25", updatedBy: "Natália Ramos", floor: 2, department: "Development", position: { top: 74.4, left: 55.3 } },
  { id: 73, motherboard: "ASUS ProArt B660", cpu: "Intel Core i7-13700K", ram: 32, lastUpdated: "2026-04-09", updatedBy: "Gabriel Correia", floor: 2, department: "Development", position: { top: 74.4, left: 59.2 } },
  { id: 74, motherboard: "MSI Creator B660", cpu: "AMD Ryzen 7 7700X", ram: 32, lastUpdated: "2026-04-08", updatedBy: "Daniela Fonseca", floor: 2, department: "Development", position: { top: 74.4, left: 62.7 } },
  { id: 75, motherboard: "Gigabyte B660 AORUS Pro", cpu: "Intel Core i5-13600K", ram: 16, lastUpdated: "2026-04-05", updatedBy: "Vinícius Araújo", floor: 2, department: "Development", position: { top: 74.4, left: 66.5 } },
  { id: 76, motherboard: "ASUS Prime B660-PLUS", cpu: "AMD Ryzen 5 7600X", ram: 16, lastUpdated: "2026-04-02", updatedBy: "Aline Borges", floor: 2, department: "Development", position: { top: 74.4, left: 69.9 } },

  // Row 6 (y≈78.3%): PCs 86→77
  { id: 86, motherboard: "Gigabyte H610M H", cpu: "Intel Celeron G6900", ram: 4, lastUpdated: "2026-02-25", updatedBy: "Leandro Castro", floor: 2, department: "Development", position: { top: 78.3, left: 37.3 } },
  { id: 85, motherboard: "MSI PRO H610M-B", cpu: "Intel Core i5-12400", ram: 8, lastUpdated: "2026-03-05", updatedBy: "Simone Gomes", floor: 2, department: "Development", position: { top: 78.3, left: 40.7 } },
  { id: 84, motherboard: "ASRock B660M Steel", cpu: "AMD Ryzen 5 5600G", ram: 8, lastUpdated: "2026-03-15", updatedBy: "Priscila Nogueira", floor: 2, department: "Development", position: { top: 78.3, left: 44.6 } },
  { id: 83, motherboard: "ASUS Prime H610M-E", cpu: "Intel Core i3-12100", ram: 8, lastUpdated: "2026-03-10", updatedBy: "Otávio Marques", floor: 2, department: "Development", position: { top: 78.3, left: 48.0 } },
  { id: 82, motherboard: "MSI MAG B660M Mortar", cpu: "Intel Core i5-12400", ram: 8, lastUpdated: "2026-03-20", updatedBy: "Renato Duarte", floor: 2, department: "Development", position: { top: 78.3, left: 51.8 } },
  { id: 81, motherboard: "ASRock H610M-HVS", cpu: "AMD Ryzen 3 4100", ram: 8, lastUpdated: "2026-02-10", updatedBy: "Elisa Santos", floor: 2, department: "Development", position: { top: 78.3, left: 55.3 } },
  { id: 80, motherboard: "ASUS ROG Strix B660", cpu: "Intel Core i7-13700K", ram: 32, lastUpdated: "2026-04-01", updatedBy: "Carlos Silva", floor: 2, department: "Development", position: { top: 78.3, left: 59.2 } },
  { id: 79, motherboard: "MSI MAG B660M", cpu: "Intel Core i5-13600K", ram: 16, lastUpdated: "2026-03-28", updatedBy: "Ana Costa", floor: 2, department: "Development", position: { top: 78.3, left: 62.7 } },
  { id: 78, motherboard: "Gigabyte B660M DS3H", cpu: "Intel Core i5-12400", ram: 8, lastUpdated: "2026-03-15", updatedBy: "João Santos", floor: 2, department: "Development", position: { top: 78.3, left: 66.5 } },
  { id: 77, motherboard: "ASRock B660 Pro", cpu: "Intel Core i3-12100", ram: 8, lastUpdated: "2026-02-20", updatedBy: "Maria Lima", floor: 2, department: "Development", position: { top: 78.3, left: 69.9 } },

  // Row 7 (y≈87.9%): PCs 87–96
  { id: 87, motherboard: "ASRock H610M-HVS", cpu: "AMD Ryzen 3 4100", ram: 8, lastUpdated: "2026-02-10", updatedBy: "Elisa Santos", floor: 2, department: "Development", position: { top: 87.9, left: 37.9 } },
  { id: 88, motherboard: "ASUS ROG Strix B660", cpu: "Intel Core i7-13700K", ram: 32, lastUpdated: "2026-04-01", updatedBy: "Carlos Silva", floor: 2, department: "Development", position: { top: 87.9, left: 40.3 } },
  { id: 89, motherboard: "MSI MAG B660M", cpu: "Intel Core i5-13600K", ram: 16, lastUpdated: "2026-03-28", updatedBy: "Ana Costa", floor: 2, department: "Development", position: { top: 87.9, left: 45.2 } },
  { id: 90, motherboard: "Gigabyte B660M DS3H", cpu: "Intel Core i5-12400", ram: 8, lastUpdated: "2026-03-15", updatedBy: "João Santos", floor: 2, department: "Development", position: { top: 87.9, left: 48.0 } },
  { id: 91, motherboard: "ASRock B660 Pro", cpu: "Intel Core i3-12100", ram: 8, lastUpdated: "2026-02-20", updatedBy: "Maria Lima", floor: 2, department: "Development", position: { top: 87.9, left: 52.4 } },
  { id: 92, motherboard: "ASUS Prime H610M", cpu: "Intel Celeron G6900", ram: 4, lastUpdated: "2026-01-10", updatedBy: "Pedro Oliveira", floor: 2, department: "Development", position: { top: 87.9, left: 54.8 } },
  { id: 93, motherboard: "MSI PRO B660M-A", cpu: "Intel Core i5-13600K", ram: 16, lastUpdated: "2026-04-05", updatedBy: "Lucas Souza", floor: 2, department: "Development", position: { top: 87.9, left: 59.2 } },
  { id: 94, motherboard: "Gigabyte B550M AORUS", cpu: "AMD Ryzen 7 7700X", ram: 32, lastUpdated: "2026-04-08", updatedBy: "Rafael Mendes", floor: 2, department: "Development", position: { top: 87.9, left: 62.1 } },
  { id: 95, motherboard: "ASUS TUF B550-PLUS", cpu: "AMD Ryzen 5 7600X", ram: 16, lastUpdated: "2026-03-22", updatedBy: "Fernanda Dias", floor: 2, department: "Development", position: { top: 87.9, left: 67.0 } },
  { id: 96, motherboard: "MSI B550M PRO-VDH", cpu: "AMD Ryzen 5 5600G", ram: 16, lastUpdated: "2026-03-10", updatedBy: "Bruno Alves", floor: 2, department: "Development", position: { top: 87.9, left: 69.5 } },
];

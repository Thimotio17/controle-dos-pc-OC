import { PC, getPerformanceScore, getPerformanceLevel } from "@/data/pcData";

interface PCCircleProps {
  pc: PC;
  onClick: (pc: PC) => void;
  isSelected: boolean;
}

const PCCircle = ({ pc, onClick, isSelected }: PCCircleProps) => {
  const score = getPerformanceScore(pc);
  const level = getPerformanceLevel(score);

  return (
    <div className="group relative">
      <button
        onClick={() => onClick(pc)}
        className={`pc-circle performance-${level} w-8 h-8 text-[10px] font-bold ${
          isSelected ? "ring-2 ring-primary scale-110" : ""
        }`}
        style={{ color: "hsl(var(--background))" }}
      >
        {String(pc.id).padStart(2, "0")}
      </button>
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 rounded-lg glass-panel text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
        <div className="font-semibold text-foreground">PC {String(pc.id).padStart(2, "0")}</div>
        <div className="text-muted-foreground">{pc.cpu}</div>
        <div className="text-muted-foreground">{pc.ram}GB RAM</div>
        <div className={`font-medium ${level === "high" ? "text-perf-high" : level === "mid" ? "text-perf-mid" : "text-perf-low"}`}>
          Score: {score}/10
        </div>
      </div>
    </div>
  );
};

export default PCCircle;

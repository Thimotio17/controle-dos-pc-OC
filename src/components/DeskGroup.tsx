import { PC } from "@/data/pcData";
import PCCircle from "./PCCircle";

interface DeskGroupProps {
  label: string;
  pcs: PC[];
  selectedPcId: number | null;
  onPcClick: (pc: PC) => void;
  columns?: number;
}

const DeskGroup = ({ label, pcs, selectedPcId, onPcClick, columns = 2 }: DeskGroupProps) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium mb-1">{label}</span>
      <div className="bg-secondary/30 border border-border/30 rounded-xl p-3">
        <div className={`grid gap-2`} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {pcs.map((pc) => (
            <PCCircle key={pc.id} pc={pc} onClick={onPcClick} isSelected={selectedPcId === pc.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeskGroup;

import { PC } from "@/data/pcData";
import { cn } from "@/lib/utils";

interface PCCircleProps {
  pc: PC;
  onClick: (pc: PC) => void;
  isSelected?: boolean;
}

const PCCircle = ({ pc, onClick, isSelected }: PCCircleProps) => {
  // Define a cor baseada no status
  const statusColors = {
    TOP: "bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)]",
    "Meia boca": "bg-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.6)]",
    Porqueira: "bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.6)]",
  };

  const statusColor = statusColors[pc.status as keyof typeof statusColors] || "bg-gray-500";

  return (
    <button
      onClick={() => onClick(pc)}
      className={cn(
        "relative flex items-center justify-center transition-all duration-300 hover:scale-125 group",
        // Tamanho do círculo
        "w-8 h-8 rounded-full", 
        statusColor,
        isSelected && "ring-4 ring-white scale-110 z-50"
      )}
    >
      {/* O número do computador dentro do círculo */}
      <span className="text-[10px] font-bold text-white drop-shadow-md">
        {String(pc.id).replace("PC ", "")}
      </span>

      {/* Tooltip (Legenda que aparece ao passar o mouse) */}
      <div className="absolute bottom-full mb-2 hidden group-hover:block z-[100]">
        <div className="bg-slate-900 text-white text-[10px] py-1 px-2 rounded shadow-xl border border-white/10 whitespace-nowrap">
          {pc.id} - {pc.status}
        </div>
      </div>
    </button>
  );
};

export default PCCircle;
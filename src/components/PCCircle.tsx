import { PC } from "@/data/pcData";
import { cn } from "@/lib/utils";

interface PCCircleProps {
  pc: PC;
  onClick: (pc: PC) => void;
  isSelected?: boolean;
}

const PCCircle = ({ pc, onClick, isSelected }: PCCircleProps) => {
  
  // Função simplificada: RAM manda em tudo
  const getHardwareStatus = (ram: number) => {
    const ramValue = Number(ram) || 0;

    if (ramValue >= 16) {
      return {
        bg: "bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)]",
        text: "text-green-400",
        label: "Ótimo (Top)"
      };
    } else if (ramValue >= 8) {
      return {
        bg: "bg-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.6)]",
        text: "text-yellow-400",
        label: "Médio (Atenção)"
      };
    } else {
      // 4GB ou menos
      return {
        bg: "bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.6)]",
        text: "text-red-400",
        label: "Ruim (Crítico)"
      };
    }
  };

  // Chamamos a função apenas com a RAM agora
  const hardwareStatus = getHardwareStatus(pc.ram);

  return (
    <button
      onClick={() => onClick(pc)}
      className={cn(
        "relative flex items-center justify-center transition-all duration-300 hover:scale-125 group",
        "w-7 h-7 rounded-full border border-white/20",
        hardwareStatus.bg, 
        isSelected && "ring-4 ring-white scale-110 z-50"
      )}
    >
      <span className="text-[10px] font-bold text-white drop-shadow-md">
        {String(pc.id).replace("PC ", "")}
      </span>

      <div className="absolute bottom-full mb-2 hidden group-hover:block z-[100] pointer-events-none">
        <div className="bg-slate-900 text-white text-[10px] py-1.5 px-2.5 rounded shadow-xl border border-white/10 whitespace-nowrap flex flex-col items-center gap-0.5">
          <span className="font-bold border-b border-white/10 pb-0.5 mb-0.5 w-full text-center">
            {pc.id}
          </span>
          <span className="text-gray-300">
            {pc.ram}GB RAM | {pc.cpu || "Sem CPU"}
          </span>
          <span className={`font-bold uppercase tracking-wider text-[9px] mt-0.5 ${hardwareStatus.text}`}>
            {hardwareStatus.label}
          </span>
        </div>
      </div>
    </button>
  );
};

export default PCCircle;
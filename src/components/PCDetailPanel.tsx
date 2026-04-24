import { useState, useEffect } from "react";
import { PC } from "@/data/pcData";
import { X, Save, Cpu, MemoryStick, CircuitBoard, User, Calendar, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface PCDetailPanelProps {
  pc: PC | null;
  onClose: () => void;
  onSave: (pc: PC) => void;
}

const PCDetailPanel = ({ pc, onClose, onSave }: PCDetailPanelProps) => {
  const [editing, setEditing] = useState<PC | null>(null);

  useEffect(() => {
    if (pc) setEditing({ ...pc });
  }, [pc]);

  if (!pc || !editing) return null;

  // NOVA LÓGICA: Sincronizada com o PCCircle (Apenas RAM)
  const getStatusByRam = (ram: number) => {
    const r = Number(ram) || 0;
    if (r >= 16) return { level: "high", score: 10, label: "Ótimo (Top)" };
    if (r >= 8)  return { level: "mid",  score: 5,  label: "Médio (Atenção)" };
    return { level: "low",  score: 2.5, label: "Ruim (Crítico)" };
  };

  const status = getStatusByRam(editing.ram);

  const circleColorClass = 
    status.level === "high" ? "bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]" : 
    status.level === "mid" ? "bg-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.5)]" : 
    "bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]";

  const scoreColor = status.level === "high" ? "text-green-500" : status.level === "mid" ? "text-yellow-500" : "text-red-500";
  const scoreBg = status.level === "high" ? "bg-green-500/20" : status.level === "mid" ? "bg-yellow-500/20" : "bg-red-500/20";

  const handleSave = () => {
    onSave({ 
      ...editing, 
      lastUpdated: new Date().toISOString() 
    });
  };

  const formatarDataLocal = (dataString: string) => {
    if (!dataString) return "Nenhuma atualização";
    try {
      const data = new Date(dataString);
      return data.toLocaleString('pt-BR');
    } catch (e) {
      return dataString;
    }
  };

  return (
    <div className="fixed right-0 top-0 h-full w-96 glass-panel z-50 shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col border-l border-white/10">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white border border-white/20 transition-all duration-500",
            circleColorClass
          )}>
            {String(pc.id).replace("PC ", "")}
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground leading-none">
              {pc.id}
            </h2>
            <p className="text-xs text-muted-foreground mt-1">{pc.department || "Sem departamento"}</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
          <X size={20} />
        </button>
      </div>

      {/* Score / Performance Status */}
      <div className={`mx-6 mt-6 p-4 rounded-xl ${scoreBg} flex items-center gap-4 border border-white/5`}>
        <Gauge className={scoreColor} size={28} />
        <div>
          <div className={`text-2xl font-bold ${scoreColor}`}>{status.score}/10</div>
          <div className="text-[10px] uppercase font-bold tracking-wider opacity-80">{status.label}</div>
        </div>
        <div className="ml-auto">
          <div className="w-20 h-2 rounded-full bg-black/20 overflow-hidden">
            <div 
              className={cn(
                "h-full rounded-full transition-all duration-500",
                status.level === "high" ? "bg-green-500" : status.level === "mid" ? "bg-yellow-500" : "bg-red-500"
              )} 
              style={{ width: `${status.score * 10}%` }} 
            />
          </div>
        </div>
      </div>

      {/* Fields */}
      <div className="flex-1 overflow-y-auto p-6 space-y-5">
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground flex items-center gap-2">
            <CircuitBoard size={14} /> Placa mãe
          </Label>
          <Input value={editing.motherboard} onChange={(e) => setEditing({ ...editing, motherboard: e.target.value })} className="bg-secondary/50 border-border/50" />
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground flex items-center gap-2">
            <Cpu size={14} /> CPU
          </Label>
          <Input value={editing.cpu} onChange={(e) => setEditing({ ...editing, cpu: e.target.value })} className="bg-secondary/50 border-border/50" />
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground flex items-center gap-2">
            <MemoryStick size={14} /> RAM (GB)
          </Label>
          <Input 
            type="number" 
            value={editing.ram} 
            onChange={(e) => setEditing({ ...editing, ram: Number(e.target.value) })} 
            className="bg-secondary/50 border-border/50" 
          />
          <p className="text-[10px] text-muted-foreground italic">* O status de desempenho é definido pela quantidade de RAM.</p>
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground flex items-center gap-2">
            <User size={14} /> Atualizado por
          </Label>
          <Input disabled value={editing.updatedBy} className="bg-secondary/30 border-border/50 opacity-70 cursor-not-allowed" />
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground flex items-center gap-2">
            <Calendar size={14} /> Última atualização
          </Label>
          <div className="text-sm font-medium text-foreground bg-secondary/30 border border-border/30 rounded-md px-3 py-2">
            {formatarDataLocal(editing.lastUpdated)}
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="p-6 border-t border-border/50">
        <Button onClick={handleSave} className="w-full gap-2 bg-primary hover:bg-primary/80 text-primary-foreground font-bold">
          <Save size={16} /> Salvar alterações
        </Button>
      </div>
    </div>
  );
};

export default PCDetailPanel;
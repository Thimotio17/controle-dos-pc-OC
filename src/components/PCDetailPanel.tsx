import { useState, useEffect } from "react";
import { PC, getPerformanceScore, getPerformanceLevel } from "@/data/pcData";
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

  const score = getPerformanceScore(editing);
  const level = getPerformanceLevel(score);

  const circleColorClass = 
    level === "high" ? "bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]" : 
    level === "mid" ? "bg-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.5)]" : 
    "bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]";

  const handleSave = () => {
    // CORREÇÃO DA HORA: Gera a data local formatada para evitar fuso horário UTC (T/Z)
    const agora = new Date();
    const dataFormatada = agora.toLocaleDateString('pt-BR') + ' ' + 
                          agora.toLocaleTimeString('pt-BR', { hour12: false });

    onSave({ 
      ...editing, 
      lastUpdated: dataFormatada 
    });
  };

  const scoreColor = level === "high" ? "text-perf-high" : level === "mid" ? "text-perf-mid" : "text-perf-low";
  const scoreBg = level === "high" ? "bg-perf-high/20" : level === "mid" ? "bg-perf-mid/20" : "bg-perf-low/20";

  return (
    <div className="fixed right-0 top-0 h-full w-96 glass-panel z-50 shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
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

      {/* Score */}
      <div className={`mx-6 mt-6 p-4 rounded-xl ${scoreBg} flex items-center gap-4`}>
        <Gauge className={scoreColor} size={28} />
        <div>
          <div className={`text-2xl font-bold ${scoreColor}`}>{score}/10</div>
          <div className="text-xs text-muted-foreground">Nível da máquina</div>
        </div>
        <div className="ml-auto">
          <div className="w-20 h-2 rounded-full bg-secondary overflow-hidden">
            <div className={`h-full rounded-full transition-all duration-500 ${level === "high" ? "bg-perf-high" : level === "mid" ? "bg-perf-mid" : "bg-perf-low"}`} style={{ width: `${score * 10}%` }} />
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
          <Input type="number" value={editing.ram} onChange={(e) => setEditing({ ...editing, ram: Number(e.target.value) })} className="bg-secondary/50 border-border/50" />
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
          <div className="text-[10px] font-mono text-muted-foreground bg-secondary/30 border border-border/30 rounded-md px-3 py-2 overflow-hidden text-ellipsis">
            {editing.lastUpdated}
          </div>
        </div>
      </div>

      {/* Save */}
      <div className="p-6 border-t border-border/50">
        <Button onClick={handleSave} className="w-full gap-2 bg-primary hover:bg-primary/80 text-primary-foreground">
          <Save size={16} /> Salvar alterações
        </Button>
      </div>
    </div>
  );
};

export default PCDetailPanel;
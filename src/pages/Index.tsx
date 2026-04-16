import { useState } from "react";
import { PC, initialPCs } from "@/data/pcData";
import FloorMap from "@/components/FloorMap";
import PCDetailPanel from "@/components/PCDetailPanel";
import { Search, Building2, ChevronUp, ChevronDown, Monitor, ClipboardList } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// 1. Definimos que a Index agora recebe o usuário
interface IndexProps {
  usuario?: string;
}

// AQUI ESTAVA O ERRO: tirei o } que fechava a função antes da hora
const Index = ({ usuario }: IndexProps) => {
  const [pcs, setPcs] = useState<PC[]>(initialPCs);
  const [floor, setFloor] = useState<1 | 2>(1);
  const [selectedPc, setSelectedPc] = useState<PC | null>(null);
  const [search, setSearch] = useState("");
  const [transitioning, setTransitioning] = useState(false);

  // 2. Novo estado para a lista de logs (histórico)
  const [logs, setLogs] = useState<{ id: number; msg: string; hora: string }[]>([]);

  const switchFloor = (f: 1 | 2) => {
    if (f === floor) return;
    setTransitioning(true);
    setSelectedPc(null);
    setTimeout(() => {
      setFloor(f);
      setTimeout(() => setTransitioning(false), 50);
    }, 300);
  };

  const handlePcClick = (pc: PC) => {
    setSelectedPc(pc);
  };

  // 3. Função para registrar o log
  const registrarAcao = (acao: string) => {
    const novoLog = {
      id: Date.now(),
      msg: `${usuario || 'Sistema'}: ${acao}`,
      hora: new Date().toLocaleTimeString(),
    };
    setLogs((prev) => [novoLog, ...prev]);
    console.log("Log registrado:", novoLog);
  };

  const handleSave = (updated: PC) => {
    setPcs((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setSelectedPc(updated);
    
    // 4. Registra que o usuário alterou as configurações
    registrarAcao(`Alterou configurações do PC ${String(updated.id).padStart(2, "0")}`);
  };

  const searchResult = search.trim()
    ? pcs.find(
        (pc) =>
          String(pc.id) === search.trim() ||
          String(pc.id).padStart(2, "0") === search.trim()
      )
    : null;

  const totalFloor1 = pcs.filter((p) => p.floor === 1).length;
  const totalFloor2 = pcs.filter((p) => p.floor === 2).length;

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Top bar */}
      <header className="flex items-center justify-between px-6 py-3 glass-panel border-b border-border/30 z-40 relative shrink-0">
        <div className="flex items-center gap-3">
          <Monitor className="text-primary" size={24} />
          <div>
            <h1 className="text-lg font-bold text-foreground tracking-tight leading-none">
              ODONTO PC
            </h1>
            <span className="text-[10px] text-primary">Operador: {usuario || 'Desconhecido'}</span>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
          <Input
            placeholder="numero do pc..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-secondary/50 border-border/30 text-sm"
          />
          {searchResult && (
            <button
              onClick={() => {
                setFloor(searchResult.floor);
                setSelectedPc(searchResult);
                setSearch("");
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-primary hover:underline"
            >
              Ir para PC {String(searchResult.id).padStart(2, "0")}
            </button>
          )}
        </div>

        {/* Floor switcher */}
        <div className="flex items-center gap-2">
          <Button
            variant={floor === 1 ? "default" : "secondary"}
            size="sm"
            onClick={() => switchFloor(1)}
            className="gap-1.5 text-xs"
          >
            <Building2 size={14} />
            Piso inferior
            <span className="ml-1 text-[10px] opacity-70">({totalFloor1})</span>
          </Button>
          <Button
            variant={floor === 2 ? "default" : "secondary"}
            size="sm"
            onClick={() => switchFloor(2)}
            className="gap-1.5 text-xs"
          >
            <Building2 size={14} />
            Piso superior
            <span className="ml-1 text-[10px] opacity-70">({totalFloor2})</span>
          </Button>
        </div>
      </header>

      {/* Map area */}
      <main className="flex-1 relative min-h-0 flex">
        <div
          className={`flex-1 relative ${transitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
          style={{ transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)" }}
        >
          <FloorMap
            pcs={pcs}
            floor={floor}
            selectedPcId={selectedPc?.id ?? null}
            onPcClick={handlePcClick}
          />
        </div>

        {/* 5. Painel lateral de LOGS para ver as alterações em tempo real */}
        <aside className="w-64 border-l border-border/20 bg-black/20 p-4 overflow-y-auto hidden lg:block">
          <div className="flex items-center gap-2 mb-4 text-muted-foreground border-b border-border/10 pb-2">
            <ClipboardList size={16} />
            <span className="text-xs font-semibold uppercase tracking-wider">Histórico</span>
          </div>
          <div className="space-y-3">
            {logs.length === 0 && <p className="text-[10px] text-muted-foreground italic">Nenhuma alteração recente</p>}
            {logs.map((log) => (
              <div key={log.id} className="text-[10px] leading-tight bg-secondary/30 p-2 rounded border border-white/5">
                <span className="text-primary block font-mono mb-1">{log.hora}</span>
                <p className="text-gray-300">{log.msg}</p>
              </div>
            ))}
          </div>
        </aside>

        {/* Overlay click to close */}
        {selectedPc && (
          <div className="absolute inset-0 z-40 bg-black/10 backdrop-blur-[1px]" onClick={() => setSelectedPc(null)} />
        )}

        {/* Detail panel */}
        <PCDetailPanel pc={selectedPc} onClose={() => setSelectedPc(null)} onSave={handleSave} />
      </main>

      {/* Legend */}
      <footer className="flex items-center justify-center gap-6 py-2 text-[10px] text-muted-foreground border-t border-border/20 shrink-0">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-perf-high" /> Esse tá TOP
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-perf-mid" /> Meia boca
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-perf-low" /> Porqueira
        </span>
      </footer>
    </div>
  );
};

export default Index;
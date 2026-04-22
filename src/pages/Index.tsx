import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { PC } from "@/data/pcData";
import FloorMap from "@/components/FloorMap";
import PCDetailPanel from "@/components/PCDetailPanel";
import { Search, Building2, Monitor, ClipboardList, LogOut, PlusCircle, Crosshair } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface LogAtividade {
  id: number;
  operador: string;
  acao: string;
  computador: string;
  criado_em: string;
}

interface IndexProps {
  usuario?: string | null;
}

const Index = ({ usuario }: IndexProps) => {
  const [pcs, setPcs] = useState<PC[]>([]);
  const [floor, setFloor] = useState<1 | 2>(1);
  const [selectedPc, setSelectedPc] = useState<PC | null>(null);
  const [search, setSearch] = useState("");
  const [transitioning, setTransitioning] = useState(false);
  const [logs, setLogs] = useState<LogAtividade[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();

  const buscarDadosIniciais = async () => {
    const { data: dataLogs } = await supabase
      .from('logs_atividades')
      .select('*')
      .order('criado_em', { ascending: false })
      .limit(15);
    
    if (dataLogs) setLogs(dataLogs as LogAtividade[]);

    const { data: dataPcs } = await supabase
      .from('computadores')
      .select('*')
      .order('id', { ascending: true });
    
    if (dataPcs) {
      const pcsFormatados: PC[] = dataPcs.map(item => ({
        id: item.id,
        status: item.status,
        floor: Number(item.floor),
        description: item.description || "",
        top: Number(item.top) || 0,
        left: Number(item.left) || 0,
        cpu: item.cpu || "N/A",
        ram: Number(item.ram) || 0,
        motherboard: item.motherboard || "",
        lastUpdated: item.ultima_atualizacao || "", 
        updatedBy: item.updated_by || "Sistema", 
        department: item.department || ""
      }));
      setPcs(pcsFormatados);
    }
  };

  useEffect(() => {
    buscarDadosIniciais();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  // Atualiza a posição no estado local enquanto arrasta
  const handleUpdatePosition = (id: string | number, top: number, left: number) => {
    setPcs(prevPcs => prevPcs.map(pc => 
      pc.id === id ? { ...pc, top, left } : pc
    ));
  };

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isAdding) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const novoPC: PC = {
      id: `PC ${pcs.length + 1}`,
      status: "online",
      floor: floor,
      top: Number(y.toFixed(2)),
      left: Number(x.toFixed(2)),
      cpu: "",
      ram: 8,
      motherboard: "",
      lastUpdated: "",
      updatedBy: usuario || 'Sistema',
      department: ""
    };

    setSelectedPc(novoPC);
    setIsAdding(false);
    toast.info("Defina as configurações do novo PC e salve.");
  };

  const handleSave = async (updated: PC) => {
    const dataParaBanco = { 
      id: updated.id,
      status: updated.status || 'online', 
      cpu: updated.cpu || 'N/A',
      ram: Number(updated.ram) || 0,
      motherboard: updated.motherboard || 'N/A',
      department: updated.department || '',
      floor: Number(updated.floor),
      top: Number(updated.top),
      left: Number(updated.left),
      ultima_atualizacao: new Date().toISOString(),
      updated_by: usuario || 'Sistema' 
    };

    const { error } = await supabase
      .from('computadores')
      .upsert(dataParaBanco, { onConflict: 'id' });

    if (error) {
      console.error("ERRO COMPLETO:", error);
      toast.error(`Erro no banco: ${error.message}`);
      return;
    }

    setSelectedPc(null);
    toast.success(`${updated.id} salvo com sucesso!`);
    buscarDadosIniciais();
  };

  const switchFloor = (f: 1 | 2) => {
    if (f === floor) return;
    setTransitioning(true);
    setSelectedPc(null);
    setTimeout(() => {
      setFloor(f);
      setTimeout(() => setTransitioning(false), 50);
    }, 300);
  };

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <header className="flex items-center justify-between px-6 py-3 glass-panel border-b border-border/30 z-40 relative shrink-0">
        <div className="flex items-center gap-3">
          <Monitor className="text-primary" size={24} />
          <div>
            <h1 className="text-lg font-bold text-foreground tracking-tight leading-none">ODONTO PC</h1>
            <div className="flex flex-col items-start">
              <span className="text-[10px] text-primary">Operador: {usuario || 'Desconhecido'}</span>
              <button onClick={handleLogout} className="flex items-center gap-1 text-[9px] text-red-400/80 hover:text-red-500 font-bold uppercase mt-0.5">
                <LogOut size={10} /> Sair
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
           <Button 
            variant={isAdding ? "destructive" : "outline"} 
            size="sm" 
            onClick={() => setIsAdding(!isAdding)}
            className="gap-2 border-primary/50 text-primary hover:bg-primary/10 animate-pulse"
          >
            {isAdding ? <Crosshair size={14} /> : <PlusCircle size={14} />}
            {isAdding ? "Clique ou Arraste no mapa..." : "Adicionar/Mover PC"}
          </Button>

          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <Input
              placeholder="Buscar PC..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-secondary/50 border-border/30 text-sm h-8"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant={floor === 1 ? "default" : "secondary"} size="sm" onClick={() => switchFloor(1)} className="text-xs h-8">
            Piso inferior
          </Button>
          <Button variant={floor === 2 ? "default" : "secondary"} size="sm" onClick={() => switchFloor(2)} className="text-xs h-8">
            Piso superior
          </Button>
        </div>
      </header>

      <main className="flex-1 relative flex overflow-hidden">
        <div 
          className={`flex-1 relative transition-all duration-300 ${transitioning ? "opacity-0" : "opacity-100"} ${isAdding ? "cursor-crosshair" : ""}`}
          onClick={handleMapClick}
        >
          <FloorMap 
            pcs={pcs} 
            floor={floor} 
            selectedPcId={selectedPc?.id ?? null} 
            onPcClick={(pc) => !isAdding && setSelectedPc(pc)}
            isAdding={isAdding}
            onUpdatePosition={handleUpdatePosition}
          />
          
          {isAdding && (
            <div className="absolute inset-0 bg-primary/5 pointer-events-none flex items-center justify-center">
              <div className="bg-background/80 px-4 py-2 rounded-full border border-primary text-primary text-xs font-bold animate-bounce shadow-xl">
                MODO DE EDIÇÃO: ARRASTE OS ÍCONES OU CLIQUE NO MAPA
              </div>
            </div>
          )}
        </div>

        <aside className="w-64 border-l border-border/20 bg-black/20 p-4 overflow-y-auto hidden lg:block">
          <div className="flex items-center gap-2 mb-4 text-muted-foreground border-b border-border/10 pb-2">
            <ClipboardList size={16} />
            <span className="text-xs font-semibold uppercase">Histórico</span>
          </div>
          <div className="space-y-3">
            {logs.map((log) => (
              <div key={log.id} className="text-[10px] bg-secondary/30 p-2 rounded border border-white/5">
                <span className="text-primary block mb-1">{new Date(log.criado_em).toLocaleTimeString('pt-BR')}</span>
                <p className="text-gray-300 font-bold">{log.operador}</p>
                <p className="text-gray-400">{log.acao} <span className="text-red-400">{log.computador}</span></p>
              </div>
            ))}
          </div>
        </aside>

        {selectedPc && <div className="absolute inset-0 z-30 bg-black/40 backdrop-blur-[2px]" onClick={() => setSelectedPc(null)} />}
        
        <PCDetailPanel 
          pc={selectedPc} 
          onClose={() => setSelectedPc(null)} 
          onSave={handleSave} 
        />
      </main>
    </div>
  );
};

export default Index;
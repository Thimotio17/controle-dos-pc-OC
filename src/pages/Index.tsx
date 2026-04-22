import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { PC } from "@/data/pcData";
import FloorMap from "@/components/FloorMap";
import PCDetailPanel from "@/components/PCDetailPanel";
import { Search, Building2, Monitor, ClipboardList, LogOut } from "lucide-react"; // Adicionado LogOut
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom"; // Importado para navegação

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
    
    const canal = supabase
      .channel('db-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'logs_atividades' }, () => {
        buscarDadosIniciais();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'computadores' }, () => {
        buscarDadosIniciais();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(canal);
    };
  }, []);

  const handleLogout = () => {
  // 1. Limpa o localStorage (onde geralmente fica o nome do usuário)
  localStorage.clear(); 
  
  // 2. Se você usa cookies ou session do Supabase, isso garante a limpeza
  supabase.auth.signOut().then(() => {
    // 3. Redireciona para a raiz (onde deve estar o Login)
    navigate("/", { replace: true });
    
    // 4. Força o recarregamento total para resetar todos os "useEffect"
    window.location.reload();
  });
};

  const registrarAcaoNoBanco = async (acao: string, pcId: string) => {
    await supabase.from('logs_atividades').insert([
      { 
        operador: usuario || 'Sistema', 
        acao: acao, 
        computador: pcId 
      }
    ]);
  };

  const handleSave = async (updated: PC) => {
    // CORREÇÃO FINAL DA HORA: Enviando como string formatada para o banco não alterar o fuso
    const agora = new Date();
    const dataTexto = agora.toLocaleDateString('pt-BR') + ' ' + 
                      agora.toLocaleTimeString('pt-BR', { hour12: false });

    const dadosParaAtualizar = { 
      status: updated.status, 
      description: updated.description,
      cpu: updated.cpu,
      ram: updated.ram,
      motherboard: updated.motherboard,
      department: updated.department,
      ultima_atualizacao: dataTexto, // Salva o texto fixo
      updated_by: usuario || 'Sistema' 
    };

    const { error } = await supabase
      .from('computadores')
      .update(dadosParaAtualizar)
      .eq('id', updated.id);

    if (error) {
      console.error("Erro ao salvar:", error);
      toast.error("Erro ao sincronizar com o banco de dados.");
      return;
    }

    setSelectedPc(null);
    toast.success(`PC ${updated.id} atualizado com sucesso!`);
    
    await registrarAcaoNoBanco(`Alterou configurações do ${updated.id}`, String(updated.id));
    await buscarDadosIniciais(); 
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

  const searchResult = search.trim()
    ? pcs.find(pc => String(pc.id).toLowerCase().includes(search.toLowerCase().trim()))
    : null;

  const totalFloor1 = pcs.filter((p) => p.floor === 1).length;
  const totalFloor2 = pcs.filter((p) => p.floor === 2).length;

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <header className="flex items-center justify-between px-6 py-3 glass-panel border-b border-border/30 z-40 relative shrink-0">
        <div className="flex items-center gap-3">
          <Monitor className="text-primary" size={24} />
          <div>
            <h1 className="text-lg font-bold text-foreground tracking-tight leading-none">ODONTO PC</h1>
            <div className="flex flex-col items-start">
              <span className="text-[10px] text-primary">Operador: {usuario || 'Desconhecido'}</span>
              
              {/* NOVO: Botão de Sair posicionado abaixo do nome */}
              <button 
                onClick={handleLogout}
                className="flex items-center gap-1 text-[9px] text-red-400/80 hover:text-red-500 transition-colors font-bold uppercase tracking-tighter mt-0.5"
              >
                <LogOut size={10} />
                Sair do sistema
              </button>
            </div>
          </div>
        </div>

        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
          <Input
            placeholder="Ex: PC 01..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-secondary/50 border-border/30 text-sm"
          />
          {searchResult && (
            <button
              onClick={() => {
                setFloor(searchResult.floor as 1 | 2);
                setSelectedPc(searchResult);
                setSearch("");
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-primary hover:underline"
            >
              Ir para {String(searchResult.id)}
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button variant={floor === 1 ? "default" : "secondary"} size="sm" onClick={() => switchFloor(1)} className="gap-1.5 text-xs">
            <Building2 size={14} /> Piso inferior <span className="ml-1 text-[10px] opacity-70">({totalFloor1})</span>
          </Button>
          <Button variant={floor === 2 ? "default" : "secondary"} size="sm" onClick={() => switchFloor(2)} className="gap-1.5 text-xs">
            <Building2 size={14} /> Piso superior <span className="ml-1 text-[10px] opacity-70">({totalFloor2})</span>
          </Button>
        </div>
      </header>

      <main className="flex-1 relative min-h-0 flex">
        <div className={`flex-1 relative ${transitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"}`} style={{ transition: "all 0.4s ease" }}>
          <FloorMap 
            pcs={pcs} 
            floor={floor} 
            selectedPcId={selectedPc?.id ?? null} 
            onPcClick={(pc) => setSelectedPc(pc)} 
          />
        </div>

        <aside className="w-64 border-l border-border/20 bg-black/20 p-4 overflow-y-auto hidden lg:block">
          <div className="flex items-center gap-2 mb-4 text-muted-foreground border-b border-border/10 pb-2">
            <ClipboardList size={16} />
            <span className="text-xs font-semibold uppercase tracking-wider">Histórico Real</span>
          </div>
          <div className="space-y-3">
            {logs.map((log) => (
              <div key={log.id} className="text-[10px] leading-tight bg-secondary/30 p-2 rounded border border-white/5">
                <span className="text-primary block font-mono mb-1">
                  {new Date(log.criado_em).toLocaleTimeString('pt-BR')}
                </span>
                <p className="text-gray-300 font-bold">{log.operador}</p>
                <p className="text-gray-400">{log.acao} <span className="text-red-400">{log.computador !== 'N/A' ? log.computador : ''}</span></p>
              </div>
            ))}
          </div>
        </aside>

        {selectedPc && (
          <div 
            className="absolute inset-0 z-30 bg-black/40 backdrop-blur-[2px]" 
            onClick={() => setSelectedPc(null)} 
          />
        )}
        
        <PCDetailPanel 
          pc={selectedPc} 
          onClose={() => setSelectedPc(null)} 
          onSave={handleSave} 
        />
      </main>

      <footer className="flex items-center justify-center gap-6 py-2 text-[10px] text-muted-foreground border-t border-border/20 shrink-0">
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-green-500" /> TOP</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-yellow-500" /> Meia boca</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500" /> Porqueira</span>
      </footer>
    </div>
  );
};

export default Index;
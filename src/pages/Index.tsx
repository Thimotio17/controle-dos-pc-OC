import { useState, useMemo } from "react";
import { PC, initialPCs } from "@/data/pcData";
import FloorMap from "@/components/FloorMap";
import PCDetailPanel from "@/components/PCDetailPanel";
import { Search, Building2, ChevronUp, ChevronDown, Monitor } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [pcs, setPcs] = useState<PC[]>(initialPCs);
  const [floor, setFloor] = useState<1 | 2>(1);
  const [selectedPc, setSelectedPc] = useState<PC | null>(null);
  const [search, setSearch] = useState("");
  const [transitioning, setTransitioning] = useState(false);

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

  const handleSave = (updated: PC) => {
    setPcs((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setSelectedPc(updated);
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
          <h1 className="text-lg font-bold text-foreground tracking-tight">Office PC Manager</h1>
        </div>

        {/* Search */}
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
          <Input
            placeholder="Search PC number..."
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
              Go to PC {String(searchResult.id).padStart(2, "0")}
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
            <ChevronDown size={12} />
            Floor 1
            <span className="ml-1 text-[10px] opacity-70">({totalFloor1})</span>
          </Button>
          <Button
            variant={floor === 2 ? "default" : "secondary"}
            size="sm"
            onClick={() => switchFloor(2)}
            className="gap-1.5 text-xs"
          >
            <Building2 size={14} />
            <ChevronUp size={12} />
            Floor 2
            <span className="ml-1 text-[10px] opacity-70">({totalFloor2})</span>
          </Button>
        </div>
      </header>

      {/* Map area */}
      <main className="flex-1 relative min-h-0">
        <div
          className={`absolute inset-0 ${transitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
          style={{ transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)" }}
        >
          <FloorMap
            pcs={pcs}
            floor={floor}
            selectedPcId={selectedPc?.id ?? null}
            onPcClick={handlePcClick}
          />
        </div>

        {/* Overlay click to close */}
        {selectedPc && (
          <div className="absolute inset-0 z-40" onClick={() => setSelectedPc(null)} />
        )}

        {/* Detail panel */}
        <PCDetailPanel pc={selectedPc} onClose={() => setSelectedPc(null)} onSave={handleSave} />
      </main>

      {/* Legend */}
      <footer className="flex items-center justify-center gap-6 py-2 text-[10px] text-muted-foreground border-t border-border/20 shrink-0">
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-perf-high" /> High Performance</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-perf-mid" /> Medium</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-perf-low" /> Low</span>
      </footer>
    </div>
  );
};

export default Index;

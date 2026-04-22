import { PC } from "@/data/pcData";
import PCCircle from "./PCCircle";
import floor1Img from "@/assets/floor1-map.png";
import floor2Img from "@/assets/floor2-map.jpg";
import { useState, useRef } from "react";

interface FloorMapProps {
  pcs: PC[];
  floor: 1 | 2;
  selectedPcId: string | number | null;
  onPcClick: (pc: PC) => void;
  isAdding?: boolean; // Novo: Recebe o estado do modo edição
  onUpdatePosition?: (id: string | number, top: number, left: number) => void; // Novo: Função para atualizar posição
}

const FloorMap = ({ pcs, floor, selectedPcId, onPcClick, isAdding, onUpdatePosition }: FloorMapProps) => {
  const [draggingId, setDraggingId] = useState<string | number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const floorPcs = pcs.filter((p) => Number(p.floor) === Number(floor));
  const bgImage = floor === 1 ? floor1Img : floor2Img;
  const selectedPc = selectedPcId ? floorPcs.find(p => p.id === selectedPcId) : null;

  // Lógica de Mouse para Arrastar
  const handleMouseDown = (id: string | number) => {
    if (isAdding) {
      setDraggingId(id);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggingId || !onUpdatePosition || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    
    // Calcula a porcentagem baseada na posição do mouse dentro do container
    let left = ((e.clientX - rect.left) / rect.width) * 100;
    let top = ((e.clientY - rect.top) / rect.height) * 100;

    // Limita para o PC não fugir da tela (0 a 100%)
    left = Math.max(0, Math.min(100, left));
    top = Math.max(0, Math.min(100, top));

    onUpdatePosition(draggingId, Number(top.toFixed(2)), Number(left.toFixed(2)));
  };

  const handleMouseUp = () => {
    setDraggingId(null);
  };

  // Se estiver no modo adição, removemos o zoom para não atrapalhar o arraste
  const transformStyle = selectedPc && !isAdding
    ? {
        transform: `scale(1.8) translate(${50 - (selectedPc.left || 0)}%, ${50 - (selectedPc.top || 0)}%)`,
        filter: "blur(2px) brightness(0.4)",
        transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
      }
    : {
        transform: "scale(1) translate(0, 0)",
        filter: "none",
        transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
      };

  return (
    <div 
      className={`w-full h-full overflow-hidden relative flex items-center justify-center bg-black/10 ${isAdding ? "cursor-crosshair" : ""}`}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Container Principal do Mapa */}
      <div 
        ref={containerRef}
        className="relative h-full max-w-full origin-center select-none" 
        style={transformStyle}
      >
        <img
          src={bgImage}
          alt={`Floor ${floor} map`}
          className="h-full w-auto max-w-none block"
          draggable={false}
        />
        
        <div className="absolute inset-0 z-10">
          {floorPcs.map((pc) => {
            if (!pc.top || !pc.left) return null;

            return (
              <div
                key={pc.id}
                onMouseDown={() => handleMouseDown(pc.id)}
                className="absolute"
                style={{ 
                  top: `${pc.top}%`, 
                  left: `${pc.left}%`,
                  transform: "translate(-50%, -50%)",
                  zIndex: (selectedPcId === pc.id || draggingId === pc.id) ? 100 : 20,
                  cursor: isAdding ? (draggingId === pc.id ? 'grabbing' : 'grab') : 'pointer'
                }}
              >
                <PCCircle
                  pc={pc}
                  onClick={() => !isAdding && onPcClick(pc)} // Só abre o painel se NÃO estiver arrastando
                  isSelected={selectedPcId === pc.id || draggingId === pc.id}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Destaque do PC Selecionado (Desabilitado no modo adição) */}
      {selectedPc && !isAdding && (
        <div
          className="absolute z-50 pointer-events-none"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="pointer-events-auto scale-125">
            <PCCircle
              pc={selectedPc}
              onClick={() => onPcClick(selectedPc)}
              isSelected={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FloorMap;
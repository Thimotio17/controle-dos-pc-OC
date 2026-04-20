import { PC } from "@/data/pcData";
import PCCircle from "./PCCircle";
import floor1Img from "@/assets/floor1-map.png";
import floor2Img from "@/assets/floor2-map.jpg";

interface FloorMapProps {
  pcs: PC[];
  floor: 1 | 2;
  selectedPcId: number | null;
  onPcClick: (pc: PC) => void;
}

const FloorMap = ({ pcs, floor, selectedPcId, onPcClick }: FloorMapProps) => {
  // 1. Filtra os PCs do andar atual
  const floorPcs = pcs.filter((p) => Number(p.floor) === Number(floor));
  
  const bgImage = floor === 1 ? floor1Img : floor2Img;
  const selectedPc = selectedPcId ? floorPcs.find(p => p.id === selectedPcId) : null;

  // 2. Lógica de Zoom e Centralização
  const transformStyle = selectedPc
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
    <div className="w-full h-full overflow-hidden relative flex items-center justify-center bg-black/10">
      {/* Mapa com Zoom */}
      <div className="relative h-full max-w-full origin-center" style={transformStyle}>
        <img
          src={bgImage}
          alt={`Floor ${floor} map`}
          className="h-full w-auto max-w-none block"
          draggable={false}
        />
        
        {/* Renderização dos PCs com trava de segurança */}
        <div className="absolute inset-0 z-10">
          {floorPcs.map((pc) => {
            // TRAVA DE SEGURANÇA: Se o PC não tiver posição no banco (ou for 0), 
            // ele não é renderizado para não amontoar no canto.
            if (!pc.top || !pc.left) return null;

            return (
              <div
                key={pc.id}
                className="absolute"
                style={{ 
                  top: `${pc.top}%`, 
                  left: `${pc.left}%`,
                  transform: "translate(-50%, -50%)",
                  zIndex: selectedPcId === pc.id ? 50 : 20
                }}
              >
                <PCCircle
                  pc={pc}
                  onClick={() => onPcClick(pc)}
                  isSelected={selectedPcId === pc.id}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Destaque do PC Selecionado */}
      {selectedPc && (
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
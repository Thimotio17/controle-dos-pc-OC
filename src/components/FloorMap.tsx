import { useState, useRef, useEffect } from "react";
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
  const floorPcs = pcs.filter((p) => p.floor === floor);
  const bgImage = floor === 1 ? floor1Img : floor2Img;

  const selectedPc = selectedPcId ? floorPcs.find(p => p.id === selectedPcId) : null;

  const transformStyle = selectedPc
    ? {
        transform: `scale(1.8) translate(${50 - selectedPc.position.left}%, ${50 - selectedPc.position.top}%)`,
        filter: "blur(2px) brightness(0.7)",
        transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
      }
    : {
        transform: "scale(1) translate(0, 0)",
        filter: "none",
        transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
      };

  return (
    <div className="w-full h-full overflow-hidden relative flex items-center justify-center">
      {/* Image-based sizing: the img defines the container size */}
      <div className="relative h-full max-w-full" style={transformStyle}>
        <img
          src={bgImage}
          alt={`Floor ${floor} map`}
          className="h-full w-auto max-w-none block"
          draggable={false}
        />
        {/* PC circles overlay — same size as the rendered image */}
        <div className="absolute inset-0">
          {floorPcs.map((pc) => (
            <div
              key={pc.id}
              className="absolute"
              style={{
                top: `${pc.position.top}%`,
                left: `${pc.position.left}%`,
                transform: "translate(-50%, -50%)",
                zIndex: selectedPcId === pc.id ? 20 : 10,
              }}
            >
              <PCCircle
                pc={pc}
                onClick={onPcClick}
                isSelected={selectedPcId === pc.id}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Selected PC stays visible on top without blur */}
      {selectedPc && (
        <div
          className="absolute z-30 pointer-events-none"
          style={{
            top: "50%",
            left: "40%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="pointer-events-auto">
            <PCCircle
              pc={selectedPc}
              onClick={onPcClick}
              isSelected={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FloorMap;

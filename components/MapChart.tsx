"use client";

import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
} from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const clientLocations = [
  {
    name: "United Kingdom",
    flag: "/who_we_are/flagUK.svg",
    coordinates: [-2, 54] as [number, number],
    clients: ["Vas Solicitors", "British Tamils Cricket League", "Thamilalayam Berlin"],
    color: "#00BFFF",
    delay: "0s"
  },
  {
    name: "Belgium", 
    flag: "/who_we_are/flagBelgium.svg",
    coordinates: [4.4, 50.5] as [number, number],
    clients: ["KIO-X Human Performance", "Thamilalayam Berlin"],
    color: "#22C55E",
    delay: "0.3s"
  },
  {
    name: "Norway",
    flag: "/who_we_are/flagNorway.svg",
    coordinates: [8.5, 60.5] as [number, number],
    clients: ["Digital Innovation Lab"],
    color: "#F97316",
    delay: "0.6s"
  },
  {
    name: "Canada",
    flag: "/who_we_are/flagCanada.svg", 
    coordinates: [-96, 60] as [number, number],
    clients: ["Sail IndSri"],
    color: "#F97316",
    delay: "0.9s"
  },
  {
    name: "India",
    flag: "/who_we_are/flagIndia.svg",
    coordinates: [78.9, 20.6] as [number, number],
    clients: ["Neuron / Neeram", "Eraa Supermarket"],
    color: "#00BFFF",
    delay: "1.2s"
  },
  {
    name: "Australia",
    flag: "/who_we_are/flagAustralia.svg",
    coordinates: [133, -25] as [number, number],
    clients: ["EcolifeAus"],
    color: "#22C55E",
    delay: "1.5s"
  }
];

// Connecting lines: UK <-> Germany <-> Sri Lanka
const connections = [
  { from: [-2, 54], to: [10, 51] }, // UK to Germany
  { from: [10, 51], to: [80.7, 7.8] }, // Germany to Sri Lanka
];

export default function MapChart() {
  const [hovered, setHovered] = useState<string | null>(null);

  const activeLocation = clientLocations.find(loc => loc.name === hovered);

  return (
    <div className="relative w-full h-full min-h-[400px] bg-white rounded-xl overflow-hidden cursor-crosshair">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 120,
          center: [0, 20]
        }}
        width={776}
        height={388}
        className="w-full h-auto"
      >
        <defs>
          <pattern 
            id="dotPattern" 
            x="0" 
            y="0" 
            width="4" 
            height="4" 
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="1.2" fill="#171717" />
          </pattern>
        </defs>

        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="url(#dotPattern)"
                stroke="#ffffff"
                strokeWidth={0.1}
                style={{
                  default: { outline: "none" },
                  hover: { fill: "url(#dotPattern)", stroke: "#15CEFF", strokeWidth: 0.5, outline: "none" },
                  pressed: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>

        {/* Connecting Lines (Dashed & Animated) */}
        <g className="hidden md:block">
          {connections.map((conn, i) => (
            <Line
              key={i}
              from={conn.from as [number, number]}
              to={conn.to as [number, number]}
              stroke="#00BFFF"
              strokeWidth={0.5}
              strokeDasharray="4 4"
              className="animate-line-flow opacity-30"
            />
          ))}
        </g>

        {/* Markers */}
        {clientLocations.map(({ name, coordinates, color, delay, flag }) => (
          <Marker 
            key={name} 
            coordinates={coordinates}
            onMouseEnter={() => setHovered(name)}
            onMouseLeave={() => setHovered(null)}
          >
            <g className="cursor-pointer">
              {/* Outer pulsing ring */}
              <circle
                r={12}
                fill="#00BFFF"
                className="animate-ping opacity-30"
                style={{ animationDelay: delay }}
              />
              {/* Flag Image - Rendered at full size */}
              <image
                href={flag}
                x={-10}
                y={-10}
                width={20}
                height={20}
                style={{ pointerEvents: "none" }}
              />
            </g>
          </Marker>
        ))}
      </ComposableMap>

      {/* Tooltip Card */}
      {activeLocation && (
        <div 
          className="absolute hidden md:block pointer-events-none transition-all duration-300 z-50"
          style={{
            // Simple positioning logic relative to map dimensions (rough estimate)
            // For production, a more robust tooltip positioning system is better
            left: "50%",
            top: "20%",
            transform: "translateX(-50%)"
          }}
        >
          <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-3 w-48 border-l-4 border-l-[#15CEFF]">
            <div className="flex items-center gap-2 mb-2">
              <img src={activeLocation.flag} alt={`${activeLocation.name} flag`} className="w-6 h-6 object-contain" />
              <span className="font-bold text-sm text-slate-800">{activeLocation.name}</span>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Clients</p>
              <ul className="space-y-0.5">
                {activeLocation.clients.map((client, idx) => (
                  <li key={idx} className="text-[11px] text-slate-600 leading-tight">• {client}</li>
                ))}
              </ul>
            </div>
            {/* Arrow */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-white" />
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useEffect, useState, useCallback } from "react";
import Tree from "react-d3-tree";
import { User, ShieldCheck, Users, Plus, Minus, Loader } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

// --- Types ---
interface OrgNode {
  name: string;
  role?: string;
  image?: string;
  referralCode?: string;
  attributes?: {
    rank: string;
    status: string;
  };
  children?: OrgNode[];
  __rd3t?: {
    collapsed?: boolean;
    depth?: number;
  };
}

// --- Helpers ---
const useCenteredTree = () => {
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const containerRef = useCallback((containerElem: HTMLDivElement | null) => {
    if (containerElem !== null) {
      const { width } = containerElem.getBoundingClientRect();
      setTranslate({ x: width / 2, y: 100 });
    }
  }, []);
  return [translate, containerRef] as const;
};

// --- Main Component ---
export default function GenealogyTree() {
  const { data: session, isPending } = authClient.useSession();
  const [data, setData] = useState<OrgNode | null>(null);
  const [translate, containerRef] = useCenteredTree();
  
  const rootUserId = session?.user.id;

  useEffect(() => {
    if (!rootUserId) return;
    fetch(`/api/genealogy/${rootUserId}`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Failed to load tree:", err));
  }, [rootUserId]);

  if (!data || isPending) {
    return (
      <div className="w-full h-full flex items-center justify-center border gap-2">
        <Loader className="animate-spin" /> Loading Network 
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-full max-h-screen overflow-hidden relative inset-0 z-0 border border-slate-800 shadow-2xl"
      style={{
        backgroundColor: "#000000",
        backgroundImage: `
          radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }}
    >
      <style jsx global>{`
        .rd3t-link {
          stroke: #334155 !important;
          stroke-width: 1.5px !important;
        }
        .rd3t-link:hover {
          stroke: #8b5cf6 !important;
          stroke-width: 2px !important;
          transition: all 0.3s ease;
        }
      `}</style>

      <Tree
        data={data}
        translate={translate}
        orientation="vertical"
        pathFunc="step"
        zoomable
        collapsible
        separation={{ siblings: 2, nonSiblings: 2.5 }}
        enableLegacyTransitions={true}
        transitionDuration={400}
        nodeSize={{ x: 250, y: 230 }} 
        renderCustomNodeElement={({ nodeDatum, toggleNode }) => (
          <NodeCard
            nodeDatum={nodeDatum as unknown as OrgNode}
            toggleNode={toggleNode}
          />
        )}
      />
      
      {/* Legend */}
      <div className="absolute bottom-6 right-6 bg-slate-950/80 backdrop-blur border border-slate-800 p-3 rounded-lg shadow-xl text-xs text-slate-400">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]"></span> 
            Active
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-slate-600"></span> 
            Inactive
          </div>
        </div>
      </div>
    </div>
  );
}

const NodeCard = ({
  nodeDatum,
  toggleNode,
}: {
  nodeDatum: OrgNode;
  toggleNode: () => void;
}) => {
  const hasChildren = nodeDatum.children && nodeDatum.children.length > 0;
  const isCollapsed = nodeDatum.__rd3t?.collapsed;

  return (
    <g>
      <foreignObject x="-110" y="-70" width="220" height="200">
        <div 
          onClick={toggleNode}
          className="group w-full h-full flex flex-col items-center relative cursor-pointer pt-2"
        >
          <div className="z-20 relative transition-transform duration-300 group-hover:scale-110">
            <div className="w-14 h-14 rounded-full bg-slate-900 border-4 border-[#020617] shadow-lg flex items-center justify-center overflow-hidden">
               {nodeDatum.image ? (
                 <Image
                  width={50}
                  height={50}
                   src={nodeDatum.image}
                   alt={nodeDatum.name}
                   className="w-full h-full object-cover"
                 />
               ) : (
                 <User className="w-6 h-6 text-slate-500" />
               )}
            </div>
          </div>

          {/* --- CARD BODY --- */}
          <div className="w-full relative -mt-7 pt-9 pb-5 px-3 rounded-xl border border-slate-800 bg-slate-950/90 backdrop-blur-sm flex flex-col items-center shadow-xl transition-all duration-300 group-hover:border-violet-500/50 group-hover:shadow-[0_0_30px_-10px_rgba(139,92,246,0.3)]"> 
            {/* Name */}
            <h3 className="text-sm font-bold text-slate-100 truncate w-full text-center group-hover:text-violet-300 transition-colors">
              {nodeDatum.name || "Unknown User"}
            </h3>

            {/* Referral Code */}
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-1 mb-2 bg-slate-900/50 px-2 py-0.5 rounded border border-slate-800">
              <ShieldCheck className="w-3 h-3 text-emerald-500" />
              <span className="font-mono tracking-wider">
                {nodeDatum.referralCode || "NO-CODE"}
              </span>
            </div>

            {/* Directs Count */}
            {hasChildren && (
              <div className="flex items-center gap-1 text-[10px] font-medium text-blue-400">
                <Users className="w-3 h-3" />
                <span>{nodeDatum.children!.length} Directs</span>
              </div>
            )}

            {hasChildren && (
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-20">
                <div 
                  className={`
                    w-6 h-6 rounded-full flex items-center justify-center border border-slate-700 shadow-md transition-colors duration-200
                    ${isCollapsed ? "bg-violet-600 border-violet-500 text-white" : "bg-slate-900 text-slate-400 group-hover:text-white group-hover:border-slate-500"}
                  `}
                >
                  {isCollapsed ? (
                    <Plus className="w-3 h-3" />
                  ) : (
                    <Minus className="w-3 h-3" />
                  )}
                </div>
              </div>
            )}
          </div>

        </div>
      </foreignObject>
    </g>
  );
};
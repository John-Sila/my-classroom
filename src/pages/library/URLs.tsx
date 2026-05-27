import React, { useState } from 'react';
import {
  Globe,
  Terminal,
  Link2,
  Network,
  Cpu,
  Search,
  ShieldCheck,
  Hash,
  FolderTree,
  Server,
  Fingerprint,
  Layers,
  Minimize2,
  Maximize2,
  Activity,
  FileQuestion
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface EtymologyWord {
  word: string;
  literalName: string;
  reason: string;
  icon: React.ComponentType<any>;
}

interface URLPart {
  id: string;
  name: string;
  example: string;
  definition: string;
  technicalRole: string;
  colorClass: string;
  bgClass: string;
  textClass: string;
  icon: React.ComponentType<any>;
}

export const URLArchitectureDossier: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'anatomy' | 'etymology' | 'matrix'>('anatomy');
  const [highlightedPart, setHighlightedPart] = useState<string | null>(null);
  const [expandedDetail, setExpandedDetail] = useState<string | null>(null);

  const etymologies: EtymologyWord[] = [
    {
      word: "Uniform",
      literalName: "Standardized Syntax",
      reason: "Before URLs, different protocols used distinct address formats. 'Uniform' means every web resource follows the same structural blueprint, allowing a single browser to parse files, mail servers, and databases identically.",
      icon: Layers
    },
    {
      word: "Resource",
      literalName: "The Asset Object",
      reason: "A web address points to any digital asset: HTML pages, JPEG images, JSON data, MP4 videos, PDF files, or API endpoints.",
      icon: Cpu
    },
    {
      word: "Locator",
      literalName: "The Spatial Map",
      reason: "Unlike a 'Name' or 'Identifier', a 'Locator' explicitly states how to find a resource by providing a precise routing path across global server networks.",
      icon: Network
    }
  ];

  const urlParts: URLPart[] = [
    {
      id: "scheme",
      name: "Scheme (Protocol)",
      example: "https://",
      definition: "The communication protocol rules the browser must use to securely exchange data with the target host.",
      technicalRole: "Tells the client how to handle the data handshake (e.g., encrypted SSL/TLS for HTTPS vs unencrypted HTTP).",
      colorClass: "border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20",
      bgClass: "bg-emerald-500 text-white dark:text-slate-950",
      textClass: "text-emerald-600 dark:text-emerald-400",
      icon: ShieldCheck
    },
    {
      id: "subdomain",
      name: "Subdomain",
      example: "api.",
      definition: "A structural folder partition separating distinct application workloads under the main brand.",
      technicalRole: "Routes requests to segregated server clusters, staging fields, or microservice environments.",
      colorClass: "border-cyan-500/30 text-cyan-600 dark:text-cyan-400 bg-cyan-50/50 dark:bg-cyan-950/20",
      bgClass: "bg-cyan-500 text-white dark:text-slate-950",
      textClass: "text-cyan-600 dark:text-cyan-400",
      icon: Layers
    },
    {
      id: "domain",
      name: "Domain Name",
      example: "github",
      definition: "The human-readable title mapped to a concrete numerical internet location.",
      technicalRole: "Acts as a semantic alias for a raw IP address. Queried against DNS to find the actual server.",
      colorClass: "border-indigo-500/30 text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/20",
      bgClass: "bg-indigo-500 text-white dark:text-slate-950",
      textClass: "text-indigo-600 dark:text-indigo-400",
      icon: Server
    },
    {
      id: "tld",
      name: "Top-Level Domain (TLD)",
      example: ".com",
      definition: "The highest ranking suffix zone in the global DNS hierarchy.",
      technicalRole: "Managed by registries (ICANN) to categorize purpose (.org, .com) or geography (.uk, .jp).",
      colorClass: "border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/20",
      bgClass: "bg-blue-500 text-white dark:text-slate-950",
      textClass: "text-blue-600 dark:text-blue-400",
      icon: Globe
    },
    {
      id: "port",
      name: "Port Number",
      example: ":443",
      definition: "The explicit technical gate through which traffic enters the machine OS.",
      technicalRole: "Tells the host which internal application should listen. Defaults: 80 for HTTP, 443 for HTTPS.",
      colorClass: "border-amber-500/30 text-amber-600 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-950/20",
      bgClass: "bg-amber-500 text-white dark:text-slate-950",
      textClass: "text-amber-600 dark:text-amber-400",
      icon: Terminal
    },
    {
      id: "path",
      name: "Path Directory",
      example: "/v3/users/profile",
      definition: "The absolute directory route to the targeted asset inside remote host storage.",
      technicalRole: "Mirrors a file tree or hits an internal router, directing the file manager to fetch a specific asset.",
      colorClass: "border-fuchsia-500/30 text-fuchsia-600 dark:text-fuchsia-400 bg-fuchsia-50/50 dark:bg-fuchsia-950/20",
      bgClass: "bg-fuchsia-500 text-white dark:text-slate-950",
      textClass: "text-fuchsia-600 dark:text-fuchsia-400",
      icon: FolderTree
    },
    {
      id: "query",
      name: "Query Parameters",
      example: "?format=json&sort=desc",
      definition: "Key-value pairs that inject operational filters into the dynamic page pipeline.",
      technicalRole: "Passed to backend databases or loops to filter, order, or limit rows without redefining the path.",
      colorClass: "border-rose-500/30 text-rose-600 dark:text-rose-400 bg-rose-50/50 dark:bg-rose-950/20",
      bgClass: "bg-rose-500 text-white dark:text-slate-950",
      textClass: "text-rose-600 dark:text-rose-400",
      icon: Search
    },
    {
      id: "fragment",
      name: "Fragment Identifier (Anchor)",
      example: "#security-hash",
      definition: "A client-side marker indicating an exact bookmark coordinate on the loaded document.",
      technicalRole: "Instructs the browser to scroll to a specific ID. *Never* transmitted to the server.",
      colorClass: "border-violet-500/30 text-violet-600 dark:text-violet-400 bg-violet-50/50 dark:bg-violet-950/20",
      bgClass: "bg-violet-500 text-white dark:text-slate-950",
      textClass: "text-violet-600 dark:text-violet-400",
      icon: Hash
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-10 space-y-8 antialiased selection:bg-indigo-500/30 text-slate-600 dark:text-slate-300">
      
      {/* Header */}
      <div className="space-y-3 border-b border-slate-100 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400 font-mono text-xs tracking-widest uppercase">
          <Link2 className="w-4 h-4 animate-pulse" />
          Network Routing Intelligence File
        </div>
        
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
          Uniform Resource Locators
        </h1>
        <p className="text-sm md:text-base text-slate-400 dark:text-slate-500 max-w-2xl leading-relaxed">
          A URL is not a passive string; it is an explicit address map. By breaking it into standardized components, browsers execute DNS translation, port synchronization, and path navigation instantly across global networks.
        </p>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 pt-4">
          {[
            { id: 'anatomy', label: '8-Part Anatomy', icon: Fingerprint, color: 'indigo' },
            { id: 'etymology', label: 'Linguistic Breakdown', icon: FileQuestion, color: 'emerald' },
            { id: 'matrix', label: 'Technical Blueprint', icon: Network, color: 'gradient' }
          ].map((t) => {
            const Icon = t.icon;
            const active = activeTab === t.id;
            
            let activeClass = '';
            if (t.color === 'gradient') {
              activeClass = active ? 'bg-gradient-to-r from-indigo-600 to-emerald-600 text-white shadow-md font-bold' : '';
            } else {
              activeClass = active ? `bg-${t.color}-600 dark:bg-${t.color}-500 text-white shadow-md shadow-${t.color}-500/20 font-bold` : '';
            }

            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-medium transition-all ${
                  activeClass || 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* TAB 1: ANATOMY */}
        {activeTab === 'anatomy' && (
          <motion.div
            key="anatomy"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="space-y-8"
          >
            {/* Interactive URL */}
            <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="ml-2 font-semibold">INTERACTIVE DECONSTRUCTION</span>
                </div>
                <div className="text-[11px] font-mono bg-slate-100 dark:bg-slate-950 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800 text-slate-500">
                  Hover or Click Segments
                </div>
              </div>

              <div className="p-4 md:p-6 bg-slate-950 dark:bg-black rounded-xl overflow-x-auto border border-slate-900 flex flex-wrap items-center font-mono text-sm md:text-xl font-bold tracking-tight select-none">
                {urlParts.map((part) => {
                  const isSelected = highlightedPart === part.id;
                  return (
                    <span
                      key={part.id}
                      onMouseEnter={() => setHighlightedPart(part.id)}
                      onMouseLeave={() => setHighlightedPart(null)}
                      onClick={() => setExpandedDetail(expandedDetail === part.id ? null : part.id)}
                      className={`cursor-pointer transition-all duration-200 py-1.5 px-1 rounded-md mx-0.5 border border-transparent ${
                        isSelected ? 'bg-slate-800 text-white border-slate-700 scale-105 shadow-[0_4px_12px_rgba(0,0,0,0.5)]' : ''
                      }`}
                    >
                      <span className={isSelected ? part.textClass : 'text-slate-300 dark:text-slate-400'}>
                        {part.example}
                      </span>
                    </span>
                  );
                })}
              </div>
            </div>

            {/* 8 Cards */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-black tracking-tight text-slate-950 dark:text-white">The 8 Functional Boundaries</h3>
                <p className="text-xs text-slate-400 dark:text-slate-500">Every functional zone inside a standard network locator string.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {urlParts.map((part) => {
                  const isHovered = highlightedPart === part.id;
                  const isExpanded = expandedDetail === part.id;
                  return (
                    <motion.div
                      layout
                      key={part.id}
                      onMouseEnter={() => setHighlightedPart(part.id)}
                      onMouseLeave={() => setHighlightedPart(null)}
                      onClick={() => setExpandedDetail(isExpanded ? null : part.id)}
                      className={`rounded-2xl border p-4 bg-white/80 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-900/60 cursor-pointer transition-all flex flex-col justify-between group relative shadow-sm ${
                        isExpanded 
                          ? 'lg:col-span-2 border-slate-400 dark:border-slate-700 bg-white dark:bg-slate-900/60 shadow-md' 
                          : isHovered 
                            ? 'border-slate-300 dark:border-slate-700' 
                            : 'border-slate-100 dark:border-slate-900/80'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-500">
                            {part.id}
                          </span>
                          <part.icon className={`w-4 h-4 transition-transform ${isExpanded || isHovered ? 'scale-110 text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'}`} />
                        </div>
                        
                        <h4 className="text-sm font-bold text-slate-950 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-tight">
                          {part.name}
                        </h4>

                        <div className={`text-xs px-2 py-1 rounded font-mono w-fit bg-slate-950 text-slate-300 font-semibold border border-slate-900 ${part.textClass}`}>
                          {part.example}
                        </div>

                        <p className={`text-xs text-slate-500 dark:text-slate-400 leading-relaxed ${isExpanded ? 'block pt-1' : 'line-clamp-2'}`}>
                          {part.definition}
                        </p>

                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-[11px] bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 mt-2 space-y-1"
                          >
                            <div className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-[9px] font-mono text-indigo-500">Subsystem Process:</div>
                            <p className="leading-normal font-sans">{part.technicalRole}</p>
                          </motion.div>
                        )}
                      </div>

                      <div className="flex justify-end items-center mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/60">
                        {isExpanded ? (
                          <Minimize2 className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                        ) : (
                          <Maximize2 className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 group-hover:text-slate-500" />
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: ETYMOLOGY */}
        {activeTab === 'etymology' && (
          <motion.div
            key="etymology"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {etymologies.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 p-6 shadow-sm hover:border-emerald-500/20 transition-all group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 group-hover:border-emerald-500/30 transition-colors">
                        <Icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-slate-950 dark:text-white tracking-tight">{item.word}</h3>
                        <p className="text-[10px] font-mono text-slate-400 tracking-wider uppercase font-semibold">{item.literalName}</p>
                      </div>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 text-xs md:text-sm leading-relaxed">
                      {item.reason}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}

        {/* TAB 3: MATRIX */}
        {activeTab === 'matrix' && (
          <motion.div
            key="matrix"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 shadow-sm overflow-hidden"
          >
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20">
              <h3 className="text-xl font-bold text-slate-950 dark:text-white">Technical Matrix Blueprint</h3>
              <p className="text-xs text-slate-400 dark:text-slate-500">Comparing structural boundaries across data scopes and visibility rules.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-mono uppercase tracking-wider text-slate-500">
                    <th className="p-4 md:p-5 font-semibold">URL Boundary Section</th>
                    <th className="p-4 md:p-5 font-semibold text-indigo-600 dark:text-indigo-400">Processed By</th>
                    <th className="p-4 md:p-5 font-semibold text-emerald-600 dark:text-emerald-400">Transmitted Over Network</th>
                    <th className="p-4 md:p-5 font-semibold">Modifies State</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr className="bg-white dark:bg-transparent">
                    <td className="p-4 md:p-5 font-bold text-slate-950 dark:text-white">Scheme & TLD</td>
                    <td className="p-4 md:p-5 text-slate-600 dark:text-slate-300">Browser Network Engine & DNS Systems</td>
                    <td className="p-4 md:p-5 text-emerald-600 dark:text-emerald-400 font-medium">Yes (Handshake & Discovery)</td>
                    <td className="p-4 md:p-5 text-slate-500">Security Layer & Root Server</td>
                  </tr>
                  <tr className="bg-slate-50/30 dark:bg-transparent">
                    <td className="p-4 md:p-5 font-bold text-slate-950 dark:text-white">Domain & Subdomain</td>
                    <td className="p-4 md:p-5 text-slate-600 dark:text-slate-300">DNS Infrastructure & Host Proxies</td>
                    <td className="p-4 md:p-5 text-emerald-600 dark:text-emerald-400 font-medium">Yes (HTTP Host Header)</td>
                    <td className="p-4 md:p-5 text-slate-500">Selects Target IP Workspace</td>
                  </tr>
                  <tr className="bg-white dark:bg-transparent">
                    <td className="p-4 md:p-5 font-bold text-slate-950 dark:text-white">Path Directory</td>
                    <td className="p-4 md:p-5 text-slate-600 dark:text-slate-300">Target Server App Router</td>
                    <td className="p-4 md:p-5 text-emerald-600 dark:text-emerald-400 font-medium">Yes (Inbound Request)</td>
                    <td className="p-4 md:p-5 text-slate-500">Pinpoints File or Row</td>
                  </tr>
                  <tr className="bg-slate-50/30 dark:bg-transparent">
                    <td className="p-4 md:p-5 font-bold text-slate-950 dark:text-white">Query Parameters</td>
                    <td className="p-4 md:p-5 text-slate-600 dark:text-slate-300">Server Controllers / Frontend Scripts</td>
                    <td className="p-4 md:p-5 text-emerald-600 dark:text-emerald-400 font-medium">Yes (Appended to Request)</td>
                    <td className="p-4 md:p-5 text-slate-500">Filters, Orders, Limits Data</td>
                  </tr>
                  <tr className="bg-white dark:bg-transparent">
                    <td className="p-4 md:p-5 font-bold text-slate-950 dark:text-white">Fragment Anchor</td>
                    <td className="p-4 md:p-5 text-slate-600 dark:text-slate-300">Local Browser Window</td>
                    <td className="p-4 md:p-5 text-rose-600 dark:text-rose-500 font-medium">No (Client-only)</td>
                    <td className="p-4 md:p-5 text-slate-500">Controls Screen Position</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-5 bg-slate-50 dark:bg-slate-950 text-xs text-center text-slate-400 border-t border-slate-100 dark:border-slate-800">
              URL syntaxes are governed by RFC 3986. Characters outside alphanumeric must undergo percentage-encoding.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="flex items-center gap-1 text-xs font-mono text-slate-400 dark:text-slate-600 pt-4 border-t border-slate-200 dark:border-slate-800">
        <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-ping" />
        UNIFORM RESOURCE LOCATOR
      </footer>
    </div>
  );
};
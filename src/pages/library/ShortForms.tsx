import React, { useState, useMemo } from "react";
import {
  ChevronDown,
  Network,
  Cpu,
  Code2,
  Database,
  Shield,
  Monitor,
  MousePointer2,
  GitGraph,
  Server,
  Globe,
  Search,
  FolderOpen,
  FolderClosed,
  Columns,
  Layers,
  Fingerprint,
  Zap,
  X,
} from "lucide-react";

type Acronym = {
  term: string;
  meaning: string;
  desc?: string;
};

type TopicBlock = {
  title: string;
  icon: React.ReactNode;
  acronyms: Acronym[];
};

interface SectionProps extends TopicBlock {
  searchTerm: string;
  forceOpen: boolean | null;
}

function Section({ title, icon, acronyms, searchTerm, forceOpen }: SectionProps) {
  const [localOpen, setLocalOpen] = useState(false);

  // Auto-expand sections that contain valid search hits
  const filteredAcronyms = useMemo(() => {
    if (!searchTerm) return acronyms;
    const lower = searchTerm.toLowerCase();
    return acronyms.filter(
      (a) =>
        a.term.toLowerCase().includes(lower) ||
        a.meaning.toLowerCase().includes(lower) ||
        (a.desc && a.desc.toLowerCase().includes(lower))
    );
  }, [acronyms, searchTerm]);

  // Determine active presentation visibility flag state based on control priority matrix
  const isOpen = forceOpen !== null ? forceOpen : searchTerm ? filteredAcronyms.length > 0 : localOpen;

  if (filteredAcronyms.length === 0) return null;

  return (
    <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/40 bg-white dark:bg-slate-900/20 overflow-hidden shadow-sm transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-700/60">
      
      {/* Interactive Trigger Header Card Component node */}
      <button
        onClick={() => setLocalOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors duration-200 group"
      >
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-indigo-500 dark:bg-slate-950 dark:border-slate-800/50 dark:text-indigo-400 group-hover:scale-105 transition-transform duration-200 shrink-0">
            {React.cloneElement(icon as React.ReactElement, { className: "h-4 w-4 stroke-[2.2]" })}
          </div>
          <div className="text-left truncate">
            <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm tracking-tight">
              {title}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 pl-2">
          <span className="text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md text-slate-400 dark:text-slate-500">
            {filteredAcronyms.length} Units
          </span>
          <div className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-transparent transition-all duration-200">
            <ChevronDown 
              className={`h-3.5 w-3.5 text-slate-400 dark:text-slate-500 transition-transform duration-300 ease-out ${
                isOpen ? "transform rotate-180 text-indigo-500 dark:text-indigo-400" : ""
              }`} 
            />
          </div>
        </div>
      </button>

      {/* Accordion Smooth Dynamic Grid expansion wrapper layout */}
      <div 
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100 border-t border-slate-100 dark:border-slate-900/50" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-4 pt-3">
            <div className="overflow-hidden rounded-xl border border-slate-100 dark:border-slate-800/60 bg-slate-50/20 dark:bg-slate-950/10">
              <div className="w-full divide-y divide-slate-100 dark:divide-slate-800/40">
                {filteredAcronyms.map((a) => (
                  <div 
                    key={a.term} 
                    className="flex flex-col sm:flex-row sm:items-start p-4 gap-2 sm:gap-6 hover:bg-white dark:hover:bg-slate-900/20 transition-colors"
                  >
                    <div className="sm:w-1/4 shrink-0">
                      <span className="inline-block font-mono font-black text-slate-900 dark:text-white text-xs bg-slate-100 dark:bg-slate-800/60 border border-slate-200/30 dark:border-slate-700/30 px-2 py-1 rounded-md tracking-wide">
                        {a.term}
                      </span>
                    </div>
                    <div className="space-y-0.5 flex-1">
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-300 tracking-tight">
                        {a.meaning}
                      </p>
                      {a.desc && (
                        <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-normal">
                          {a.desc}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShortFormsReference() {
  const [searchTerm, setSearchTerm] = useState("");
  const [forceOpen, setForceOpen] = useState<boolean | null>(null);

  const data: TopicBlock[] = [
    {
      title: "Networking & Transport Architecture",
      icon: <Network />,
      acronyms: [
        { term: "LAN", meaning: "Local Area Network", desc: "High-speed network linking devices within a localized physical parameter like an office building or home environment." },
        { term: "WAN", meaning: "Wide Area Network", desc: "Telecommunications network spanning large geographical locations, often connecting multiple distinct LAN grids." },
        { term: "WLAN", meaning: "Wireless Local Area Network", desc: "A localized area network mapping system that utilizes high-frequency radio frequencies rather than physical cabling layers." },
        { term: "HTTP", meaning: "HyperText Transfer Protocol", desc: "The foundation structural standard protocol governing secure transaction exchanges across the World Wide Web layer." },
        { term: "HTTPS", meaning: "HyperText Transfer Protocol Secure", desc: "Standard HTTP requests paired inside encrypted Transport Layer Security (TLS) tunnel workflows for safety." },
        { term: "TCP/IP", meaning: "Transmission Control Protocol / Internet Protocol", desc: "The core suite of operational network transport communications paradigms that rule web transactions." },
        { term: "UDP", meaning: "User Datagram Protocol", desc: "A connectionless, lightweight alternative transport protocol prioritized for ultra-low latency streaming loops." },
        { term: "DNS", meaning: "Domain Name System", desc: "The global distributed index ledger database translating human-readable web naming structures directly into numeric IP addresses." },
        { term: "DHCP", meaning: "Dynamic Host Configuration Protocol", desc: "Network automation service framework designed to programmatically provision transient IP parameters to connecting clients." },
        { term: "MAC", meaning: "Media Access Control", desc: "A hardware-burned persistent unique identifier sequence permanently applied to physical network interface cards at manufacturing blocks." },
      ],
    },
    {
      title: "Compute & Core Processing Topologies",
      icon: <GitGraph />,
      acronyms: [
        { term: "CPU", meaning: "Central Processing Unit", desc: "The primary hardware silicon microchip engine that handles instructional interpretation and processing computations." },
        { term: "ALU", meaning: "Arithmetic Logic Unit", desc: "The dedicated logic processing block inside processors executing core mathematical and Boolean binary operations." },
        { term: "CU", meaning: "Control Unit", desc: "Processor internal system routing layer managing command retrieval patterns and orchestrating operational pipeline dataflow." },
        { term: "RAM", meaning: "Random Access Memory", desc: "Volatile physical operating storage providing high-throughput reading/writing vectors for active compute payloads." },
        { term: "ROM", meaning: "Read Only Memory", desc: "Non-volatile memory layer storing permanent base initialization code blocks securely across power state switches." },
        { term: "SSD", meaning: "Solid State Drive", desc: "High-speed non-volatile flash storage utilizing integrated circuit assemblies to retain memory blocks with near-zero mechanical search latency." },
        { term: "HDD", meaning: "Hard Disk Drive", desc: "Legacy legacy platter-based non-volatile mechanical magnetic storage arrays engineered for heavy density long-term retention blocks." },
        { term: "RISC", meaning: "Reduced Instruction Set Computer", desc: "Processor design methodology leveraging simple instructions executed in unified, rapid micro-cycles." },
        { term: "CISC", meaning: "Complex Instruction Set Computer", desc: "Hardware architectural approach maximizing instruction execution capability directly per single master multi-step macro command layout." },
      ],
    },
    {
      title: "Operating Systems & Kernel Runtimes",
      icon: <Cpu />,
      acronyms: [
        { term: "OS", meaning: "Operating System", desc: "The low-level master abstraction system managing underlying physical machinery registers and orchestrating application operations." },
        { term: "GUI", meaning: "Graphical User Interface", desc: "Visual user navigation canvas layout using windows, icon systems, indicators, and buttons rather than plain-text command strings." },
        { term: "CLI", meaning: "Command Line Interface", desc: "Text-based direct shell workspace where system operators issue commands sequentially directly to root handlers." },
        { term: "BIOS", meaning: "Basic Input Output System", desc: "Legacy low-level firmware architecture initializing core physical board registers during cold booting lifecycles." },
        { term: "UEFI", meaning: "Unified Extensible Firmware Interface", desc: "Modern processing board firmware layer replacing legacy BIOS with enhanced volume size bounds and security boot checking modules." },
        { term: "API", meaning: "Application Programming Interface", desc: "Contracted programmatic interface endpoints allowing separate decoupled software systems to securely converse." },
        { term: "SDK", meaning: "Software Development Kit", desc: "Comprehensive engineering tooling compilations containing libraries, documentation, and compiler dependencies for platform targeting." },
      ],
    },
    {
      title: "Security Engineering & Cryptography",
      icon: <Shield />,
      acronyms: [
        { term: "VPN", meaning: "Virtual Private Network", desc: "Encrypted virtual tunneling platform designed to mask device telemetry data and securely route active packets via remote nodes." },
        { term: "2FA", meaning: "Two-Factor Authentication", desc: "Identity confirmation matrix requiring secondary out-of-band verification steps alongside core authorization codes." },
        { term: "AES", meaning: "Advanced Encryption Standard", desc: "Symmetric cryptographic block cipher standard universally adopted globally to secure sensitive operational information files." },
        { term: "RSA", meaning: "Rivest-Shamir-Adleman", desc: "Asymmetric public-key algorithmic cipher leveraging prime factorization complexities to transfer keys over hostile environments." },
        { term: "DDoS", meaning: "Distributed Denial of Service", desc: "Malicious coordination attack utilizing botnets to saturate server resource pipelines with bogus requests until crash." },
        { term: "IDS", meaning: "Intrusion Detection System", desc: "Passive automated observation framework alerting security operators when abnormal signatures match active network traffic." },
        { term: "IPS", meaning: "Intrusion Prevention System", desc: "Active enforcement tool designed to inline monitor and drop hostile sessions matching threat vectors automatically." },
      ],
    },
    {
      title: "Database Engines & Storage Schemas",
      icon: <Database />,
      acronyms: [
        { term: "DBMS", meaning: "Database Management System", desc: "Software controller stack designed to cleanly host, modify, capture, and track information structures within persistent disks." },
        { term: "RDBMS", meaning: "Relational Database Management System", desc: "Data controller model enforcing relation constraints across strict schema structures with primary/foreign constraints." },
        { term: "SQL", meaning: "Structured Query Language", desc: "Domain-specific structural script framework written to handle interaction with normalized relation tables." },
        { term: "NoSQL", meaning: "Not Only SQL", desc: "Flexible, non-tabular database architecture prioritizing highly distributed document, key-value, or graph-oriented dynamic storage structures." },
        { term: "ACID", meaning: "Atomicity, Consistency, Isolation, Durability", desc: "Core validation property set guaranteeing absolute processing reliability across database transaction operations." },
        { term: "CRUD", meaning: "Create, Read, Update, Delete", desc: "The four basic primitive functional manipulation paradigms running across all structural persistent database fields." },
      ],
    },
    {
      title: "Web Technologies & Serialization Formats",
      icon: <Globe />,
      acronyms: [
        { term: "HTML", meaning: "HyperText Markup Language", desc: "The foundational syntax framework providing document structure layers inside standard web rendering interfaces." },
        { term: "CSS", meaning: "Cascading Style Sheets", desc: "Design style layout rules engine used to configure layout, color definitions, and typographic parameters across HTML DOM states." },
        { term: "JSON", meaning: "JavaScript Object Notation", desc: "Ultra-lightweight textual serialization format utilized to exchange complex data matrices as flat key-value pairs." },
        { term: "XML", meaning: "Extensible Markup Language", desc: "Configurable tag-based descriptive serialization structure optimized for schema validation across enterprise service architectures." },
        { term: "DOM", meaning: "Document Object Model", desc: "Object-oriented tree mapping node translation of active browser documents created by rendering layouts to facilitate programmatic script controls." },
        { term: "AJAX", meaning: "Asynchronous JavaScript and XML", desc: "Web architecture style allowing dynamic, out-of-band partial client screen updates without full document reloading patterns." },
      ],
    },
    {
      title: "Cloud Orchestration & Peripheral Frameworks",
      icon: <Server />,
      acronyms: [
        { term: "SaaS", meaning: "Software as a Service", desc: "Cloud service delivery model distributing ready-to-run software products over browsers under licensing models." },
        { term: "PaaS", meaning: "Platform as a Service", desc: "Cloud framework offering isolated infrastructure runtimes, operating platforms, and deployment lifecycles to engineers directly." },
        { term: "IaaS", meaning: "Infrastructure as a Service", desc: "Virtualized bare compute instances, network controls, and raw dynamic disk allocations provisioned directly over APIs." },
        { term: "IoT", meaning: "Internet of Things", desc: "Networked telemetry physical computing objects tracking and transmitting environmental parameters via specialized light compute controllers." },
        { term: "CI/CD", meaning: "Continuous Integration / Continuous Deployment", desc: "Automated pipeline suite managing codebase code regression test builds and runtime environment synchronization tasks on merge hooks." },
        { term: "VPC", meaning: "Virtual Private Cloud", desc: "Isolated logical virtual network context provisioned independently inside multitenant cloud environments to protect cloud footprints." },
      ],
    },
    {
      title: "Hardware Channels & Bus Architecture",
      icon: <Monitor />,
      acronyms: [
        { term: "USB", meaning: "Universal Serial Bus", desc: "Standard plug-and-play communication interface interface specification controlling data transactions and device charging currents." },
        { term: "GPU", meaning: "Graphics Processing Unit", desc: "Massively parallel hardware processor block engineered to run high-density graphics transformations or artificial intelligence matrix loads." },
        { term: "BIOS", meaning: "Basic Input/Output System", desc: "Firmware code layer running hardware checks and handling primary peripheral handshake controls before OS boot hands off." },
        { term: "HDMI", meaning: "High-Definition Multimedia Interface", desc: "Digital audio/video interface standard transferring uncompressed pixel streams and audio feeds to digital display panels." },
        { term: "PCIe", meaning: "Peripheral Component Interconnect Express", desc: "Ultra-high throughput structural mother-board bus slot architecture directly connecting solid states and graphic boards to main chips." },
      ],
    },
    {
      title: "Storage Metrics & Memory Registers",
      icon: <Columns />,
      acronyms: [
        { term: "b", meaning: "Bit", desc: "The elemental single unit parameter of compute binary calculation states, taking a value of either 0 or 1." },
        { term: "B", meaning: "Byte", desc: "A contiguous sequence of 8 bits representing a singular text character entity across storage hardware components." },
        { term: "KB", meaning: "Kilobyte", desc: "Standard storage block sizing value representing exactly 1,024 bytes of information data matrix files." },
        { term: "MB", meaning: "Megabyte", desc: "Storage metric level mapping 1,024 Kilobytes or exactly 1,048,576 bytes of functional space." },
        { term: "GB", meaning: "Gigabyte", desc: "High density computation data metric representing 1,024 Megabytes of physical media allocation tracking bounds." },
        { term: "TB", meaning: "Terabyte", desc: "Massive scale industrial scale memory tier capturing 1,024 Gigabytes of active disk blocks." },
      ],
    }
  ];

  // Perform total index search matches across nested arrays
  const searchMatchCount = useMemo(() => {
    if (!searchTerm) return 0;
    let count = 0;
    const lower = searchTerm.toLowerCase();
    data.forEach((s) => {
      s.acronyms.forEach((a) => {
        if (a.term.toLowerCase().includes(lower) || a.meaning.toLowerCase().includes(lower)) count++;
      });
    });
    return count;
  }, [searchTerm]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 space-y-8 antialiased selection:bg-indigo-500/10 text-slate-600 dark:text-slate-300">
      
      {/* Module Title Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/60 dark:border-slate-800/60 pb-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight sm:text-3xl">
            System Abbreviation Index
          </h1>
          <p className="text-xs text-slate-400 dark:text-slate-500 max-w-xl leading-relaxed font-medium">
            Core reference matrix tracking architecture shorthand keywords across security vectors, structural network nodes, and computing components.
          </p>
        </div>

        {/* Global Expand/Collapse Tool Action Switches */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={() => setForceOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 text-[11px] font-bold uppercase tracking-wider hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-500 dark:text-slate-400 transition-all"
          >
            <FolderOpen className="w-3.5 h-3.5 text-indigo-500" />
            Expand All
          </button>
          <button
            onClick={() => {
              setForceOpen(false);
              // Small frame release timeout to let rendering threads process reset
              setTimeout(() => setForceOpen(null), 100);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 text-[11px] font-bold uppercase tracking-wider hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-500 dark:text-slate-400 transition-all"
          >
            <FolderClosed className="w-3.5 h-3.5" />
            Collapse
          </button>
        </div>
      </div>

      {/* Lookup Toolbar Section */}
      <div className="relative">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-slate-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setForceOpen(null);
            setSearchTerm(e.target.value);
          }}
          placeholder="Lookup short form descriptors (e.g., HTTPS, ACID, UEFI)..."
          className="w-full pl-11 pr-32 py-3.5 rounded-2xl border border-slate-200/80 bg-white text-xs font-medium tracking-wide text-slate-900 outline-none shadow-sm transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400/5"
        />
        {searchTerm && (
          <div className="absolute inset-y-2 right-2 flex items-center gap-2 bg-slate-50 dark:bg-slate-950 px-3 rounded-xl border border-slate-200/40 dark:border-slate-800/40">
            <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 animate-fadeIn">
              {searchMatchCount} Matches
            </span>
            <button 
              onClick={() => setSearchTerm("")} 
              className="p-0.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>

      {/* Dynamic Accordion Group Container Stack */}
      <div className="space-y-3.5">
        {data.map((section) => (
          <Section 
            key={section.title} 
            {...section} 
            searchTerm={searchTerm} 
            forceOpen={forceOpen} 
          />
        ))}
      </div>
    </div>
  );
}
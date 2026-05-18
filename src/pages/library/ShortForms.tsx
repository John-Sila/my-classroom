import React, { useState } from "react";
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
} from "lucide-react";

type Acronym = {
  term: string;
  meaning: string;
};

type TopicBlock = {
  title: string;
  icon: React.ReactNode;
  acronyms: Acronym[];
};

function Section({ title, icon, acronyms }: TopicBlock) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/30 overflow-hidden shadow-sm transition-all duration-300 hover:border-slate-300/80 dark:hover:border-slate-700/80">
      {/* Interactive Trigger Header */}
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-slate-50/60 dark:hover:bg-slate-900/40 transition-colors duration-200 group"
      >
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-indigo-500 dark:bg-slate-950 dark:border-slate-800/60 dark:text-indigo-400 group-hover:scale-105 transition-transform duration-200">
            {React.cloneElement(icon as React.ReactElement, { className: "h-4 w-4 stroke-[2.2]" })}
          </div>
          <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm tracking-tight text-left">
            {title}
          </h3>
        </div>

        <div className="p-1.5 rounded-lg bg-slate-50/50 group-hover:bg-slate-100 dark:bg-slate-950/40 dark:group-hover:bg-slate-950/80 border border-transparent group-hover:border-slate-200/40 dark:group-hover:border-slate-800/40 transition-all duration-200">
          <ChevronDown 
            className={`h-4 w-4 text-slate-400 dark:text-slate-500 transition-transform duration-300 ease-out ${
              open ? "transform rotate-180 text-indigo-500 dark:text-indigo-400" : ""
            }`} 
          />
        </div>
      </button>

      {/* Pure Tailwind CSS Animated Dropdown Height Container */}
      <div 
        className={`grid transition-all duration-300 ease-in-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5 pt-1 animate-fadeIn">
            <div className="overflow-hidden rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-950/20">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="bg-slate-50/70 dark:bg-slate-950/60 border-b border-slate-100 dark:border-slate-800">
                    <th className="px-4 py-3 font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 w-1/4">
                      Acronym
                    </th>
                    <th className="px-4 py-3 font-semibold tracking-tight text-slate-500 dark:text-slate-400">
                      Meaning
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {acronyms.map((a) => (
                    <tr
                      key={a.term}
                      className="hover:bg-slate-50/40 dark:hover:bg-slate-900/10 transition-colors duration-150"
                    >
                      <td className="px-4 py-3 font-mono font-bold text-slate-900 dark:text-white whitespace-nowrap text-[13px]">
                        {a.term}
                      </td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300 text-[13px] font-medium">
                        {a.meaning}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShortFormsReference() {
  const data: TopicBlock[] = [
    {
      title: "Networking Stack",
      icon: <Network />,
      acronyms: [
        { term: "LAN", meaning: "Local Area Network" },
        { term: "WAN", meaning: "Wide Area Network" },
        { term: "WLAN", meaning: "Wireless LAN" },
        { term: "WWW", meaning: "World Wide Web" },
        { term: "URL", meaning: "Uniform Resource Locator" },
        { term: "HTTP", meaning: "HyperText Transfer Protocol" },
        { term: "HTTPS", meaning: "Secure HTTP" },
        { term: "IP", meaning: "Internet Protocol" },
        { term: "DNS", meaning: "Domain Name System" },
        { term: "ISP", meaning: "Internet Service Provider" },
      ],
    },
    {
      title: "Data Flow & Processing Architecture",
      icon: <GitGraph />,
      acronyms: [
        { term: "CPU", meaning: "Central Processing Unit" },
        { term: "CU", meaning: "Control Unit" },
        { term: "ALU", meaning: "Arithmetic Logic Unit" },
        { term: "RAM", meaning: "Random Access Memory" },
        { term: "ROM", meaning: "Read Only Memory" },
        { term: "HDD", meaning: "Hard Disk Drive" },
        { term: "SSD", meaning: "Solid State Drive" },
      ],
    },
    {
      title: "Operating Systems & Kernel Runtimes",
      icon: <Cpu />,
      acronyms: [
        { term: "OS", meaning: "Operating System" },
        { term: "GUI", meaning: "Graphical User Interface" },
        { term: "CLI", meaning: "Command Line Interface" },
        { term: "BIOS", meaning: "Basic Input Output System" },
      ],
    },
    {
      title: "Security & Threat Mitigation",
      icon: <Shield />,
      acronyms: [
        { term: "VPN", meaning: "Virtual Private Network" },
        { term: "2FA", meaning: "Two Factor Authentication" },
        { term: "IDS", meaning: "Intrusion Detection System" },
        { term: "DDoS", meaning: "Distributed Denial of Service" },
      ],
    },
    {
      title: "Software Development Environments",
      icon: <Code2 />,
      acronyms: [
        { term: "IDE", meaning: "Integrated Development Environment" },
        { term: "API", meaning: "Application Programming Interface" },
        { term: "SDK", meaning: "Software Development Kit" },
        { term: "DBMS", meaning: "Database Management System" },
        { term: "SQL", meaning: "Structured Query Language" },
      ],
    },
    {
      title: "Hardware Platforms & Controllers",
      icon: <Monitor />,
      acronyms: [
        { term: "I/O", meaning: "Input/Output" },
        { term: "USB", meaning: "Universal Serial Bus" },
        { term: "GPU", meaning: "Graphics Processing Unit" },
      ],
    },
    {
      title: "Web Services & Serialization Layouts",
      icon: <Globe />,
      acronyms: [
        { term: "HTML", meaning: "HyperText Markup Language" },
        { term: "CSS", meaning: "Cascading Style Sheets" },
        { term: "JSON", meaning: "JavaScript Object Notation" },
        { term: "XML", meaning: "Extensible Markup Language" },
      ],
    },
    {
      title: "Storage Registers & Memory Units",
      icon: <Database />,
      acronyms: [
        { term: "b", meaning: "Bit" },
        { term: "B", meaning: "Byte" },
        { term: "KB", meaning: "Kilobyte" },
        { term: "MB", meaning: "Megabyte" },
        { term: "GB", meaning: "Gigabyte" },
        { term: "TB", meaning: "Terabyte" },
      ],
    },
    {
      title: "Input Mechanisms",
      icon: <MousePointer2 />,
      acronyms: [
        { term: "OCR", meaning: "Optical Character Recognition" },
        { term: "MIC", meaning: "Microphone (shorthand descriptor)" },
        { term: "KBD", meaning: "Keyboard (hardware shorthand)" },
      ],
    },
    {
      title: "Peripheral Infrastructure & Orchestration",
      icon: <Server />,
      acronyms: [
        { term: "IoT", meaning: "Internet of Things" },
        { term: "SaaS", meaning: "Software as a Service" },
        { term: "PaaS", meaning: "Platform as a Service" },
        { term: "IaaS", meaning: "Infrastructure as a Service" },
      ],
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12 space-y-10 antialiased selection:bg-indigo-500/10 text-slate-600 dark:text-slate-300">
      
      {/* Elegant Module Header */}
      <div className="space-y-3 text-left border-b border-slate-100 dark:border-slate-800 pb-6">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight sm:text-4xl">
          Computing Short Forms & Acronyms
        </h1>
        <p className="text-sm text-slate-400 dark:text-slate-500 max-w-2xl leading-relaxed">
          A clean, structured indexing system covering essential modern tech acronyms across hardware execution registers, security engineering stacks, and network models.
        </p>
      </div>

      {/* Accordion Layout */}
      <div className="space-y-3.5">
        {data.map((section) => (
          <Section key={section.title} {...section} />
        ))}
      </div>
    </div>
  );
}
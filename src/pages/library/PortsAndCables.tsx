import React, { useState } from "react";
import { 
  Monitor, 
  Tv, 
  AudioLines, 
  Network, 
  Battery, 
  Layers2, 
  Plug, 
  Activity, 
  Info, 
  Cpu,
  HardDriveDownload,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function PortsAndCablesTopic() {
  const [activeTab, setActiveTab] = useState<"overview" | "video" | "data">("overview");

  // Example port blocks; you can add more as needed
  const ports = {
    overview: [
      {
        label: "Video Ports",
        desc: "Transmit display signals from a computer or device to a monitor, projector, or TV. Modern ports like HDMI and DisplayPort carry both video and audio, while older VGA is video‑only analog.",
        icon: Monitor,
      },
      {
        label: "Audio Ports",
        desc: "Carry audio signals to headphones, speakers, or microphones. Common examples include 3.5 mm audio jacks and optical‑audio (TOSLINK) connectors.",
        icon: AudioLines,
      },
      {
        label: "Data & Network Ports",
        desc: "Used for transferring data between devices or connecting to a network. Includes USB‑A/C, Ethernet (RJ45), and Thunderbolt, each with different speeds and power‑delivery capabilities.",
        icon: Network,
      },
      {
        label: "Storage & Internal Ports",
        desc: "Internal connectors such as SATA and M.2 manage high‑speed data transfer between storage drives and the motherboard, often used for SSDs and HDDs.",
        icon: HardDriveDownload,
      },
      {
        label: "Power Ports",
        desc: "Physically carry electrical power into the system or peripheral devices. Barrel jacks, PCIe power cables, and standard AC inlets all fall into this category.",
        icon: Battery,
      },
    ],
    video: [
      {
        name: "VGA (Video Graphics Array)",
        long: "Video Graphics Array",
        tech: "Analog Video",
        img: "https://imari.co.ke/wp-content/uploads/2025/02/vga-20m.webp",
        desc: "Legacy blue connector used for analog video signals to monitors and projectors. Supports lower resolutions and refresh rates compared to modern digital ports.",
      },
      {
        name: "DVI (Digital Visual Interface)",
        long: "Digital Visual Interface",
        tech: "Digital Video",
        img: "https://www.cablesnmore.com/content/images/thumbs/001/0014638_dvi-d-dual-link-cable-3-meter-984-ft.jpeg",
        desc: "Digital video connector capable of high resolutions; variants support DVI‑D (digital only), DVI‑I (digital + analog), and DVI‑A (analog only).",
      },
      {
        name: "HDMI (High‑Definition Multimedia Interface)",
        long: "High‑Definition Multimedia Interface",
        tech: "Digital Audio/Video",
        img: "https://www.techly.com/media/catalog/product/cache/4/image/600x/9df78eab33525d08d6e5fb8d27136e95/9/2/9270685296f77c326d7391ae29aa350ece34826c_cavo_hdmi_high_speed_2.0_a_a_m_m_2m_nero_techly_icoc_hdmi2_4_020t_52524_1_2.jpg",
        desc: "Widely used digital port that carries both video and audio over a single cable. Supports HD, 4K, and even 8K depending on the HDMI version and cable quality.",
      },
      {
        name: "DisplayPort",
        long: "DisplayPort",
        tech: "Digital Audio/Video",
        img: "https://www.unigraf.fi/app/uploads/2020/03/What-to-test-in-DisplayPort-Featured-Image.webp",
        desc: "High‑performance digital display interface optimized for high resolution and refresh rates, commonly used in gaming monitors and workstation‑class displays.",
      },
      {
        name: "Mini DisplayPort",
        long: "Mini DisplayPort",
        tech: "Digital Audio/Video",
        img: "https://ke.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/22/6765523/1.jpg?8763",
        desc: "Smaller version of DisplayPort typically found on laptops and compact devices, with identical protocol and performance characteristics.",
      },
    ],
    data: [
      {
        name: "USB Type‑A (USB 2.0 / 3.0)",
        long: "Universal Serial Bus Type‑A",
        tech: "Data + Power",
        img: "https://m.media-amazon.com/images/I/5190uz4tnkL.jpg",
        desc: "Rectangular USB connector used for keyboards, mice, flash drives, and many peripherals. Supports moderate data speeds and device‑side charging.",
      },
      {
        name: "USB Type‑C (USB‑C)",
        long: "Universal Serial Bus Type‑C",
        tech: "Data + Power + Video",
        img: "https://media.startech.com/cms/products/gallery_large/rusb2cc2mb.main.jpg",
        desc: "Reversible, compact connector that supports high‑speed data (USB 3.x / 4), USB Power Delivery, and DisplayPort/Thunderbolt tunneling over a single port.",
      },
      {
        name: "Ethernet (RJ45)",
        long: "Registered Jack 45 (Ethernet)",
        tech: "Wired Network",
        img: "https://vivahtech.co.ke/wp-content/uploads/2024/10/UGREEN-1m-Ethernet-Cable-Cat6-UTP-1-1.webp",
        desc: "Standard network port used for wired LAN connections. Supports 100 Mbps, 1 Gbps, and higher speeds depending on cable category and hardware.",
      },
      {
        name: "SATA (Serial ATA)",
        long: "Serial Advanced Technology Attachment",
        tech: "Internal Storage",
        img: "https://ph.element14.com/productimages/large/en_GB/2254534-40.jpg",
        desc: "Internal connector used for hard drives and SSDs; connects drives to the motherboard and supports high‑speed data transfer for storage operations.",
      },
      {
        name: "M.2 Slot",
        long: "M.2 Form Factor Connector",
        tech: "Internal NVMe Storage",
        img: "https://cdn.prod.website-files.com/65119b7e9b7e7af61a2eddd4/6518183c65b3c61090808995_4_f7be264b-b408-4770-9041-ef5eb1a7826c.png",
        desc: "Compact internal slot used for NVMe SSDs, offering extremely high throughput via PCIe lanes directly from the CPU/chipset.",
      },
      {
        name: "3.5 mm Audio Jack",
        long: "3.5 mm Audio Connector",
        tech: "Analog Audio",
        img: "https://www.unitek-hk.com/cdn/shop/products/Y-C922ABK_01_Front.jpg?v=1646357649",
        desc: "Ubiquitous round jack used for headphones, speakers, and microphone inputs. Carries analog audio signals at consumer‑grade quality.",
      },
      {
        name: "DC Power Barrel Jack",
        long: "Direct Current Barrel Connector",
        tech: "Power",
        img: "https://res.cloudinary.com/dqmu88gym/image/upload/v1727177038/wqzlxaxm5ut3gxokbl20.jpg",
        desc: "Cylindrical plug used to feed DC power into small devices such as routers, monitors, or external drives.",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans p-4 md:p-8 selection:bg-indigo-500/20 overflow-x-hidden antialiased transition-colors duration-300">
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-indigo-500/[0.015] dark:bg-indigo-500/[0.03] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-500/[0.015] dark:bg-sky-500/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <header className="border border-slate-200 dark:border-slate-900 rounded-3xl p-6 md:p-8 bg-white/60 dark:bg-slate-900/20 backdrop-blur-md shadow-sm dark:shadow-none relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-[0.03] dark:opacity-10">
            <Activity className="w-24 h-24 text-slate-900 dark:text-slate-400" />
          </div>

          <div className="flex items-center gap-2.5 text-indigo-600 dark:text-indigo-400 font-mono text-xs tracking-widest uppercase mb-3">
            <Plug className="w-4 h-4" />
            Computer Ports & Cables
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-200 dark:to-slate-400">
            Ports & Cables: The Data‑Highway Backbones
          </h1>

          <div className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
            <p>
              Computer ports and their associated cables are the physical “doors” and “roads” through which information flows between devices. They carry data, audio, video, and power, enabling keyboards, monitors, storage drives, and networks to connect to the system.
            </p>
            <p>
              Different ports handle different data types (A, B, C), and their speeds range from a few megabits per second up to tens of gigabits per second, depending on the standard, version, and cable quality. These interfaces ultimately link every peripheral into the unified computer ecosystem.
            </p>
          </div>

          {/* Tabs */}
            <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-slate-100 dark:border-slate-900">
            <button
                onClick={() => setActiveTab("overview")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-xs tracking-wider uppercase transition-all ${
                activeTab === "overview"
                    ? "bg-indigo-600 dark:bg-indigo-500 text-white dark:text-slate-950 shadow-md shadow-indigo-500/10 dark:shadow-indigo-500/20 font-bold scale-105"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white"
                }`}
            >
                <Info className="w-4 h-4" /> Overview
            </button>
            <button
                onClick={() => setActiveTab("video")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-xs tracking-wider uppercase transition-all ${
                activeTab === "video"
                    ? "bg-amber-600 dark:bg-amber-500 text-white dark:text-slate-950 shadow-md shadow-amber-500/10 dark:shadow-amber-500/20 font-bold scale-105"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white"
                }`}
            >
                <Monitor className="w-4 h-4" /> Video & Audio
            </button>
            <button
                onClick={() => setActiveTab("data")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-xs tracking-wider uppercase transition-all ${
                activeTab === "data"
                    ? "bg-emerald-600 dark:bg-emerald-500 text-white dark:text-slate-950 shadow-md shadow-emerald-500/10 dark:shadow-emerald-500/20 font-bold scale-105"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white"
                }`}
            >
                <Network className="w-4 h-4" /> Data & Power
            </button>
            </div>

        </header>

        <AnimatePresence mode="wait">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {ports.overview.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <div
                      key={cat.label}
                      className="p-5 rounded-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/20 shadow-sm space-y-2"
                    >
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-900 text-indigo-600">
                          <Icon className="w-4 h-4" />
                        </div>
                        <h3 className="text-sm font-bold text-slate-950 dark:text-white">{cat.label}</h3>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">{cat.desc}</p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* TAB 2: VIDEO & AUDIO */}
          {activeTab === "video" && (
            <motion.div
              key="video"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <p className="text-sm text-slate-500">
                Video and audio ports connect your computer to displays, projectors, speakers, and headsets. Newer standards like HDMI and DisplayPort combine high‑definition video and multi‑channel audio into single‑cable solutions.
              </p>
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                {ports.video.map((p) => (
                  <div
                    key={p.name}
                    className="flex flex-col rounded-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/20 shadow-sm overflow-hidden"
                  >
                    <img
                      src={p.img}
                      alt={p.name}
                      className="h-32 w-full object-cover"
                    />
                    <div className="p-4 space-y-2">
                      <h3 className="text-sm font-bold text-slate-950 dark:text-white">
                        {p.name}
                      </h3>
                      <span className="text-xs uppercase font-black text-indigo-600 dark:text-indigo-400 tracking-wider block">
                        {p.long}
                      </span>
                      <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400 tracking-wider block">
                        {p.tech}
                      </span>
                      <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 3: DATA & POWER */}
          {activeTab === "data" && (
            <motion.div
              key="data"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <p className="text-sm text-slate-500">
                Data and power ports distribute information and electrical energy across the system. Speeds range from tens of Mbps (older LAN) to multiple Gbps (USB‑C / Thunderbolt / NVMe), with compatible cables crucial for peak performance.
              </p>
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                {ports.data.map((p) => (
                  <div
                    key={p.name}
                    className="flex flex-col rounded-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/20 shadow-sm overflow-hidden"
                  >
                    <img
                      src={p.img}
                      alt={p.name}
                      className="h-32 w-full object-cover"
                    />
                    <div className="p-4 space-y-2">
                      <h3 className="text-sm font-bold text-slate-950 dark:text-white">
                        {p.name}
                      </h3>
                      <span className="text-xs uppercase font-black text-emerald-600 dark:text-emerald-400 tracking-wider block">
                        {p.long}
                      </span>
                      <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400 tracking-wider block">
                        {p.tech}
                      </span>
                      <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Summary banner */}
        <section className="p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-900 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950/50 relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 p-6 text-slate-100 dark:text-slate-900 pointer-events-none">
            <Cpu className="h-24 w-24 stroke-[3]" />
          </div>
          <div className="max-w-3xl relative z-10 space-y-2">
            <h3 className="text-sm font-bold tracking-wider font-mono uppercase text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
              <Layers2 className="w-4 h-4" />
              Ports & Cables Summary
            </h3>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Ports and their companion cables form the hardware backbone that links input devices, displays, storage, and networks into a single coherent system. From simple audio jacks to ultra‑fast USB‑C and NVMe interfaces, the right connection type and speed are critical for reliable, high‑performance data flow.
            </p>
          </div>
        </section>

        
        <footer className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400 dark:text-slate-600 pt-4 border-t border-slate-200 dark:border-slate-900">
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping mr-1" />
            CABLES & PORTS
          </div>
        </footer>

      </div>
    </div>
  );
}
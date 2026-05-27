import React, { useState } from "react";
import {
  Monitor,
  AudioLines,
  Network,
  Battery,
  Layers2,
  Plug,
  Info,
  Cpu,
  HardDriveDownload,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function PortsAndCablesTopic() {
  const [activeTab, setActiveTab] = useState<"overview" | "video" | "data">("overview");

  const ports = {
    overview: [
      {
        label: "Video Ports",
        desc: "Transmit display signals to monitors, projectors, or TVs. HDMI and DisplayPort carry video + audio; VGA is video-only analog.",
        icon: Monitor,
      },
      {
        label: "Audio Ports",
        desc: "Carry audio to headphones, speakers, or microphones. Examples: 3.5 mm jacks and optical-audio (TOSLINK).",
        icon: AudioLines,
      },
      {
        label: "Data & Network Ports",
        desc: "Transfer data between devices or connect to networks. Includes USB-A/C, Ethernet (RJ45), Thunderbolt.",
        icon: Network,
      },
      {
        label: "Storage & Internal Ports",
        desc: "Internal connectors like SATA and M.2 manage high-speed data between storage drives and motherboard.",
        icon: HardDriveDownload,
      },
      {
        label: "Power Ports",
        desc: "Carry electrical power into the system or peripherals. Barrel jacks, PCIe power cables, AC inlets.",
        icon: Battery,
      },
    ],
    video: [
      {
        name: "VGA",
        long: "Video Graphics Array",
        tech: "Analog Video",
        img: "https://imari.co.ke/wp-content/uploads/2025/02/vga-20m.webp",
        desc: "Legacy blue connector for analog video to monitors/projectors. Lower resolutions vs modern digital ports.",
      },
      {
        name: "DVI",
        long: "Digital Visual Interface",
        tech: "Digital Video",
        img: "https://www.cablesnmore.com/content/images/thumbs/001/0014638_dvi-d-dual-link-cable-3-meter-984-ft.jpeg",
        desc: "Digital video connector for high resolutions. Variants: DVI-D (digital), DVI-I (digital+analog), DVI-A (analog).",
      },
      {
        name: "HDMI",
        long: "High-Definition Multimedia Interface",
        tech: "Digital Audio/Video",
        img: "https://www.techly.com/media/catalog/product/cache/4/image/600x/9df78eab33525d08d6e5fb8d27136e95/9/2/9270685296f77c326d7391ae29aa350ece34826c_cavo_hdmi_high_speed_2.0_a_a_m_m_2m_nero_techly_icoc_hdmi2_4_020t_52524_1_2.jpg",
        desc: "Widely used digital port carrying video + audio. Supports HD, 4K, 8K depending on version and cable.",
      },
      {
        name: "DisplayPort",
        long: "DisplayPort",
        tech: "Digital Audio/Video",
        img: "https://www.unigraf.fi/app/uploads/2020/03/What-to-test-in-DisplayPort-Featured-Image.webp",
        desc: "High-performance interface for high resolution and refresh rates. Common in gaming/workstation displays.",
      },
      {
        name: "Mini DisplayPort",
        long: "Mini DisplayPort",
        tech: "Digital Audio/Video",
        img: "https://ke.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/22/6765523/1.jpg?8763",
        desc: "Smaller DisplayPort version on laptops/compact devices with identical protocol and performance.",
      },
    ],
    data: [
      {
        name: "USB Type-A",
        long: "Universal Serial Bus Type-A",
        tech: "Data + Power",
        img: "https://m.media-amazon.com/images/I/5190uz4tnkL.jpg",
        desc: "Rectangular USB for keyboards, mice, flash drives. Moderate speeds and device-side charging.",
      },
      {
        name: "USB Type-C",
        long: "Universal Serial Bus Type-C",
        tech: "Data + Power + Video",
        img: "https://media.startech.com/cms/products/gallery_large/rusb2cc2mb.main.jpg",
        desc: "Reversible connector supporting USB 3.x/4, Power Delivery, DisplayPort/Thunderbolt tunneling.",
      },
      {
        name: "Ethernet (RJ45)",
        long: "Registered Jack 45",
        tech: "Wired Network",
        img: "https://vivahtech.co.ke/wp-content/uploads/2024/10/UGREEN-1m-Ethernet-Cable-Cat6-UTP-1-1.webp",
        desc: "Standard wired LAN port. Supports 100 Mbps, 1 Gbps+, depending on cable category.",
      },
      {
        name: "SATA",
        long: "Serial Advanced Technology Attachment",
        tech: "Internal Storage",
        img: "https://ph.element14.com/productimages/large/en_GB/2254534-40.jpg",
        desc: "Internal connector for HDDs/SSDs. Connects drives to motherboard for high-speed storage transfer.",
      },
      {
        name: "M.2 Slot",
        long: "M.2 Form Factor Connector",
        tech: "Internal NVMe Storage",
        img: "https://cdn.prod.website-files.com/65119b7e9b7e7af61a2eddd4/6518183c65b3c61090808995_4_f7be264b-b408-4770-9041-ef5eb1a7826c.png",
        desc: "Compact slot for NVMe SSDs with extremely high throughput via PCIe lanes.",
      },
      {
        name: "3.5 mm Audio Jack",
        long: "3.5 mm Audio Connector",
        tech: "Analog Audio",
        img: "https://www.unitek-hk.com/cdn/shop/products/Y-C922ABK_01_Front.jpg?v=1646357649",
        desc: "Round jack for headphones, speakers, mic inputs. Carries analog audio at consumer quality.",
      },
      {
        name: "DC Barrel Jack",
        long: "Direct Current Barrel Connector",
        tech: "Power",
        img: "https://res.cloudinary.com/dqmu88gym/image/upload/v1727177038/wqzlxaxm5ut3gxokbl20.jpg",
        desc: "Cylindrical plug for DC power into routers, monitors, external drives.",
      },
    ],
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-10 space-y-8 antialiased selection:bg-indigo-500/20 text-slate-600 dark:text-slate-300">
      
      {/* Header */}
      <div className="space-y-3 border-b border-slate-100 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-2.5 text-indigo-600 dark:text-indigo-400 font-mono text-xs tracking-widest uppercase">
          <Plug className="w-4 h-4" />
          Computer Ports & Cables
        </div>
        
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
          Ports & Cables: The Data-Highway Backbones
        </h1>
        <div className="space-y-2 text-sm text-slate-400 dark:text-slate-500">
          <p>
            Computer ports and cables are the physical "doors" and "roads" through which information flows between devices. They carry data, audio, video, and power.
          </p>
          <p>
            Different ports handle different data types, with speeds from Mbps to tens of Gbps depending on standard and cable quality.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 pt-4">
          {[
            { id: "overview", label: "Overview", icon: Info, color: "indigo" },
            { id: "video", label: "Video & Audio", icon: Monitor, color: "amber" },
            { id: "data", label: "Data & Power", icon: Network, color: "emerald" },
          ].map((t) => {
            const Icon = t.icon;
            const active = activeTab === t.id;
            const colorClasses: Record<string, string> = {
              indigo: active ? "bg-indigo-600 dark:bg-indigo-500" : "",
              amber: active ? "bg-amber-600 dark:bg-amber-500" : "",
              emerald: active ? "bg-emerald-600 dark:bg-emerald-500" : "",
            };

            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-medium transition-all ${
                  active
                    ? `${colorClasses[t.color]} text-white shadow-md shadow-${t.color}-500/20 font-bold`
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
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
        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
          >
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {ports.overview.map((cat) => {
                const Icon = cat.icon;
                return (
                  <div key={cat.label} className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 p-5 shadow-sm space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-indigo-600">
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
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <p className="text-sm text-slate-400">
              Video and audio ports connect your computer to displays, projectors, speakers, and headsets. HDMI and DisplayPort combine HD video and multi-channel audio.
            </p>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {ports.video.map((p) => (
                <div key={p.name} className="flex flex-col rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 shadow-sm overflow-hidden">
                  <img src={p.img} alt={p.name} className="h-32 w-full object-cover" />
                  <div className="p-4 space-y-2">
                    <h3 className="text-sm font-bold text-slate-950 dark:text-white">{p.name}</h3>
                    <span className="text-xs uppercase font-black text-indigo-600 dark:text-indigo-400 tracking-wider block">{p.long}</span>
                    <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400 tracking-wider block">{p.tech}</span>
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
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <p className="text-sm text-slate-400">
              Data and power ports distribute information and electrical energy. Speeds range from Mbps (older LAN) to multiple Gbps (USB-C/Thunderbolt/NVMe).
            </p>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {ports.data.map((p) => (
                <div key={p.name} className="flex flex-col rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 shadow-sm overflow-hidden">
                  <img src={p.img} alt={p.name} className="h-32 w-full object-cover" />
                  <div className="p-4 space-y-2">
                    <h3 className="text-sm font-bold text-slate-950 dark:text-white">{p.name}</h3>
                    <span className="text-xs uppercase font-black text-emerald-600 dark:text-emerald-400 tracking-wider block">{p.long}</span>
                    <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400 tracking-wider block">{p.tech}</span>
                    <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Summary */}
      <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950/50 p-6 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 text-slate-100 dark:text-slate-900 pointer-events-none">
          <Cpu className="h-24 w-24 stroke-[3]" />
        </div>
        <div className="max-w-3xl relative z-10 space-y-2">
          <h3 className="text-sm font-bold tracking-wider font-mono uppercase text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
            <Layers2 className="w-4 h-4" />
            Ports & Cables Summary
          </h3>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Ports and cables form the hardware backbone linking input devices, displays, storage, and networks. From audio jacks to USB-C and NVMe, the right connection type and speed are critical for reliable, high-performance data flow.
          </p>
        </div>
      </div>

      {/* YouTube Video */}
      <div className="aspect-video max-w-4xl mx-auto rounded-2xl overflow-hidden bg-black shadow-2xl border border-slate-200/60 dark:border-slate-800/80">
        <iframe
          className="w-full h-full opacity-90"
          src="https://www.youtube.com/embed/fkCDXw4NzX8"
          title="Every Computer Port Explained in 9 Minutes"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>

      {/* Footer */}
      <footer className="flex items-center gap-1 text-xs font-mono text-slate-400 dark:text-slate-600 pt-4 border-t border-slate-200 dark:border-slate-800">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
        CABLES & PORTS
      </footer>
    </div>
  );
}
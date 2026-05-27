import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  LogIn,
  Cpu,
  Database,
  LogOut,
  Network,
  MousePointer2,
  HardDrive,
  Layers,
  Monitor,
  Speaker,
  Printer,
  Headphones,
  Projector,
  Keyboard,
  Mic,
  Camera,
  Activity,
  Binary,
  FolderTree,
  Zap,
  Fingerprint,
} from "lucide-react";
import WorkspaceHeroSlider from "./components/WorkspaceHeroSlider";

// Animation presets
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

export default function DataFlowTopic() {
  const [activeStorageTab, setActiveStorageTab] = useState<"primary" | "secondary" | "scale">("primary");

  const inputDevices = [
    { name: "Keyboard", icon: Keyboard, img: "https://laptopclinic.co.ke/cdn/shop/files/k120-gallery-01-new.png?v=1736600733&q=80&w=600&auto=format&fit=crop", desc: "Converts mechanical key presses into encoded character streams (ASCII / Unicode)." },
    { name: "Mouse / Trackpad", icon: MousePointer2, img: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=600&auto=format&fit=crop", desc: "Tracks 2D spatial displacement using optical or capacitive sensing systems." },
    { name: "Microphone", icon: Mic, img: "https://www.dpamicrophones.com/media/glplfsso/choosing-a-vocal-mic-header.jpg?q=80&w=600&auto=format&fit=crop", desc: "Samples analog air pressure waves into digital audio waveforms." },
    { name: "Digital Camera", icon: Camera, img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop", desc: "Captures photon intensity on CMOS sensors and converts them into pixel matrices." },
    { name: "Touchscreen", icon: Monitor, img: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=600&auto=format&fit=crop", desc: "Detects capacitive or resistive touch events mapped to screen coordinates." },
    { name: "Scanner", icon: Layers, img: "https://sm.pcmag.com/pcmag_au/about/h/how-we-tes/how-we-test-scanners_4chc.png?q=80&w=600&auto=format&fit=crop", desc: "Digitizes physical documents into raster image data using optical sensing." },
    { name: "Barcode Scanner", icon: Layers, img: "https://carlnkyle.co.ke/wp-content/uploads/2023/12/14952w-1-500x500-1.jpg?width=601&name=final-barcode-scanner.jpg&q=80&w=600&auto=format&fit=crop", desc: "Decodes optical patterns into structured numeric or URL-based datasets." },
    { name: "Fingerprint Sensor", icon: Fingerprint, img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=600&auto=format&fit=crop", desc: "Maps ridge patterns into biometric authentication vectors." }
  ];

  const outputDevices = [
    { name: "LED / OLED Display", icon: Monitor, img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600&auto=format&fit=crop", desc: "Converts pixel-level electrical signals into structured visual output for real-time interaction." },
    { name: "Laser / Inkjet Printer", icon: Printer, img: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?q=80&w=600&auto=format&fit=crop", desc: "Transfers digital documents onto physical media using toner fusion or ink deposition systems." },
    { name: "Studio Speakers", icon: Speaker, img: "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=600&auto=format&fit=crop", desc: "Reconstructs digital audio signals into analog sound waves through vibrating diaphragms." },
    { name: "Headphones", icon: Headphones, img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=600&auto=format&fit=crop", desc: "Localized audio output devices delivering direct sound transmission into the auditory canal." },
    { name: "Digital Projector", icon: Projector, img: "https://images.unsplash.com/photo-1535016120720-40c646be5580?q=80&w=600&auto=format&fit=crop", desc: "Projects large-scale visual output using light modulation and lens-based projection systems." },
    { name: "3D Printer", icon: Cpu, img: "https://cdn.artec3d.com/content-hub-images/how-does-a-3d-printer-work-01.jpg?q=80&w=600&auto=format&fit=crop", desc: "Produces physical objects layer-by-layer from digital models using additive manufacturing." }
  ];

  const secondaryStorage = [
    // Solid‑state / Flash
    {
      type: "Solid State Drive (SSD)",
      tech: "NAND Flash Memory",
      img: "https://www.firstshop.co.za/cdn/shop/files/ts250gssd225s-internal-solid-state-drives-59485259071855.jpg?v=1747636334&width=1214?q=80&w=600&auto=format&fit=crop",
      desc: "High‑speed electronic storage with no moving parts. Optimized for fast boot and low latency access.",
    },
    {
      type: "NVMe SSD",
      tech: "PCIe NAND Flash",
      img: "https://images-na.ssl-images-amazon.com/images/I/71KeDAkw+0L.jpg",
      desc: "PCIe‑connected NVMe SSDs deliver ultra‑fast read/write speeds by bypassing traditional SATA bottlenecks.",
    },
    {
      type: "USB Flash Drive",
      tech: "Portable NAND Flash",
      img: "https://rapidtech.co.ke/wp-content/uploads/2025/12/SanDisk-Ultra-Flair-USB-3.0-Flash-Drive-%E2%80%93-64GB-SDCZ73-064G-G46.png?q=80&w=600&auto=format&fit=crop",
      desc: "Compact removable storage used for quick file transfer and portable file access.",
    },
    {
      type: "Memory Card (SD / microSD)",
      tech: "Embedded NAND Flash",
      img: "https://5.imimg.com/data5/SELLER/Default/2023/3/YR/XT/IB/148865312/51nqyjhesql-sl1001-.jpg?q=80&w=600&auto=format&fit=crop",
      desc: "Ultra‑compact flash storage widely used in phones, cameras, and embedded systems.",
    },

    // Magnetic / HDD variants
    {
      type: "Hard Disk Drive (HDD)",
      tech: "Magnetic Storage",
      img: "https://shop.telkos.co.ke/wp-content/uploads/2023/06/Seagate-Internal-Hard-Disk-Drive-1TB-Desktop-7200-RPM-4-1-1.jpg?q=80&w=600&auto=format&fit=crop",
      desc: "Mechanical storage using spinning magnetic platters and read/write heads for large capacity.",
    },
    {
      type: "External HDD",
      tech: "Portable Magnetic Storage",
      img: "https://www.pcworld.com/wp-content/uploads/2025/05/externe_ssds_im_eigenbau.jpg?quality=50&strip=all&w=1024?q=80&w=600&auto=format&fit=crop",
      desc: "Externally connected HDDs used for backups, media libraries, and system expansion.",
    },

    // Optical drives
    {
      type: "Compact Disk (CD)",
      tech: "Laser‑Based Optical",
      img: "https://i0.wp.com/www.deskdecode.com/wp-content/uploads/2017/06/Optical-Disc-Writer-min.jpg?fit=3504%2C2336&ssl=1&q=80&w=600&auto=format&fit=crop",
      desc: "Optical drive, often used for legacy software and media. Usually about 700MB capacity and read/write speeds up to 52x.",
    },
    {
      type: "Digital Versatile Disk (DVD)",
      tech: "Laser‑Based Optical",
      img: "https://www.fgee.co.ke/wp-content/uploads/2023/08/Untitled-design-2023-08-18T115056.786.png",
      desc: "Optical drive, often used for legacy software and media. Usually about 4.7GB capacity (single layer) and read/write speeds up to 16x.",
    },
    {
      type: "Blu‑ray Drive (BD)",
      tech: "High‑Density Optical",
      img: "https://m.media-amazon.com/images/I/81wDKSNuu9L.jpg", // generic BD‑drive image placeholder
      desc: "Higher‑density optical drive for Blu‑ray discs, used for HD video and large‑data archives.",
    },

    // Tape and archival
    {
      type: "Magnetic Tape Drive",
      tech: "Sequential Magnetic Tape",
      img: "https://images.mr-resistor.co.uk/ranges/823/image/surface-mounted-sensors-2000-1.jpg?q=80&w=600&auto=format&fit=crop", // replace with tape‑drive if you wish
      desc: "Legacy tape‑based storage used for long‑term backups and archival due to high capacity and low cost per GB.",
    },

    // Network / Cloud‑style (for completeness)
    {
      type: "Network Attached Storage (NAS)",
      tech: "Network‑Attached Raid",
      img: "https://www.reichelt.com/magazin/wp-content/uploads/2017/01/NAS-1.jpg", // NAS device image
      desc: "Box‑style device that provides shared storage over a local network, often using RAID‑protected HDDs.",
    },
  ];

  const heroImages = [
    "https://www.hungarianconservative.com/wp-content/uploads/2023/05/neumann_janos_elete_es_munkassaga.jpg",
    "https://techterms.com/img/lg/cpu_27.jpg",
    "https://pyxis.nymag.com/v1/imgs/dfb/03c/bbf932df3accf8c09ebbbae70a438f45d4-2----.2x.h473.w710.jpg",
    "https://kreo-tech.com/cdn/shop/files/preview_images/44cc98b1362b450fba05c1f1e4c085c7.thumbnail.0000000000.jpg?v=1758707143&width=1280",
    "https://afatrading.co.ke/cdn/shop/files/transcend-classic-usb3-0-pen-drive-64gb-black-ts64gjf700--1-30358190129321_800x.jpg?v=1700558544",
    "https://backbone.com/cdn/shop/files/240222_BB-Gen2-LGT_B_Front-noPhone_Light_0b4455ac-3d7a-40f1-9735-e75d9ddfb4ed.png?v=1756413752&width=1200",
    "https://media.wired.com/photos/65fe1ae0a2eb37a9facd50b8/3:2/w_2560%2Cc_limit/Polaroid-Camera-With-Film-Spirit-600-IMG_2999-Reviewers-Photo-SOURCE-ERIC-RAVENSCRAFT.jpg",
    "https://cdn.thewirecutter.com/wp-content/media/2025/04/BEST-USB-FLASH-DRIVES-2048px-9578-3x2-1.jpg?auto=webp&quality=75&crop=16:9,smart&width=1024",
    "https://deprimesolutions.co.ke/wp-content/uploads/2017/07/3590837.jpg",
    "https://i5.walmartimages.com/asr/9079aced-aec4-4ec8-aa91-8c9411cee609.f2016b8e84fb1802777b1ea2f15b8f83.jpeg"
  ]

  return (
    <div className="space-y-24 text-slate-700 dark:text-slate-300 leading-7 max-w-6xl mx-auto px-4 py-12">
      
      {/* HERO SECTION */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="space-y-6 text-center md:text-left"
      >
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 dark:bg-emerald-950/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/30 shadow-xs">
          <Network className="h-3.5 w-3.5 animate-spin-slow" />
          Von Neumann Architecture Foundations
        </div>

        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white bg-clip-text bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 dark:from-white dark:via-slate-200 dark:to-slate-400">
          The Data Flow Engine
        </h1>

        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-4xl font-normal leading-relaxed">
          A modern computer system is an elegant, deterministic machine designed to execute instructions through a continuous lifecycle: 
          <span className="font-semibold text-slate-900 dark:text-white bg-emerald-100/50 dark:bg-emerald-950/30 px-1.5 py-0.5 rounded ml-1">Input, Processing, Storage, and Output</span>. Data shifts state constantly, morphing from raw human actions into stable magnetic patterns.
        </p>
        <WorkspaceHeroSlider images={heroImages} />
      </motion.section>

      {/* PIPELINE OVERVIEW */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="p-8 rounded-3xl bg-slate-100/80 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xs shadow-inner"
      >
        <div className="space-y-2 mb-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="h-5 w-5 text-indigo-500 animate-pulse" />
            The Unified Execution Pipeline
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Every operational execution file transaction sequences through this loop natively:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
          {[
            { label: "INPUT", colorClass: "text-blue-600 dark:text-blue-400 border-blue-200/70 bg-blue-50/50 dark:bg-blue-950/20", icon: LogIn },
            { label: "PROCESSING", colorClass: "text-purple-600 dark:text-purple-400 border-purple-200/70 bg-purple-50/50 dark:bg-purple-950/20", icon: Cpu },
            { label: "STORAGE", colorClass: "text-amber-600 dark:text-amber-400 border-amber-200/70 bg-amber-50/50 dark:bg-amber-950/20", icon: Database },
            { label: "OUTPUT", colorClass: "text-emerald-600 dark:text-emerald-400 border-emerald-200/70 bg-emerald-50/50 dark:bg-emerald-950/20", icon: LogOut },
          ].map((item, i) => (
            <div key={item.label} className="flex items-center gap-3 w-full">
              <motion.div 
                whileHover={{ y: -4, shadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
                className={`flex items-center gap-3 px-6 py-4 rounded-2xl border w-full font-bold backdrop-blur-xs transition-all ${item.colorClass}`}
              >
                <div className="p-2 rounded-xl bg-white dark:bg-slate-900 shadow-xs">
                  <item.icon className="h-5 w-5" />
                </div>
                <span className="tracking-wider text-sm">{item.label}</span>
              </motion.div>
              {i < 3 && (
                <ArrowRight className="h-5 w-5 text-slate-400 dark:text-slate-600 hidden lg:block animate-pulse shrink-0" />
              )}
            </div>
          ))}
        </div>
      </motion.section>

      {/* 1. INPUT LAYER */}
      <section className="space-y-8">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
          <h2 className="text-3xl font-bold flex items-center gap-3 text-slate-900 dark:text-white">
            <LogIn className="h-7 w-7 text-blue-500" />
            1. The Input Layer <span className="text-lg font-normal text-slate-400 dark:text-slate-500">(Data Ingestion)</span>
          </h2>
        </div>
        <p className="text-slate-600 dark:text-slate-400 max-w-4xl">
          Computers interpret all external signals through input transducers that convert physical phenomena into structured binary data streams. These devices define the system’s perception boundary with the real world.
        </p>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid sm:grid-cols-2 md:grid-cols-4 gap-6"
        >
          {inputDevices.map((dev) => (
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -6 }}
              key={dev.name}
              className="flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 group"
            >
              <div className="h-32 w-full overflow-hidden relative">
                <img src={dev.img} alt={dev.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
                  <dev.icon className="h-4 w-4 text-blue-500 shrink-0" />
                  {dev.name}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{dev.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 2. PROCESSING CORE */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="space-y-8"
      >
        <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
          <h2 className="text-3xl font-bold flex items-center gap-3 text-slate-900 dark:text-white">
            <Cpu className="h-7 w-7 text-purple-500" />
            2. The Processing Core <span className="text-lg font-normal text-slate-400 dark:text-slate-500">(The Central Brain)</span>
          </h2>
        </div>
        <p className="text-slate-600 dark:text-slate-400">
          Once raw streams sit in memory, the Central Processing Unit (CPU) executes them via the <strong>Machine Cycle</strong> (Fetch, Decode, Execute, Store). Operating at billions of calculations per second (GHz), it breaks tasks down into three internal execution blocks:
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Control Unit (CU)", icon: Activity, desc: "Acts as the command dispatcher. It fetches operational opcodes from memory, interprets what tasks need doing, and synchronizes the system clock to safely direct data lines through processing paths." },
            { title: "Arithmetic Logic Unit (ALU)", icon: Binary, desc: "The pure mathematical engine. Executes all direct logic checks (AND, OR, NOT gates) alongside baseline calculations (addition, subtraction) to manipulate standard binary registers." },
            { title: "Memory Unit (MU)", icon: Cpu, desc: "The Memory Unit temporarily holds instructions and intermediate results during CPU execution. It acts as a fast internal workspace that supports the Control Unit and ALU while processing data." }
          ].map((item) => (
            <motion.div 
              whileHover={{ y: -4, borderRipple: "1px solid rgb(168, 85, 247)" }}
              key={item.title} 
              className="p-6 rounded-2xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-2 font-bold text-purple-600 dark:text-purple-400 mb-3 text-base">
                <item.icon className="h-5 w-5" /> {item.title}
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 3. STORAGE ARCHITECTURE */}
      <section className="space-y-8">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
          <h2 className="text-3xl font-bold flex items-center gap-3 text-slate-900 dark:text-white">
            <HardDrive className="h-7 w-7 text-amber-500" />
            3. Divided Storage Architecture
          </h2>
        </div>
        <p className="text-slate-600 dark:text-slate-400">
          Computer storage is split into an intentional hierarchy, gracefully optimizing for the architectural tradeoff between access latency speed and volume capacity.
        </p>

        {/* Tab Navigation Controls */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 gap-2 overflow-x-auto pb-px">
          {[
            { id: "primary", label: "Primary Storage", icon: Zap },
            { id: "secondary", label: "Secondary Storage", icon: FolderTree },
            { id: "scale", label: "Measurement Scale", icon: Binary }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveStorageTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 font-semibold text-sm border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeStorageTab === tab.id 
                  ? "border-amber-500 text-amber-600 dark:text-amber-400 bg-amber-50/30 dark:bg-amber-950/10" 
                  : "border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

      {/* Dynamic Tab Workspace Container */}
      <div className="min-h-[300px] mt-6">
        {activeStorageTab === "primary" && (
          <motion.div
            key="primary"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <p className="text-sm text-slate-500">
              Also called <strong className="text-slate-700 dark:text-slate-300">Internal or Main Memory</strong>.
            </p>
            <p className="text-sm text-slate-500">
              Main memory links directly to the CPU socket over high‑speed system buses and serves as the active execution canvas for running kernels and software packages.
            </p>

            <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <table className="w-full text-left text-sm bg-white dark:bg-slate-900">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-semibold border-b border-slate-200 dark:border-slate-800">
                    <th className="p-4">Property</th>
                    <th className="p-4 text-indigo-600 dark:text-indigo-400">RAM</th>
                    <th className="p-4 text-rose-600 dark:text-rose-400">ROM</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-400">
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                    <td className="p-4 font-semibold text-slate-900 dark:text-white">
                      Volatility
                    </td>
                    <td className="p-4">
                      <span className="text-rose-600 dark:text-rose-400 font-medium">
                        Volatile
                      </span>
                      : clears instantly when electrical power drops out.
                    </td>
                    <td className="p-4">
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                        Non‑Volatile
                      </span>
                      : permanently retains data layout structures across power cycles.
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                    <td className="p-4 font-semibold text-slate-900 dark:text-white">
                      Read/Write Access
                    </td>
                    <td className="p-4">
                      Dynamic read and write cycles at full runtime performance speeds.
                    </td>
                    <td className="p-4">
                      Read‑Mostly; requires specialized firmware flashing procedures to modify storage blocks.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeStorageTab === "secondary" && (
          <>
            <p className="text-sm text-slate-500">
              Also called <strong className="text-slate-700 dark:text-slate-300">Secondary or Auxiliary Storage</strong>.
            </p>
            <motion.div
              key="secondary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid sm:grid-cols-3 gap-6"
            >
              {secondaryStorage.map((st) => (
                <div
                  key={st.type}
                  className="flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300"
                >
                  <img
                    src={st.img}
                    alt={st.type}
                    className="h-32 w-full object-cover object-center"
                  />
                  <div className="p-5 space-y-2">
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                      {st.type}
                    </h4>
                    <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400 tracking-wider block">
                      {st.tech}
                    </span>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {st.desc}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </>
        )}

        {activeStorageTab === "scale" && (
          <motion.div
            key="scale"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs"
          >
            <table className="w-full text-left text-xs bg-white dark:bg-slate-900">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-semibold border-b border-slate-200 dark:border-slate-800">
                  <th className="p-3 pl-4">Designation</th>
                  <th className="p-3">Notation</th>
                  <th className="p-3">Absolute Equivalent Value</th>
                  <th className="p-3 pr-4">Physical Representation Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-400">
                {[
                  {
                    name: "Bit",
                    note: "b",
                    val: "A single microscopic electrical switch state (0 or 1).",
                    ex: "An individual true‑false logic gate flag.",
                  },
                  {
                    name: "Byte",
                    note: "B",
                    val: "8 individual bits pooled together sequentially.",
                    ex: "A single alphanumeric character value letter.",
                  },
                  {
                    name: "Kilobyte",
                    note: "KB",
                    val: "1,024 Bytes (2¹⁰ multiplier pattern limits).",
                    ex: "A standard page of unformatted plain‑text document logs.",
                  },
                  {
                    name: "Megabyte",
                    note: "MB",
                    val: "1,024 Kilobytes",
                    ex: "A single highly optimized audio streaming track file.",
                  },
                  {
                    name: "Gigabyte",
                    note: "GB",
                    val: "1,024 Megabytes",
                    ex: "Roughly 1 hour of regular compressed HD streaming video.",
                  },
                ].map((row) => (
                  <tr
                    key={row.name}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors"
                  >
                    <td className="p-3 pl-4 font-bold text-slate-900 dark:text-white">
                      {row.name}
                    </td>
                    <td className="p-3 font-mono text-amber-600">{row.note}</td>
                    <td className="p-3">{row.val}</td>
                    <td className="p-3 pr-4">{row.ex}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </div>

      </section>

      {/* 4. OUTPUT LAYER */}
      <section className="space-y-8">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
          <h2 className="text-3xl font-bold flex items-center gap-3 text-slate-900 dark:text-white">
            <LogOut className="h-7 w-7 text-emerald-500" />
            4. The Output Layer <span className="text-lg font-normal text-slate-400 dark:text-slate-500">(User Interpretation)</span>
          </h2>
        </div>
        <p className="text-slate-600 dark:text-slate-400">
          Output devices convert processed digital data into human-perceivable formats such as visuals, audio, printed documents, or tactile feedback. They represent the final translation layer between machine computation and human interpretation.
        </p>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          {outputDevices.map((out) => (
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -6 }}
              key={out.name}
              className="flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 group"
            >
              <div className="h-32 w-full overflow-hidden relative">
                <img src={out.img} alt={out.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
                  <out.icon className="h-4 w-4 text-emerald-500 shrink-0" />
                  {out.name}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{out.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* MEDIA REFERENCE SECTION */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="space-y-6 pt-12 border-t border-slate-200 dark:border-slate-800"
      >
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Network className="h-6 w-6 text-indigo-500" />
            Interactive Visual Walkthrough
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Watch this animation tracing bus requests and hardware pipeline execution cycles step-by-step:
          </p>
        </div>

        <div className="aspect-video max-w-4xl mx-auto rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl relative group bg-black">
          <iframe className="w-full h-full opacity-90 group-hover:opacity-100 transition-opacity duration-300" src="https://www.youtube.com/embed/CBf-jIn44X0" title="CS Basics: Input Process Output" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
      </motion.section>

      <footer className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400 dark:text-slate-600 pt-4 border-t border-slate-200 dark:border-slate-900">
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping mr-1" />
          DATA FLOW
        </div>
      </footer>

    </div>
  );
}
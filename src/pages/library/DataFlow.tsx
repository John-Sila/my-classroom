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
import StorageCard from "@/src/utils/shimmer";

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: "easeOut" },
  },
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
    { type: "Solid State Drive (SSD)", tech: "NAND Flash Memory", img: "https://www.firstshop.co.za/cdn/shop/files/ts250gssd225s-internal-solid-state-drives-59485259071855.jpg?v=1747636334&width=1214?q=80&w=600&auto=format&fit=crop", desc: "High‑speed electronic storage with no moving parts. Optimized for fast boot and low latency access." },
    { type: "NVMe SSD", tech: "PCIe NAND Flash", img: "https://images-na.ssl-images-amazon.com/images/I/71KeDAkw+0L.jpg", desc: "PCIe‑connected NVMe SSDs deliver ultra‑fast read/write speeds by bypassing traditional SATA bottlenecks." },
    { type: "USB Flash Drive", tech: "Portable NAND Flash", img: "https://rapidtech.co.ke/wp-content/uploads/2025/12/SanDisk-Ultra-Flair-USB-3.0-Flash-Drive-%E2%80%93-64GB-SDCZ73-064G-G46.png?q=80&w=600&auto=format&fit=crop", desc: "Compact removable storage used for quick file transfer and portable file access." },
    { type: "Memory Card (microSD)", tech: "Embedded NAND Flash", img: "https://5.imimg.com/data5/SELLER/Default/2023/3/YR/XT/IB/148865312/51nqyjhesql-sl1001-.jpg?q=80&w=600&auto=format&fit=crop", desc: "Ultra‑compact flash storage widely used in phones, cameras, and embedded systems." },
    { type: "Hard Disk Drive (HDD)", tech: "Magnetic Storage", img: "https://shop.telkos.co.ke/wp-content/uploads/2023/06/Seagate-Internal-Hard-Disk-Drive-1TB-Desktop-7200-RPM-4-1-1.jpg?q=80&w=600&auto=format&fit=crop", desc: "Mechanical storage using spinning magnetic platters and read/write heads for large capacity." },
    { type: "External HDD", tech: "Portable Magnetic Storage", img: "https://www.pcworld.com/wp-content/uploads/2025/05/externe_ssds_im_eigenbau.jpg?quality=50&strip=all&w=1024?q=80&w=600&auto=format&fit=crop", desc: "Externally connected HDDs used for backups, media libraries, and system expansion." },
    { type: "Compact Disk (CD)", tech: "Laser‑Based Optical", img: "https://i0.wp.com/www.deskdecode.com/wp-content/uploads/2017/06/Optical-Disc-Writer-min.jpg?fit=3504%2C2336&ssl=1&q=80&w=600&auto=format&fit=crop", desc: "Optical drive, often used for legacy software and media. Usually about 700MB capacity." },
    { type: "Digital Versatile Disk (DVD)", tech: "Laser‑Based Optical", img: "https://www.fgee.co.ke/wp-content/uploads/2023/08/Untitled-design-2023-08-18T115056.786.png", desc: "Optical drive, often used for legacy software and media. Usually about 4.7GB capacity." },
    { type: "Blu‑ray Drive (BD)", tech: "High‑Density Optical", img: "https://m.media-amazon.com/images/I/81wDKSNuu9L.jpg", desc: "Higher‑density optical drive for Blu‑ray discs, used for HD video and large‑data archives." },
    { type: "Magnetic Tape Drive", tech: "Sequential Magnetic Tape", img: "https://images.mr-resistor.co.uk/ranges/823/image/surface-mounted-sensors-2000-1.jpg?q=80&w=600&auto=format&fit=crop", desc: "Legacy tape‑based storage used for long‑term backups and archival due to low cost per GB." },
    { type: "Network Attached Storage (NAS)", tech: "Network‑Attached Raid", img: "https://www.reichelt.com/magazin/wp-content/uploads/2017/01/NAS-1.jpg", desc: "Box‑style device that provides shared storage over a local network, often using RAID configurations." }
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
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-10 space-y-12 antialiased selection:bg-indigo-500/30 text-slate-600 dark:text-slate-300 overflow-hidden">
      
      {/* HERO SECTION */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20px" }}
        variants={fadeInUp}
        className="space-y-6 text-center md:text-left"
      >
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 dark:bg-emerald-950/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/30 shadow-xs">
          <Network className="h-3.5 w-3.5" />
          Von Neumann Architecture Foundations
        </div>

        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white">
          The Data Flow Engine
        </h1>

        <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-4xl font-normal leading-relaxed">
          A modern computer system is an elegant, deterministic machine designed to execute instructions through a continuous lifecycle: 
          <span className="font-semibold text-slate-900 dark:text-white bg-emerald-100/50 dark:bg-emerald-950/30 px-1.5 py-0.5 rounded ml-1">Input, Processing, Storage, and Output</span>.
        </p>
        <div className="w-full overflow-hidden rounded-2xl">
          <WorkspaceHeroSlider images={heroImages} />
        </div>
      </motion.section>

      {/* PIPELINE OVERVIEW */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20px" }}
        variants={fadeInUp}
        className="p-6 md:p-8 rounded-3xl bg-slate-100/80 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xs"
      >
        <div className="space-y-1 mb-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="h-5 w-5 text-indigo-500" />
            The Unified Execution Pipeline
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Every operational transaction sequences through this loop natively:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "INPUT", colorClass: "text-blue-600 dark:text-blue-400 border-blue-200/70 bg-blue-50/50 dark:bg-blue-950/20", icon: LogIn },
            { label: "PROCESSING", colorClass: "text-purple-600 dark:text-purple-400 border-purple-200/70 bg-purple-50/50 dark:bg-purple-950/20", icon: Cpu },
            { label: "STORAGE", colorClass: "text-amber-600 dark:text-amber-400 border-amber-200/70 bg-amber-50/50 dark:bg-amber-950/20", icon: Database },
            { label: "OUTPUT", colorClass: "text-emerald-600 dark:text-emerald-400 border-emerald-200/70 bg-emerald-50/50 dark:bg-emerald-950/20", icon: LogOut },
          ].map((item, i) => (
            <div key={item.label} className="flex items-center gap-2 w-full min-w-0">
              <div className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl border w-full font-bold transition-all min-w-0 ${item.colorClass}`}>
                <div className="p-1.5 rounded-xl bg-white dark:bg-slate-900 shrink-0">
                  <item.icon className="h-4 w-4" />
                </div>
                <span className="tracking-wider text-xs truncate">{item.label}</span>
              </div>
              {i < 3 && (
                <ArrowRight className="h-4 w-4 text-slate-400 dark:text-slate-600 hidden lg:block shrink-0" />
              )}
            </div>
          ))}
        </div>
      </motion.section>

      {/* 1. INPUT LAYER */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
          <h2 className="text-2xl md:text-3xl font-bold flex flex-wrap items-baseline gap-2 text-slate-900 dark:text-white">
            <span className="flex items-center gap-2"><LogIn className="h-6 w-6 text-blue-500" /> 1. The Input Layer</span>
            <span className="text-sm md:text-base font-normal text-slate-400 dark:text-slate-500">(Data Ingestion)</span>
          </h2>
        </div>
        <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 max-w-4xl leading-relaxed">
          Computers interpret external signals through transducers that convert physical variables into binary streams.
        </p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {inputDevices.map((dev) => (
            <motion.div
              key={dev.name}
              variants={fadeInUp}
              className="flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200"
            >
              <div className="h-28 w-full overflow-hidden">
                <img src={dev.img} alt={dev.name} className="h-full w-full object-cover" />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-xs md:text-sm">
                  <dev.icon className="h-4 w-4 text-blue-500 shrink-0" />
                  <span className="truncate">{dev.name}</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                  {dev.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </section>

      {/* 2. PROCESSING CORE */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20px" }}
        variants={fadeInUp}
        className="space-y-6"
      >
        <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
          <h2 className="text-2xl md:text-3xl font-bold flex flex-wrap items-baseline gap-2 text-slate-900 dark:text-white">
            <span className="flex items-center gap-2"><Cpu className="h-6 w-6 text-purple-500" /> 2. The Processing Core</span>
            <span className="text-sm md:text-base font-normal text-slate-400 dark:text-slate-500">(The Central Brain)</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "Control Unit (CU)", icon: Activity, desc: "The command dispatcher. It fetches operational opcodes, interprets configurations, and synchronizes clock lines to process pathways safely." },
            { title: "Arithmetic Logic Unit (ALU)", icon: Binary, desc: "The pure mathematical core. Executes logical gates (AND, OR, NOT) alongside binary computing vectors to compute calculations." },
            { title: "Memory Unit (MU)", icon: Cpu, desc: "Temporarily holds live operations and operational states inside extreme speed buffers directly feeding core lines." }
          ].map((item) => (
            <div key={item.title} className="p-5 rounded-2xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs hover:border-purple-500/40 transition-colors">
              <div className="flex items-center gap-2 font-bold text-purple-600 dark:text-purple-400 mb-2 text-sm md:text-base">
                <item.icon className="h-4 w-4 shrink-0" /> {item.title}
              </div>
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 3. STORAGE ARCHITECTURE */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2 text-slate-900 dark:text-white">
            <HardDrive className="h-6 w-6 text-amber-500" />
            3. Storage Hierarchy
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Storage is organized into two broad levels: 
            <span className="font-semibold text-indigo-600 dark:text-indigo-400"> primary storage</span>, also called 
            <span className="font-semibold text-blue-600 dark:text-blue-400"> main memory</span> or 
            <span className="font-semibold text-cyan-600 dark:text-cyan-400"> internal memory</span>, because it is inside the computer system and works directly with the CPU. 
            <span className="font-semibold text-rose-600 dark:text-rose-400"> Secondary storage</span>, also called 
            <span className="font-semibold text-amber-600 dark:text-amber-400"> auxiliary memory</span> or 
            <span className="font-semibold text-orange-600 dark:text-orange-400"> external memory</span>, sits outside the CPU and is used for long-term storage. [web:31][web:38][web:40]
          </p>
        </div>

        {/* Dynamic Nav Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 gap-1 overflow-x-auto no-scrollbar scroll-smooth">
          {[
            { id: "primary", label: "Primary Storage", icon: Zap },
            { id: "secondary", label: "Secondary Storage", icon: FolderTree },
            { id: "scale", label: "Measurement Scale", icon: Binary }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveStorageTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 font-bold text-xs uppercase tracking-wider border-b-2 transition-all duration-300 ease-out shrink-0 outline-none ${
                activeStorageTab === tab.id
                  ? "border-amber-500 text-amber-600 dark:text-amber-400 bg-amber-50/60 dark:bg-amber-950/20"
                  : "border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              }`}
            >
              <tab.icon className="h-3.5 w-3.5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Workspace Panel */}
        <div className="min-h-[280px]">
          {activeStorageTab === "primary" && (
            <motion.div
              key="primary"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="space-y-4"
            >
              <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm">
                <div className="hidden md:grid grid-cols-12 bg-slate-50 dark:bg-slate-950 p-4 font-bold text-xs uppercase text-slate-500 border-b border-slate-200 dark:border-slate-800">
                  <div className="col-span-3">Property</div>
                  <div className="col-span-4 text-indigo-600 dark:text-indigo-400">RAM</div>
                  <div className="col-span-5 text-rose-600 dark:text-rose-400">ROM</div>
                </div>

                <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs md:text-sm">
                  <div className="grid grid-cols-1 md:grid-cols-12 p-4 gap-2 md:gap-0">
                    <div className="col-span-3 font-bold text-slate-900 dark:text-white md:uppercase md:text-xs">
                      Volatility
                    </div>
                    <div className="col-span-4 md:pr-4 text-slate-600 dark:text-slate-300">
                      <span className="text-rose-500 font-bold">Volatile:</span> data is lost when power is turned off.
                    </div>
                    <div className="col-span-5 text-slate-600 dark:text-slate-300">
                      <span className="text-emerald-500 font-bold">Non-volatile:</span> data remains stored even without power.
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 p-4 gap-2 md:gap-0">
                    <div className="col-span-3 font-bold text-slate-900 dark:text-white md:uppercase md:text-xs">
                      Access Pattern
                    </div>
                    <div className="col-span-4 md:pr-4 text-slate-600 dark:text-slate-300">
                      Fast read and write access for active programs and data.
                    </div>
                    <div className="col-span-5 text-slate-600 dark:text-slate-300">
                      Mostly read-oriented, with changes made less frequently.
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeStorageTab === "secondary" && (
            <motion.div
              key="secondary"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4"
            >
              {secondaryStorage.map((st) => (
                <StorageCard key={st.type} st={st} />
              ))}
            </motion.div>
          )}

          {activeStorageTab === "scale" && (
            <motion.div
              key="scale"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm"
            >
              <div className="hidden md:grid grid-cols-12 bg-slate-50 dark:bg-slate-950 p-4 font-bold text-xs uppercase text-slate-500 border-b border-slate-200 dark:border-slate-800">
                <div className="col-span-3">Designation</div>
                <div className="col-span-4">Absolute Equivalent</div>
                <div className="col-span-5">Example Scope</div>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs md:text-sm">
                {[
                  { name: "Bit (b)", val: "A single binary digit: 0 or 1.", ex: "The smallest unit of digital information." },
                  { name: "Byte (B)", val: "8 bits combined together.", ex: "Commonly used to represent one character." },
                  { name: "Kilobyte (KB)", val: "1,024 bytes.", ex: "Small text files and simple documents." },
                  { name: "Megabyte (MB)", val: "1,024 kilobytes.", ex: "Images, songs, and medium-sized files." },
                  { name: "Gigabyte (GB)", val: "1,024 megabytes.", ex: "Videos, apps, and storage drives." }
                ].map((row) => (
                  <div key={row.name} className="grid grid-cols-1 md:grid-cols-12 p-4 gap-1 md:gap-0">
                    <div className="col-span-3 font-bold text-slate-900 dark:text-white">{row.name}</div>
                    <div className="col-span-4 text-slate-600 dark:text-slate-400 md:pr-4">{row.val}</div>
                    <div className="col-span-5 text-slate-500 dark:text-slate-400">{row.ex}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* 4. OUTPUT LAYER */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
          <h2 className="text-2xl md:text-3xl font-bold flex flex-wrap items-baseline gap-2 text-slate-900 dark:text-white">
            <span className="flex items-center gap-2"><LogOut className="h-6 w-6 text-emerald-500" /> 4. The Output Layer</span>
            <span className="text-sm md:text-base font-normal text-slate-400 dark:text-slate-500">(User Interpretation)</span>
          </h2>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {outputDevices.map((out) => (
            <motion.div
              variants={fadeInUp}
              key={out.name}
              className="flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200"
            >
              <div className="h-28 w-full overflow-hidden">
                <img src={out.img} alt={out.name} className="h-full w-full object-cover" />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-xs md:text-sm">
                  <out.icon className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span className="truncate">{out.name}</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">{out.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* MEDIA REFERENCE SECTION */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20px" }}
        variants={fadeInUp}
        className="space-y-4 pt-10 border-t border-slate-200 dark:border-slate-800"
      >
        <div className="space-y-1">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Network className="h-5 w-5 text-indigo-500" /> Visual Walkthrough
          </h2>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
            Hardware pipeline execution cycles step-by-step:
          </p>
        </div>

        <div className="aspect-video max-w-4xl mx-auto rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg bg-black">
          <iframe className="w-full h-full opacity-95" src="https://www.youtube.com/embed/CBf-jIn44X0" title="CS Basics: Input Process Output" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
      </motion.section>

      <footer className="flex items-center justify-between text-[10px] font-mono text-slate-400 dark:text-slate-600 pt-4 border-t border-slate-200 dark:border-slate-900">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
          SYSTEM PIPELINE STEADY
        </div>
      </footer>

    </div>
  );
}
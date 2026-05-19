import React, { useMemo, useState, useEffect } from "react";
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
  Scan,
  Mic,
  Camera,
  Smartphone,
  Radio,
  Binary,
  Container,
  Activity,
  Disc,
  FolderTree,
  Zap,
  Fingerprint,
} from "lucide-react";

export default function DataFlowTopic() {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
  }, []);

  return (
    <div className="space-y-16 text-slate-700 dark:text-slate-300 leading-7 max-w-5xl mx-auto">
      
      {/* HERO SECTION */}
      <section className="space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 dark:bg-emerald-950/40 px-4 py-1 text-sm font-medium text-emerald-700 dark:text-emerald-400">
          <Network className="h-4 w-4" />
          Von Neumann Architecture Foundations
        </div>

        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
          The Data Flow Engine
        </h1>

        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-4xl">
          A modern computer system is an elegant, deterministic machine designed to execute instructions through a continuous lifecycle: 
          <span className="font-semibold text-slate-900 dark:text-white"> Input, Processing, Storage, and Output</span>. Data shifts state constantly, morphing from raw human actions into voltage differentials, stable magnetic patterns, and back into human-perceivable media.
        </p>

        <div className="rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md">
          <img
            src="https://www.totalphase.com/media/blog/2022/08/Intel-CPU1.jpg?q=80&w=1600&auto=format&fit=crop"
            className="w-full h-[300px] md:h-[400px] object-cover"
            alt="Silicon wafer microarchitecture close up representing processing pipelines"
          />
        </div>
      </section>

      {/* PIPELINE OVERVIEW */}
      <section className="space-y-6 p-6 rounded-2xl bg-slate-100/70 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="h-5 w-5 text-indigo-500" />
          The Unified Execution Pipeline
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Every file transaction, video frame generation, and game action travels through this linear cycle sequentially:
        </p>

        <div className="flex flex-wrap items-center gap-4 text-sm font-semibold">
          {[
            { label: "INPUT", colorClass: "text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-900/40", icon: LogIn },
            { label: "PROCESSING", colorClass: "text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-900/40", icon: Cpu },
            { label: "STORAGE", colorClass: "text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-900/40", icon: Database },
            { label: "OUTPUT", colorClass: "text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900/40", icon: LogOut },
          ].map((item, i, arr) => (
            <React.Fragment key={item.label}>
              <div className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border bg-white dark:bg-slate-900 shadow-xs ${item.colorClass}`}>
                <item.icon className="h-4 w-4" />
                {item.label}
              </div>
              {i < arr.length - 1 && (
                <ArrowRight className="h-4 w-4 text-slate-400 dark:text-slate-600 animate-pulse" />
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* 1. INPUT LAYER */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-900 dark:text-white">
            <LogIn className="h-6 w-6 text-blue-500" />
            1. The Input Layer (Data Ingestion)
          </h2>
        </div>

        <p className="text-slate-600 dark:text-slate-300">
          Computers interpret all external signals through input transducers that convert physical phenomena into structured binary data streams. These devices define the system’s perception boundary with the real world.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">

          {[
            {
              name: "Keyboard",
              icon: Keyboard,
              img: "https://laptopclinic.co.ke/cdn/shop/files/k120-gallery-01-new.png?v=1736600733&q=80&w=600&auto=format&fit=crop",
              desc: "Converts mechanical key presses into encoded character streams (ASCII / Unicode)."
            },
            {
              name: "Mouse / Trackpad",
              icon: MousePointer2,
              img: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=600&auto=format&fit=crop",
              desc: "Tracks 2D spatial displacement using optical or capacitive sensing systems."
            },
            {
              name: "Microphone",
              icon: Mic,
              img: "https://www.dpamicrophones.com/media/glplfsso/choosing-a-vocal-mic-header.jpg?q=80&w=600&auto=format&fit=crop",
              desc: "Samples analog air pressure waves into digital audio waveforms."
            },
            {
              name: "Digital Camera",
              icon: Camera,
              img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop",
              desc: "Captures photon intensity on CMOS sensors and converts them into pixel matrices."
            },

            {
              name: "Touchscreen",
              icon: Monitor,
              img: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=600&auto=format&fit=crop",
              desc: "Detects capacitive or resistive touch events mapped to screen coordinates."
            },
            {
              name: "Scanner",
              icon: Layers,
              img: "https://sm.pcmag.com/pcmag_au/about/h/how-we-tes/how-we-test-scanners_4chc.png?q=80&w=600&auto=format&fit=crop",
              desc: "Digitizes physical documents into raster image data using optical sensing."
            },
            {
              name: "Barcode / QR Scanner",
              icon: Layers,
              img: "https://carlnkyle.co.ke/wp-content/uploads/2023/12/14952w-1-500x500-1.jpg?width=601&name=final-barcode-scanner.jpg&q=80&w=600&auto=format&fit=crop",
              desc: "Decodes optical patterns into structured numeric or URL-based datasets."
            },
            {
              name: "Joystick / Game Controller",
              icon: Cpu,
              img: "https://m.media-amazon.com/images/I/614klCRwYhL.jpg?q=80&w=600&auto=format&fit=crop",
              desc: "Translates analog stick displacement and button states into control signals."
            },

            {
              name: "Fingerprint Sensor",
              icon: Fingerprint,
              img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=600&auto=format&fit=crop",
              desc: "Maps ridge patterns into biometric authentication vectors."
            },
            {
              name: "Facial Recognition Camera",
              icon: Camera,
              img: "https://motionarray.imgix.net/airport-security-system-close-up-of-surveillance-camera-with-ai-recognition-3d-3366925-high_0006.jpg?w=660&q=60&fit=max&auto=format?q=80&w=600&auto=format&fit=crop",
              desc: "Extracts geometric facial feature vectors for identity classification."
            },
            {
              name: "GPS Receiver",
              icon: Network,
              img: "https://i5.walmartimages.com/seo/Garmin-eTrex-20-Waterproof-Handheld-GPS-Receiver-w-2-2-Inch-65K-TFT-Display_1bb5bc7d-f276-4ad5-beb6-138c7b260b40.add1dfe75df72677328a3af9f1b97b39.jpeg?q=80&w=600&auto=format&fit=crop",
              desc: "Converts satellite time-delay signals into geospatial coordinates."
            },
            {
              name: "Sensors (Temperature / Motion / Light)",
              icon: Cpu,
              img: "https://images.mr-resistor.co.uk/ranges/823/image/surface-mounted-sensors-2000-1.jpg?q=80&w=600&auto=format&fit=crop",
              desc: "Captures environmental variables and converts them into measurable digital signals."
            },

          ].map((dev) => (
            <div
              key={dev.name}
              className="flex flex-col rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs hover:shadow-md transition"
            >
              <img
                src={dev.img}
                alt={dev.name}
                className="h-28 w-full object-cover border-b border-slate-100 dark:border-slate-800"
              />

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm mb-1">
                    <dev.icon className="h-4 w-4 text-blue-500" />
                    {dev.name}
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                    {dev.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* 2. PROCESSING CORE */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-900 dark:text-white">
            <Cpu className="h-6 w-6 text-purple-500" />
            2. The Processing Core (The Central Brain)
          </h2>
        </div>

        <p>
          Once raw streams sit in memory, the Central Processing Unit (CPU) executes them via the <strong>Machine Cycle</strong> (Fetch, Decode, Execute, Store). Operating at billions of calculations per second (GHz), it breaks tasks down into three internal execution blocks:
        </p>

        <div className="grid md:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-2 font-bold text-purple-600 dark:text-purple-400 mb-2">
              <Activity className="h-4 w-4" /> Control Unit (CU)
            </div>
            <p className="text-sm leading-relaxed">
              Acts as the command dispatcher. It fetches operational opcodes from memory, interprets what tasks need doing, and synchronizes the system clock to safely direct data lines through processing paths.
            </p>
          </div>

          <div className="p-5 rounded-2xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-2 font-bold text-purple-600 dark:text-purple-400 mb-2">
              <Binary className="h-4 w-4" /> Arithmetic Logic Unit (ALU)
            </div>
            <p className="text-sm leading-relaxed">
              The pure mathematical engine. Executes all direct logic checks (AND, OR, NOT gates) alongside baseline calculations (addition, subtraction) to manipulate standard binary registers.
            </p>
          </div>

          <div className="p-5 rounded-2xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs">
  
          <div className="flex items-center gap-2 font-bold text-purple-600 dark:text-purple-400 mb-2">
            <Cpu className="h-4 w-4" />
            Memory Unit (MU)
          </div>

          <p className="text-sm leading-relaxed">
            The Memory Unit temporarily holds instructions and intermediate results during CPU execution. It acts as a fast internal workspace that supports the Control Unit and ALU while processing data.
          </p>

        </div>
        </div>
      </section>

      {/* 3. STORAGE ARCHITECTURE */}
      <section className="space-y-8">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-900 dark:text-white">
            <HardDrive className="h-6 w-6 text-amber-500" />
            3. Divided Storage Architecture
          </h2>
        </div>

        <p>
          Computer storage is split into an intentional hierarchy. It addresses the physical tradeoff between raw latency speed and total physical volume capacity.
        </p>

        {/* PRIMARY STORAGE SUB-SECTION */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-950 dark:text-slate-100 flex items-center gap-2">
            <Zap className="h-4 w-4 text-amber-500" />
            Primary Storage (Internal / Main Memory)
          </h3>
          <p className="text-sm">
            Main memory links directly to the CPU socket over dedicated system buses. It serves as the active execution canvas for running kernels and software packages.
          </p>

          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-sm border-collapse bg-white dark:bg-slate-900">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-semibold">
                  <th className="p-4">Structural Property</th>
                  <th className="p-4 text-indigo-600 dark:text-indigo-400">RAM (Random Access Memory)</th>
                  <th className="p-4 text-rose-600 dark:text-rose-400">ROM (Read-Only Memory)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr>
                  <td className="p-4 font-medium">Volatility Matrix</td>
                  <td className="p-4"><strong>Volatile</strong>: Clears instantly when physical electrical power drops out.</td>
                  <td className="p-4"><strong>Non-Volatile</strong>: Permanently retains structure across power cycles.</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Read/Write Scope</td>
                  <td className="p-4">Dynamic read and write capabilities at active runtime speed.</td>
                  <td className="p-4">Read-Mostly; requires firmware flashing techniques to override.</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Core System Duties</td>
                  <td className="p-4">Holds working operational threads for apps and browser windows.</td>
                  <td className="p-4">Stores initialization code blocks (e.g., Motherboard UEFI/BIOS).</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* SECONDARY STORAGE SUB-SECTION */}
        <div className="space-y-4 pt-4">
          <h3 className="text-lg font-bold text-slate-950 dark:text-slate-100 flex items-center gap-2">
            <FolderTree className="h-4 w-4 text-amber-500" />
            Secondary Storage (Auxiliary / External Layer)
          </h3>

          <p className="text-sm text-slate-600 dark:text-slate-300">
            Secondary storage operates outside the CPU execution cycle and provides persistent data retention.
            It stores operating systems, applications, and user data independently of power state.
          </p>

          <div className="grid sm:grid-cols-3 gap-4">

            {[
              {
                type: "Solid State Drive (SSD)",
                tech: "NAND Flash Memory",
                img: "https://www.firstshop.co.za/cdn/shop/files/ts250gssd225s-internal-solid-state-drives-59485259071855.jpg?v=1747636334&width=1214?q=80&w=600&auto=format&fit=crop",
                desc: "High-speed electronic storage with no moving parts. Optimized for fast boot and low latency access."
              },
              {
                type: "Hard Disk Drive (HDD)",
                tech: "Magnetic Storage",
                img: "https://shop.telkos.co.ke/wp-content/uploads/2023/06/Seagate-Internal-Hard-Disk-Drive-1TB-Desktop-7200-RPM-4-1-1.jpg?q=80&w=600&auto=format&fit=crop",
                desc: "Mechanical storage using spinning magnetic platters and read/write heads for large capacity at low cost."
              },
              {
                type: "USB Flash Drive",
                tech: "Portable NAND Flash",
                img: "https://rapidtech.co.ke/wp-content/uploads/2025/12/SanDisk-Ultra-Flair-USB-3.0-Flash-Drive-%E2%80%93-64GB-SDCZ73-064G-G46.png?q=80&w=600&auto=format&fit=crop",
                desc: "Compact removable storage used for quick transfer and portable file access."
              },
              {
                type: "Optical Discs",
                tech: "Laser-Based Media",
                img: "https://i0.wp.com/www.deskdecode.com/wp-content/uploads/2017/06/Optical-Disc-Writer-min.jpg?fit=3504%2C2336&ssl=1&q=80&w=600&auto=format&fit=crop",
                desc: "CDs, DVDs, and Blu-ray discs storing data via laser-etched pits and lands."
              },
              {
                type: "Memory Cards (SD / microSD)",
                tech: "Embedded Flash Storage",
                img: "https://5.imimg.com/data5/SELLER/Default/2023/3/YR/XT/IB/148865312/51nqyjhesql-sl1001-.jpg?q=80&w=600&auto=format&fit=crop",
                desc: "Ultra-compact storage widely used in phones, cameras, and embedded systems."
              },
              {
                type: "External SSD / HDD",
                tech: "Portable External Drives",
                img: "https://www.pcworld.com/wp-content/uploads/2025/05/externe_ssds_im_eigenbau.jpg?quality=50&strip=all&w=1024?q=80&w=600&auto=format&fit=crop",
                desc: "Externally connected high-capacity drives used for backups and system expansion."
              }

            ].map((st) => (
              <div
                key={st.type}
                className="flex flex-col rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs hover:shadow-md transition"
              >
                <img
                  src={st.img}
                  alt={st.type}
                  className="h-28 w-full object-cover"
                />

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-0.5">
                      {st.type}
                    </h4>

                    <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400 tracking-wider block mb-2">
                      {st.tech}
                    </span>

                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                      {st.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* MEMORY CAPACITY SCALE TABLE */}
        <div className="space-y-4 pt-4">
          <h3 className="text-lg font-bold text-slate-950 dark:text-slate-100 flex items-center gap-2">
            <Binary className="h-4 w-4 text-amber-500" />
            Data Measurement Scale (The Binary Hierarchy)
          </h3>
          <p className="text-sm">
            In system computing, standard capacity structures grow exponentially at $2^{10}$ multipliers ($1024$), rather than traditional metric base-10 steps ($1000$).
          </p>

          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-sm border-collapse bg-white dark:bg-slate-900">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-semibold">
                  <th className="p-3 pl-4">Memory Designation</th>
                  <th className="p-3">Standard Notation</th>
                  <th className="p-3">Absolute Equal Equivalent Value</th>
                  <th className="p-3 pr-4">Physical Representation Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                <tr>
                  <td className="p-3 pl-4 font-semibold">Bit</td>
                  <td className="p-3">b</td>
                  <td className="p-3">A single microscopic electrical switch state ($0$ or $1$).</td>
                  <td className="p-3 pr-4">An individual true/false logical flag setting.</td>
                </tr>
                <tr>
                  <td className="p-3 pl-4 font-semibold">Byte</td>
                  <td className="p-3">B</td>
                  <td className="p-3">8 individual bits</td>
                  <td className="p-3 pr-4">A single alphanumeric text character string letter.</td>
                </tr>
                <tr>
                  <td className="p-3 pl-4 font-semibold">Kilobyte</td>
                  <td className="p-3">KB</td>
                  <td className="p-3">1,024 Bytes</td>
                  <td className="p-3 pr-4">A normal page of unformatted text document entries.</td>
                </tr>
                <tr>
                  <td className="p-3 pl-4 font-semibold">Megabyte</td>
                  <td className="p-3">MB</td>
                  <td className="p-3">1,024 Kilobytes</td>
                  <td className="p-3 pr-4">A single highly compressed standard mp3 audio track.</td>
                </tr>
                <tr>
                  <td className="p-3 pl-4 font-semibold">Gigabyte</td>
                  <td className="p-3">GB</td>
                  <td className="p-3">1,024 Megabytes</td>
                  <td className="p-3 pr-4">Roughly 1 hour of regular compressed HD streaming video.</td>
                </tr>
                <tr>
                  <td className="p-3 pl-4 font-semibold">Terabyte</td>
                  <td className="p-3">TB</td>
                  <td className="p-3">1,024 Gigabytes</td>
                  <td className="p-3 pr-4">Maximum operational limits of standard consumer hard drives.</td>
                </tr>
                <tr>
                  <td className="p-3 pl-4 font-semibold">Petabyte</td>
                  <td className="p-3">PB</td>
                  <td className="p-3">1,024 Terabytes</td>
                  <td className="p-3 pr-4">A complete commercial cloud server bank backup image.</td>
                </tr>
                <tr>
                  <td className="p-3 pl-4 font-semibold">Exabyte</td>
                  <td className="p-3">EB</td>
                  <td className="p-3">1,024 Petabytes</td>
                  <td className="p-3 pr-4">Aggregated data processing volume metrics across international carriers.</td>
                </tr>
                <tr>
                  <td className="p-3 pl-4 font-semibold">Zettabyte</td>
                  <td className="p-3">ZB</td>
                  <td className="p-3">1,024 Exabytes</td>
                  <td className="p-3 pr-4">The global scale volume footprint of the entire internet infrastructure.</td>
                </tr>
                <tr>
                  <td className="p-3 pl-4 font-semibold">Yottabyte</td>
                  <td className="p-3">YB</td>
                  <td className="p-3">1,024 Zettabytes</td>
                  <td className="p-3 pr-4">Vast, theoretical computational metrics beyond current physical facilities.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. OUTPUT LAYER */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-900 dark:text-white">
            <LogOut className="h-6 w-6 text-emerald-500" />
            4. The Output Layer (User Interpretation)
          </h2>
        </div>

        <p className="text-slate-600 dark:text-slate-300">
          Output devices convert processed digital data into human-perceivable formats such as visuals, audio, printed documents, or tactile feedback. They represent the final translation layer between machine computation and human interpretation.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">

          {[
            {
              name: "LED / OLED Display",
              icon: Monitor,
              img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600&auto=format&fit=crop",
              desc: "Converts pixel-level electrical signals into structured visual output for real-time interaction."
            },
            {
              name: "Laser / Inkjet Printer",
              icon: Printer,
              img: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?q=80&w=600&auto=format&fit=crop",
              desc: "Transfers digital documents onto physical media using toner fusion or ink deposition systems."
            },
            {
              name: "Studio Speakers",
              icon: Speaker,
              img: "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=600&auto=format&fit=crop",
              desc: "Reconstructs digital audio signals into analog sound waves through vibrating diaphragms."
            },
            {
              name: "Headphones / Earphones",
              icon: Headphones,
              img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=600&auto=format&fit=crop",
              desc: "Localized audio output devices delivering direct sound transmission into the auditory canal."
            },
            {
              name: "Digital Projector",
              icon: Projector,
              img: "https://images.unsplash.com/photo-1535016120720-40c646be5580?q=80&w=600&auto=format&fit=crop",
              desc: "Projects large-scale visual output using light modulation and lens-based projection systems."
            },
            {
              name: "3D Printer",
              icon: Cpu,
              img: "https://cdn.artec3d.com/content-hub-images/how-does-a-3d-printer-work-01.jpg?q=80&w=600&auto=format&fit=crop",
              desc: "Produces physical objects layer-by-layer from digital models using additive manufacturing."
            },
            {
              name: "Plotter / Large Format Printer",
              icon: Printer,
              img: "https://s.alicdn.com/@sc04/kf/H88a4bd0dd45c4ad6a6fb8cd8440900531/Recruiting-Agents-Locor-Economic-Cheap-1.8m-Large-Format-Eco-Solvent-Printer-Sublimation-Printing-Plotter-Machine-Factory-Supply.png?q=80&w=600&auto=format&fit=crop",
              desc: "High-precision vector output device used for engineering drawings and CAD designs."
            },

          ].map((out) => (
            <div
              key={out.name}
              className="flex flex-col rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs hover:shadow-md transition"
            >
              <img
                src={out.img}
                alt={out.name}
                className="h-28 w-full object-cover border-b border-slate-100 dark:border-slate-800"
              />

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm mb-1">
                    <out.icon className="h-4 w-4 text-emerald-500" />
                    {out.name}
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                    {out.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* MEDIA REFERENCE SECTION */}
      <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Network className="h-5 w-5 text-slate-500" />
          Interactive Visual Walkthrough
        </h2>
        <p className="text-sm">
          Watch this animation tracing bus requests and pipeline cycles step-by-step between input controls, motherboard main cache memory, and logic hardware blocks:
        </p>

        <div className="aspect-video rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/CBf-jIn44X0"
            title="Data flow explanation guide video"
            allowFullScreen
          />
        </div>
      </section>

    </div>
  );
}
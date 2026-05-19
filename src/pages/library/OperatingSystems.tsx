import React from 'react';
import { 
  Cpu, 
  Layers, 
  Terminal, 
  ShieldCheck, 
  Monitor, 
  Smartphone, 
  HardDrive, 
  Server, 
  Compass, 
  Info,
  Youtube,
  Fingerprint
} from 'lucide-react';

export default function OperatingSystemsTopic() {
  const distros = [
    "Ubuntu",
    "Kubuntu",
    "Lubuntu",
    "Xubuntu",
    "Ubuntu Studio",
    "Ubuntu MATE",
    "Edubuntu",
    "Ubuntu Budgie",
    "Ubuntu Kylin",

    "Debian",
    "Fedora",
    "Red Hat Enterprise Linux",
    "CentOS",
    "CentOS Stream",
    "Rocky Linux",
    "AlmaLinux",
    "Oracle Linux",
    "Scientific Linux",

    "Arch Linux",
    "Manjaro",
    "EndeavourOS",
    "Garuda Linux",
    "ArcoLinux",

    "Linux Mint",
    "LMDE",
    "Zorin OS",
    "Elementary OS",
    "Pop!_OS",
    "deepin",
    "Peppermint OS",
    "Bodhi Linux",
    "Lite XL Linux",
    "Solus",

    "Kali Linux",
    "Parrot OS",
    "BlackArch",
    "BackBox",
    "Tails",
    "Qubes OS",

    "openSUSE Leap",
    "openSUSE Tumbleweed",
    "SUSE Linux Enterprise",

    "Alpine Linux",
    "Gentoo",
    "Slackware",
    "Void Linux",
    "NixOS",
    "Guix System",

    "Raspberry Pi OS",
    "DietPi",
    "Armbian",

    "MX Linux",
    "antiX",
    "PCLinuxOS",
    "Mageia",
    "OpenMandriva",
    "ROSA Linux",

    "Tiny Core Linux",
    "Puppy Linux",
    "Damn Small Linux",
    "Slax",
    "Knoppix",

    "FreeBSD",
    "OpenBSD",
    "NetBSD",
    "DragonFly BSD",

    "ChromeOS",
    "ChromeOS Flex",

    "Clear Linux",
    "SteamOS",
    "Endless OS",
    "Nobara Linux",
    "Vanilla OS",
    "BlendOS",
    "Bedrock Linux",

    "TrueNAS SCALE",
    "TrueNAS CORE",
    "OpenMediaVault",

    "Android-x86",
    "FydeOS",
    "Remix OS",

    "Deepin",
    "PureOS",
    "Devuan",
    "Artix Linux",
    "Calculate Linux",
    "Sabayon Linux",
    "Funtoo Linux",
    "RebornOS",
    "KaOS",
    "AV Linux",
    "Bluestar Linux",
    "Regata OS",
    "MakuluLinux",
    "Netrunner",
    "Siduction",
    "SparkyLinux",
    "EasyOS",
    "BunsenLabs",
    "Chimera Linux",
    "CachyOS",
    "ExTiX",
    "GhostBSD",
    "Linuxfx",
    "OpenIndiana",
    "Haiku OS"
  ];

  return (
    <div className="space-y-16 text-slate-600 dark:text-slate-300 leading-relaxed max-w-5xl mx-auto">

      {/* HERO SECTION */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 px-3 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/30">
            <Cpu className="h-3 w-3" /> System Software
          </span>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Operating Systems (OS)
          </h1>
          <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-4xl leading-relaxed">
            An operating system is the foundational master program that initializes and controls physical hardware architectures, manages low-level memory allocations, and provides standardized runtime hooks for client applications.
          </p>
        </div>

        <div className="relative group overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 shadow-md">
          <img
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop"
            alt="Integrated microcircuit computing system motherboard architecture"
            className="w-full h-[320px] md:h-[400px] object-cover object-center transform group-hover:scale-[1.01] transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 to-transparent" />
        </div>
      </section>

      {/* SYSTEM ABSTRACTION PILLARS */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Core Subsystem Responsibilities
          </h2>
          <p className="text-sm text-slate-400">The primary resource orchestration and hardware management loops.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 bg-white dark:bg-slate-900/20 flex gap-4 items-start">
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
              <HardDrive className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Hardware Resource Allocation</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Schedules CPU thread processes, arbitrates virtual RAM paging spaces, and balances permanent storage writes.</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 bg-white dark:bg-slate-900/20 flex gap-4 items-start">
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">I/O Interfacing & Interrupts</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Handles peripheral bus operations, driver translations, and inputs coming from mouse, keyboard, or networks.</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 bg-white dark:bg-slate-900/20 flex gap-4 items-start">
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
              <Terminal className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Shell Interface Execution</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Exposes either a graphical workspace environments (GUI) or low-overhead command-line engines (CLI).</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 bg-white dark:bg-slate-900/20 flex gap-4 items-start">
            <div className="p-2 rounded-xl bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Sandbox Security Boundaries</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Isolates software environments through file descriptor access levels, ring rings, and active privilege checking.</p>
            </div>
          </div>
        </div>
      </section>

      {/* MATRIX DISTRIBUTION TABLE */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Common Computing Platforms
          </h2>
          <p className="text-sm text-slate-400">Comparing mainstream enterprise and consumer software platforms.</p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900/20">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  <th className="px-6 py-4">Operating System</th>
                  <th className="px-6 py-4">Architecture Classification</th>
                  <th className="px-6 py-4">Engineering Vendor</th>
                  <th className="px-6 py-4">Target Workspace Scope</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-800/60">
                <tr>
                  <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white whitespace-nowrap flex items-center gap-2">
                    <Monitor className="h-4 w-4 text-sky-500" /> Windows
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-400">Desktop / Laptop Architecture</td>
                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400">Microsoft Corp.</td>
                  <td className="px-6 py-4 text-slate-400 text-xs">Consumer PCs, legacy business ecosystems</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white whitespace-nowrap flex items-center gap-2">
                    <Monitor className="h-4 w-4 text-slate-400" /> macOS
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-400">Unix Desktop Desktop</td>
                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400">Apple Inc.</td>
                  <td className="px-6 py-4 text-slate-400 text-xs">Workstations, local development setups</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white whitespace-nowrap flex items-center gap-2">
                    <Server className="h-4 w-4 text-orange-500" /> Linux
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-400">Modular / Distributed Server</td>
                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400">Open Source Project</td>
                  <td className="px-6 py-4 text-slate-400 text-xs">Cloud server nodes, cloud computing pipelines</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white whitespace-nowrap flex items-center gap-2">
                    <Smartphone className="h-4 w-4 text-emerald-500" /> Android
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-400">Mobile Touch Stack</td>
                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400">Google / OHA</td>
                  <td className="px-6 py-4 text-slate-400 text-xs">Mobile embedded devices, cellular handsets</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white whitespace-nowrap flex items-center gap-2">
                    <Smartphone className="h-4 w-4 text-indigo-500" /> iOS / iPadOS
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-400">Mobile Closed Ecosystem</td>
                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400">Apple Inc.</td>
                  <td className="px-6 py-4 text-slate-400 text-xs">iPhones, consumer tablet frameworks</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white whitespace-nowrap flex items-center gap-2">
                    <Monitor className="h-4 w-4 text-blue-400" /> Chrome OS
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-400">Web-Centric Architecture</td>
                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400">Google LLC</td>
                  <td className="px-6 py-4 text-slate-400 text-xs">Lightweight education laptops, terminals</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* KERNEL CONCEPTUAL DEPTH */}
      <section className="space-y-6 pt-4">
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="p-2 rounded-xl bg-orange-50 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400">
            <Cpu className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Linux System Architecture</h2>
        </div>

        <p className="text-sm max-w-4xl">
          A <strong className="text-slate-900 dark:text-white font-semibold">kernel</strong> is the core low-level subsystem abstraction engine. It sits at kernel privilege space (Ring 0), managing processing instructions directly on physical computer processors and storage fabrics.
        </p>

        <div className="grid md:grid-cols-2 gap-5">
          <div className="p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 bg-white dark:bg-slate-900/20">
            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2 flex items-center gap-2">
              <Compass className="h-4 w-4 text-slate-400" /> The Kernel vs. The OS
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Linux by itself is simply an isolated kernel binary engine. To compile a working operating system ecosystem, it needs user-space modules, system shells, file packages, and management utilities.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 bg-white dark:bg-slate-900/20">
            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2 flex items-center gap-2">
              <Fingerprint className="h-4 w-4 text-slate-400" /> Infrastructure Reach
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Because of its modular monolithic architecture, Linux runs nearly all modern edge infrastructure pipelines, including cloud datacenters, smart IoT devices, and Android base environments.
            </p>
          </div>
        </div>

        <div className="relative group overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 shadow-inner">
          <img
            src="https://static0.makeuseofimages.com/wordpress/wp-content/uploads/2022/08/How-the-Linux-Kernel-works.jpg?q=80&w=1600&auto=format&fit=crop"
            alt="Data center server racks running enterprise Linux server kernels"
            className="w-full h-[280px] object-cover object-center transform group-hover:scale-[1.005] transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent" />
        </div>
      </section>

      {/* DENSE DISTRO COMPONENT GRID */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Linux Distributions (Distros)
          </h2>
          <p className="text-sm text-slate-400">Custom user-space operating packages built atop the core Linux kernel framework.</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {distros.map((os) => (
            <span
              key={os}
              className="px-3 py-1.5 rounded-xl border border-slate-200/60 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
            >
              {os}
            </span>
          ))}
        </div>
      </section>

      {/* VIDEO SECTION */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="p-2 rounded-xl bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400">
            <Youtube className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Educational Media Resources</h2>
        </div>

        <div className="aspect-video rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-black shadow-lg">
          <iframe
            className="w-full h-full opacity-95 hover:opacity-100 transition-opacity"
            src="https://www.youtube.com/embed/26QPDBe-NB8"
            title="Operating Systems Concept Engineering Video Breakdown"
            allowFullScreen
          />
        </div>
      </section>

      {/* SUMMARY BRIEF CARD */}
      <section className="p-8 rounded-3xl border border-slate-200 dark:border-slate-800/60 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900/60 dark:to-slate-900 relative overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 p-6 text-slate-200 dark:text-slate-800/60 pointer-events-none">
          <Info className="h-20 w-20 stroke-[1]" />
        </div>
        <div className="max-w-3xl relative z-10 space-y-2">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Module Summary
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Operating systems provide the core infrastructure layers required to safely map human processes to volatile physical transistor arrays. Whether navigating commercial platforms like Windows and macOS, or deploying high-scale cloud servers using modular Linux distro instances, studying resource scheduling loops is vital to engineering stable digital solutions.
          </p>
        </div>
      </section>

    </div>
  );
}
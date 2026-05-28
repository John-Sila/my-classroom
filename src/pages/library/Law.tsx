import React, { useState } from "react";
import {
  Shield,
  Scale,
  FileText,
  Lock,
  Gavel,
  AlertTriangle,
  UserCheck,
  Globe,
  Activity,
  Info,
  Search,
  Cpu,
  Layers2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function CyberLawTopic() {
  const [activeTab, setActiveTab] = useState<"overview" | "laws" | "offences">("overview");

  const keyLaws = [
    {
      name: "Constitution of Kenya (2010)",
      short: "Constitution",
      tech: "Supreme Law",
      year: "2010",
      desc: "Article 31 guarantees the right to privacy, including protection against unnecessary disclosure of personal information and infringement of communications privacy. This is the constitutional foundation for all data protection and cyber law in Kenya.",
    },
    {
      name: "Data Protection Act",
      short: "DPA",
      tech: "Data Privacy Law",
      year: "2019",
      desc: "An Act of Parliament that gives effect to Article 31(c) and (d) of the Constitution. It establishes the Office of the Data Protection Commissioner (ODPC), regulates processing of personal data, and sets out rights of data subjects and obligations of data controllers and processors.",
    },
    {
      name: "Computer Misuse and Cybercrimes Act",
      short: "CMCA",
      tech: "Cybercrime Law",
      year: "2018",
      desc: "Comprehensive legislation criminalising cyber offences such as unauthorized access, interception, cyber harassment, identity theft, phishing, computer fraud, cybersquatting, and cyber terrorism. It also provides for prevention, investigation, prosecution, and penalties.",
    },
    {
      name: "Kenya Information and Communications Act",
      short: "KICA",
      tech: "ICT Regulatory Law",
      year: "1998 (amended 2013, 2025)",
      desc: "Primary law governing ICT regulation in Kenya. The 2025 Amendment Bill expands the definition of a 'Telecommunication Operator' to include ISPs and extends the Communications Authority's scope to cover social media, OTT services, AI, IoT, and blockchain.",
    },
  ];

  const dataRights = [
    { title: "Right to be Informed", desc: "Data subjects must be told how their personal data will be collected, used, and shared." },
    { title: "Right of Access", desc: "Data subjects can request access to their personal data and information about how it is processed." },
    { title: "Right to Correction", desc: "Data subjects can request correction of false or misleading personal data." },
    { title: "Right to Deletion", desc: "Data subjects can request deletion of false or misleading personal data." },
    { title: "Right to Object", desc: "Data subjects can object to the processing of all or part of their personal data." },
  ];

  const controllersProcessors = [
    { role: "Data Controller", desc: "Person or organization that determines the purpose and means of processing personal data. Responsible for lawful, fair, and transparent processing." },
    { role: "Data Processor", desc: "Person or organization that processes personal data on behalf of the data controller, following the controller's instructions and security requirements." },
  ];

  const offences = [
    { name: "Unauthorized Access", desc: "Accessing a computer system or data without lawful authority or permission." },
    { name: "Unauthorized Interference", desc: "Interfering with, modifying, or damaging computer systems, programs, or data without authorization." },
    { name: "Unauthorized Interception", desc: "Intercepting data in transit over a computer system without lawful authority." },
    { name: "Illegal Devices & Access Codes", desc: "Possession, production, or distribution of devices or codes used to commit computer offences." },
    { name: "Cyber Espionage", desc: "Unauthorized access to computer systems for the purpose of obtaining sensitive or classified information." },
    { name: "False Publications", desc: "Publishing false information or data that is likely to cause panic, harm, or misinformation." },
    { name: "Child Pornography", desc: "Production, distribution, or possession of child sexual abuse material in digital form." },
    { name: "Computer Fraud & Forgery", desc: "Using computer systems to deceive, defraud, or forge records, documents, or data." },
    { name: "Cyber Harassment", desc: "Using digital platforms to harass, stalk, threaten, or intimidate individuals." },
    { name: "Identity Theft & Impersonation", desc: "Using another person's identity or personal data without consent for fraudulent purposes." },
    { name: "Phishing", desc: "Tricking users into revealing sensitive information such as passwords or financial data through deceptive messages." },
    { name: "Cybersquatting", desc: "Registering or using domain names in bad faith to exploit another's trademark or identity." },
    { name: "Cyberterrorism & Sabotage", desc: "Using computer systems to cause serious disruption, damage, or harm to critical infrastructure or national security." },
  ];

  const principles = [
    { title: "Lawfulness, Fairness, Transparency", desc: "Data must be processed lawfully, fairly, and in a transparent manner for the data subject." },
    { title: "Purpose Limitation", desc: "Personal data must be collected for specified, explicit, and legitimate purposes." },
    { title: "Data Minimization", desc: "Only data that is adequate, relevant, and limited to what is necessary should be processed." },
    { title: "Accuracy", desc: "Personal data must be accurate and, where necessary, kept up to date." },
    { title: "Storage Limitation", desc: "Data must not be kept longer than necessary for the purposes for which it is processed." },
    { title: "Integrity & Confidentiality", desc: "Data must be processed securely using appropriate technical and organizational measures." },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-10 space-y-8 antialiased selection:bg-indigo-500/20 text-slate-600 dark:text-slate-300">
      
      {/* Header */}
      <div className="space-y-3 border-b border-slate-100 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-2.5 text-indigo-600 dark:text-indigo-400 font-mono text-xs tracking-widest uppercase">
          <Shield className="w-4 h-4" />
          Cyber Law & ICT Regulation
        </div>
        
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-950 dark:text-white">
          Cyber Law: Protecting Data in the Digital Age
        </h1>
        <div className="space-y-2 text-sm text-slate-400 dark:text-slate-500">
          <p>Cyber law defines how personal data and digital systems are protected, used, and regulated. In Kenya, this framework is anchored in the Constitution and enforced through a suite of ICT-related statutes and regulations.</p>
          <p>Data is protected through constitutional rights, the Data Protection Act (2019), the Computer Misuse and Cybercrimes Act (2018), and the Kenya Information and Communications Act (1998, amended 2013 and 2025). These laws govern how organizations collect, store, process, and transfer data, and define penalties for misuse, breaches, and cyber offences.</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 pt-4">
          {[
            { id: "overview", label: "Overview", icon: Info, color: "indigo" },
            { id: "laws", label: "Laws & Framework", icon: Scale, color: "emerald" },
            { id: "offences", label: "Offences & Enforcement", icon: AlertTriangle, color: "rose" }
          ].map((t) => {
            const Icon = t.icon;
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-medium transition-all ${
                  active
                    ? `bg-${t.color}-600 dark:bg-${t.color}-500 text-white shadow-md shadow-${t.color}-500/20 font-bold scale-105`
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white"
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
            transition={{ duration: 0.25 }}
            className="space-y-8"
          >
            {/* Constitutional Foundation */}
            <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 p-5 shadow-sm space-y-3">
              <h2 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-2">
                <Gavel className="w-4 h-4 text-indigo-500" />
                Constitutional Foundation: Right to Privacy
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Article 31 of the Constitution of Kenya (2010) guarantees every person the right to privacy, including:
              </p>
              <ul className="text-xs text-slate-400 list-disc pl-5 space-y-1">
                <li>Not to have their person, home, or property searched</li>
                <li>Not to have their possessions seized</li>
                <li>Not to have information relating to their family or private affairs unnecessarily required or revealed</li>
                <li>Not to have the privacy of their communications infringed</li>
              </ul>
              <p className="text-xs text-slate-400 leading-relaxed">
                The Data Protection Act, 2019 gives effect to Article 31(c) and (d), turning this constitutional right into a detailed legal framework for personal data protection.
              </p>
            </div>

            {/* DPA Basics */}
            <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 p-5 shadow-sm space-y-3">
              <h2 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-500" />
                What Is Protected Under the Data Protection Act?
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                The DPA protects <strong>personal data</strong>: any information relating to an identifiable living person. This includes names, IDs, phone numbers, emails, location data, financial information, health records, and online identifiers.
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                It also covers <strong>sensitive personal data</strong>, such as health, ethnicity, political opinions, religious beliefs, biometric data, and genetic data, which require stronger protection.
              </p>
            </div>

            {/* Controllers & Processors */}
            <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 p-5 shadow-sm space-y-3">
              <h2 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-sky-500" />
                Data Controllers & Processors
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {controllersProcessors.map((item) => (
                  <div key={item.role} className="p-4 rounded-xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sky-600">
                        <UserCheck className="w-4 h-4" />
                      </div>
                      <h3 className="text-xs font-bold text-slate-950 dark:text-white">{item.role}</h3>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Subject Rights */}
            <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 p-5 shadow-sm space-y-3">
              <h2 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-indigo-500" />
                Data Subject Rights (DPA 2019)
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {dataRights.map((r) => (
                  <div key={r.title} className="p-4 rounded-xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 space-y-1">
                    <h3 className="text-xs font-bold text-slate-950 dark:text-white">{r.title}</h3>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{r.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Protection Principles */}
            <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 p-5 shadow-sm space-y-3">
              <h2 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-500" />
                Data Protection Principles
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {principles.map((p) => (
                  <div key={p.title} className="p-4 rounded-xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 space-y-1">
                    <h3 className="text-xs font-bold text-slate-950 dark:text-white">{p.title}</h3>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: LAWS & FRAMEWORK */}
        {activeTab === "laws" && (
          <motion.div
            key="laws"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="space-y-8"
          >
            <p className="text-sm text-slate-400 dark:text-slate-500">
              Kenya's ICT and cyber law framework is built on four core pillars: the Constitution, the Data Protection Act, the Computer Misuse and Cybercrimes Act, and the Kenya Information and Communications Act.
            </p>

            {/* Key Laws */}
            <div className="grid gap-6 sm:grid-cols-2">
              {keyLaws.map((law) => (
                <div key={law.name} className="flex flex-col rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 shadow-sm overflow-hidden">
                  <div className="p-4 space-y-2">
                    <h3 className="text-sm font-bold text-slate-950 dark:text-white">{law.name}</h3>
                    <span className="text-xs uppercase font-black text-indigo-600 dark:text-indigo-400 tracking-wider block">{law.short}</span>
                    <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400 tracking-wider block">{law.tech} • {law.year}</span>
                    <p className="text-xs text-slate-400 leading-relaxed">{law.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* ODPC */}
            <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 p-5 shadow-sm space-y-3">
              <h2 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-indigo-500" />
                Office of the Data Protection Commissioner (ODPC)
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Established under the Data Protection Act, 2019, the ODPC is the independent regulatory body responsible for:
              </p>
              <ul className="text-xs text-slate-400 list-disc pl-5 space-y-1">
                <li>Overseeing implementation and enforcement of the DPA</li>
                <li>Maintaining a register of data controllers and processors</li>
                <li>Conducting audits, inspections, and data protection impact assessments</li>
                <li>Receiving and investigating complaints about data breaches</li>
                <li>Promoting public awareness and self-regulation among data handlers</li>
                <li>Facilitating international cooperation on data protection</li>
              </ul>
            </div>

            {/* Cross-Border & Breaches */}
            <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 p-5 shadow-sm space-y-3">
              <h2 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-500" />
                Cross-Border Data Transfer & Data Breaches
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                The DPA prohibits cross-border transfer of personal data unless there is proof of adequate data protection safeguards or consent from the data subject. This ensures that Kenyan citizens' data remains protected even when processed outside Kenya.
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Data controllers and processors must report data breaches to the ODPC and, in some cases, to affected data subjects, especially when the breach poses a risk to their rights and freedoms.
              </p>
            </div>
          </motion.div>
        )}

        {/* TAB 3: OFFENCES & ENFORCEMENT */}
        {activeTab === "offences" && (
          <motion.div
            key="offences"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="space-y-8"
          >
            <p className="text-sm text-slate-400 dark:text-slate-500">
              The Computer Misuse and Cybercrimes Act (2018) defines and criminalises a wide range of cyber offences. It aims to protect the integrity, confidentiality, and availability of computer systems and data, and to deter malicious activities in cyberspace.
            </p>

            {/* Offences Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {offences.map((off) => (
                <div key={off.name} className="p-4 rounded-xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 space-y-1">
                  <h3 className="text-xs font-bold text-slate-950 dark:text-white">{off.name}</h3>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{off.desc}</p>
                </div>
              ))}
            </div>

            {/* Penalties & Enforcement */}
            <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 p-5 shadow-sm space-y-3">
              <h2 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-2">
                <Gavel className="w-4 h-4 text-rose-500" />
                Penalties & Enforcement (Exact Fines & Jail Terms)
              </h2>

              <p className="text-xs text-slate-400 leading-relaxed">
                Penalties under the <strong>Computer Misuse and Cybercrimes Act (2018)</strong> and its <strong>2024 Amendment (enacted 2025)</strong> range from heavy fines to long imprisonment terms, depending on the offence and severity.
              </p>

              {/* CMCA Penalties */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-950 dark:text-white">Key Offences & Penalties (Computer Misuse and Cybercrimes Act)</h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-3 rounded-xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40">
                    <div className="text-xs font-bold text-slate-950 dark:text-white mb-1">Unauthorized Access (Section 14)</div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">Intentionally circumventing security measures to access a computer system without authority.</p>
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-2">Penalty: Fine up to KSh 5,000,000 or imprisonment up to 3 years, or both.</p>
                  </div>

                  <div className="p-3 rounded-xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40">
                    <div className="text-xs font-bold text-slate-950 dark:text-white mb-1">Access with Intent to Commit Further Offence (Section 15)</div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">Unauthorized access intended to facilitate another offence under any law.</p>
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-2">Penalty: Fine up to KSh 10,000,000 or imprisonment up to 10 years, or both.</p>
                  </div>

                  <div className="p-3 rounded-xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40">
                    <div className="text-xs font-bold text-slate-950 dark:text-white mb-1">Unauthorized Interference (Section 16)</div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">Unauthorized act resulting in interference with a computer system, program, or data.</p>
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-2">Penalty: Fine up to KSh 10,000,000 or imprisonment up to 5 years, or both.</p>
                  </div>

                  <div className="p-3 rounded-xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40">
                    <div className="text-xs font-bold text-slate-950 dark:text-white mb-1">Cyber Espionage / Critical Information Infrastructure</div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">Accessing critical data or national critical information infrastructure to benefit a foreign state.</p>
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-2">Penalty: Fine up to KSh 10,000,000 or imprisonment up to 20 years, or both.</p>
                    <p className="text-[10px] text-slate-400 mt-1">If injury results: up to 20 years imprisonment. If death results: life imprisonment.</p>
                  </div>

                  <div className="p-3 rounded-xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40">
                    <div className="text-xs font-bold text-slate-950 dark:text-white mb-1">False Publication</div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">Deliberately publishing false, misleading, or fictitious data intended to be acted upon as genuine.</p>
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-2">Penalty: Fine up to KSh 5,000,000 or imprisonment up to 2 years, or both.</p>
                  </div>

                  <div className="p-3 rounded-xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40">
                    <div className="text-xs font-bold text-slate-950 dark:text-white mb-1">Cyber Harassment (Amended Section 27, 2024)</div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">Online communication that causes psychological harm, harassment, or could lead a person to contemplate suicide.</p>
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-2">Penalty: Fine up to KSh 20,000,000 or imprisonment up to 10 years, or both.</p>
                  </div>

                  <div className="p-3 rounded-xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40">
                    <div className="text-xs font-bold text-slate-950 dark:text-white mb-1">Identity Theft & Impersonation</div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">Using another person's identity or personal data without consent for fraudulent purposes.</p>
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-2">Penalty: Fine up to KSh 10,000,000 or life imprisonment (for serious cases), or both.</p>
                  </div>

                  <div className="p-3 rounded-xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40">
                    <div className="text-xs font-bold text-slate-950 dark:text-white mb-1">Child Pornography</div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">Production, distribution, or possession of child sexual abuse material in digital form.</p>
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-2">Penalty: Life imprisonment for serious offences.</p>
                  </div>
                </div>
              </div>

              {/* DPA Penalties */}
              <div className="space-y-2 pt-4 border-t border-slate-200/60 dark:border-slate-800/60">
                <h3 className="text-xs font-bold text-slate-950 dark:text-white">Data Protection Act (2019) – ODPC Administrative Penalties</h3>
                <p className="text-xs text-slate-400 leading-relaxed">The ODPC can issue Penalty Notices for non-compliance with the Data Protection Act.</p>
                <ul className="text-xs text-slate-400 list-disc pl-5 space-y-1">
                  <li>Maximum administrative fine for failing to comply with an enforcement notice: <strong>KSh 5,000,000</strong>.</li>
                  <li>ODPC has fined organizations between <strong>KSh 1,850,000</strong> and <strong>KSh 4,550,000</strong> for various breaches.</li>
                  <li>Example: A school received <strong>KSh 4,550,000</strong> for data protection violations.</li>
                  <li>Example: A restaurant was fined <strong>KSh 1,850,000</strong> for posting a data subject's image on social media without consent.</li>
                  <li>Example: A Digital Credit Provider was fined <strong>KSh 2,975,000</strong> for using contact information from third parties without consent.</li>
                  <li>OPPO Kenya was fined the maximum <strong>KSh 5,000,000</strong> for violating the Data Protection Act.</li>
                </ul>
              </div>

              {/* Enforcement Bodies */}
              <div className="space-y-2 pt-4 border-t border-slate-200/60 dark:border-slate-800/60">
                <h3 className="text-xs font-bold text-slate-950 dark:text-white">Enforcement Bodies</h3>
                <ul className="text-xs text-slate-400 list-disc pl-5 space-y-1">
                  <li><strong>National Computer and Cybercrimes Coordination Committee (NC4)</strong> – advises on cyber policy and coordinates enforcement.</li>
                  <li><strong>Office of the Data Protection Commissioner (ODPC)</strong> – enforces the Data Protection Act, issues Penalty Notices, and investigates complaints.</li>
                  <li><strong>Law enforcement agencies</strong> – investigate and prosecute cybercrime offences under the Computer Misuse and Cybercrimes Act.</li>
                </ul>
              </div>
            </div>

            {/* Emerging Tech & 2025 Amendment */}
            <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 p-5 shadow-sm space-y-3">
              <h2 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-2">
                <Cpu className="w-4 h-4 text-sky-500" />
                Emerging Technologies & the 2025 ICT Amendment
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                The Kenya Information and Communications (Amendment) Bill, 2025 proposes to:
              </p>
              <ul className="text-xs text-slate-400 list-disc pl-5 space-y-1">
                <li>Explicitly include Internet Service Providers (ISPs) as "Telecommunication Operators"</li>
                <li>Extend the Communications Authority's regulatory scope to social media, OTT services, AI, IoT, and blockchain</li>
                <li>Update regulatory frameworks to address new digital platforms and emerging cyber risks</li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* YouTube Video */}
      <div className="aspect-video max-w-4xl mx-auto rounded-2xl overflow-hidden bg-black shadow-2xl border border-slate-200/60 dark:border-slate-800/80">
        <iframe
          className="w-full h-full opacity-90"
          src="https://www.youtube.com/embed/asByYA3rSCo"
          title="Cyber Law Explained | How the Internet Is Regulated"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>

      {/* Summary */}
      <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950/50 p-6 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 text-slate-100 dark:text-slate-900 pointer-events-none">
          <Layers2 className="h-24 w-24 stroke-[3]" />
        </div>
        <div className="max-w-3xl relative z-10 space-y-2">
          <h3 className="text-sm font-bold tracking-wider font-mono uppercase text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
            <Layers2 className="w-4 h-4" />
            Cyber Law Summary
          </h3>
          <p className="text-xs md:text-sm text-slate-400 dark:text-slate-500 leading-relaxed">
            Cyber law in Kenya is anchored on the Constitution's right to privacy and enforced through a comprehensive ICT framework. The Data Protection Act (2019), Computer Misuse and Cybercrimes Act (2018), and the Kenya Information and Communications Act (1998, amended 2013 and 2025) together protect personal data, regulate digital systems, define cyber offences, and establish penalties for misuse.
          </p>
        </div>
      </div>
      
      <footer className="flex items-center gap-1 text-xs font-mono text-slate-400 dark:text-slate-600 pt-4 border-t border-slate-200 dark:border-slate-800">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
        CYBER LAW
      </footer>
    </div>
  );
}
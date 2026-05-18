export default function DataFlowTopic() {
  return (
    <div className="space-y-12 text-slate-700 dark:text-slate-300 leading-7">

      {/* HERO */}
      <section className="space-y-4">
        <span className="inline-flex items-center rounded-full bg-emerald-100 dark:bg-emerald-950/40 px-3 py-1 text-sm font-medium text-emerald-700 dark:text-emerald-400">
          Computer Fundamentals
        </span>

        <h1 className="text-4xl font-black text-slate-900 dark:text-white">
          Data Flow in a Computer System
        </h1>

        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-4xl">
          Data in a computer follows a structured path: Input → Processing → Storage → Output.
          Each stage is handled by specific hardware components working together as a system.
        </p>

        <img
          src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1600&auto=format&fit=crop"
          className="w-full h-[320px] md:h-[420px] object-cover rounded-3xl border border-slate-200 dark:border-slate-800"
          alt="Computer data flow concept"
        />
      </section>

      {/* FLOW DIAGRAM */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          The Data Flow Cycle
        </h2>

        <div className="flex flex-wrap gap-3 text-sm font-semibold">
          <span className="px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300">
            INPUT
          </span>
          <span>→</span>
          <span className="px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300">
            PROCESSING
          </span>
          <span>→</span>
          <span className="px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300">
            STORAGE
          </span>
          <span>→</span>
          <span className="px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300">
            OUTPUT
          </span>
        </div>
      </section>

      {/* INPUT */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          1. Input (Input Devices)
        </h2>

        <p>
          Input refers to the process of entering data into a computer system.
          Input devices convert human-readable data into machine-readable form.
        </p>

        <div className="grid md:grid-cols-2 gap-5">

          <div className="p-5 border rounded-2xl bg-white dark:bg-slate-900 dark:border-slate-800">
            <h3 className="font-bold">What input devices do</h3>
            <p>They capture raw data and send it into the system for processing.</p>
          </div>

          <div className="p-5 border rounded-2xl bg-white dark:bg-slate-900 dark:border-slate-800">
            <h3 className="font-bold">Examples</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Keyboard</li>
              <li>Mouse</li>
              <li>Scanner</li>
              <li>Microphone</li>
              <li>Joystick</li>
              <li>Touchscreen</li>
              <li>Barcode reader</li>
              <li>Webcam</li>
            </ul>
          </div>

        </div>

        <img
          src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1600&auto=format&fit=crop"
          className="w-full h-[280px] object-cover rounded-3xl border border-slate-200 dark:border-slate-800"
          alt="Input devices"
        />
      </section>

      {/* PROCESSING */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          2. Processing (CPU)
        </h2>

        <p>
          Processing is done by the Central Processing Unit (CPU), also called the “brain of the computer”.
          It interprets instructions and performs calculations.
        </p>

        <div className="grid md:grid-cols-3 gap-5">

          <div className="p-5 border rounded-2xl bg-white dark:bg-slate-900 dark:border-slate-800">
            <h3 className="font-bold">CU (Control Unit)</h3>
            <p>Directs all operations inside the CPU and controls data flow.</p>
          </div>

          <div className="p-5 border rounded-2xl bg-white dark:bg-slate-900 dark:border-slate-800">
            <h3 className="font-bold">ALU (Arithmetic Logic Unit)</h3>
            <p>Performs calculations and logical decisions (add, compare, etc.).</p>
          </div>

          <div className="p-5 border rounded-2xl bg-white dark:bg-slate-900 dark:border-slate-800">
            <h3 className="font-bold">MU (Memory Unit)</h3>
            <p>Stores instructions and data temporarily during processing.</p>
          </div>

        </div>

        <img
          src="https://media.istockphoto.com/id/1204740322/photo/cpu.jpg?s=612x612&w=0&k=20&c=DSjrMlrtuD42yC5XHtpoc2mqGEYEjk-B-JTDK4McTK8="
          className="w-full h-[280px] object-cover rounded-3xl border border-slate-200 dark:border-slate-800"
          alt="CPU concept"
        />
      </section>

      {/* STORAGE */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          3. Storage
        </h2>

        <p>
          Storage refers to keeping data and instructions for future use.
          It is divided into Primary (Internal) and Secondary (External) memory.
        </p>

        <div className="grid md:grid-cols-2 gap-5">

          {/* PRIMARY */}
          <div className="p-5 border rounded-2xl bg-white dark:bg-slate-900 dark:border-slate-800 space-y-3">
            <h3 className="font-bold text-lg">Primary / Main / Internal Memory</h3>

            <p>
              Called <strong>internal memory</strong> because it is directly inside or very close to the CPU.
              It is fast but temporary.
            </p>

            <ul className="list-disc pl-5 space-y-1">
              <li><strong>RAM (Random Access Memory)</strong> – temporary working memory</li>
              <li><strong>ROM (Read Only Memory)</strong> – permanent startup instructions</li>
            </ul>
          </div>

          {/* SECONDARY */}
          <div className="p-5 border rounded-2xl bg-white dark:bg-slate-900 dark:border-slate-800 space-y-3">
            <h3 className="font-bold text-lg">Secondary / Auxiliary / External Memory</h3>

            <p>
              Called <strong>external memory</strong> because it is outside the CPU.
              It stores data permanently.
            </p>

            <ul className="list-disc pl-5 space-y-1">
              <li>Hard Disk Drive (HDD)</li>
              <li>Solid State Drive (SSD)</li>
              <li>USB Flash/Pen Drive</li>
              <li>Memory Cards (SD cards)</li>
              <li>External Hard Drives</li>
              <li>Optical Disks (CD/DVD)</li>
            </ul>
          </div>

        </div>

        <div className="p-5 border rounded-2xl bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900">
          <h3 className="font-bold mb-2">Memory Size Units (Decimal Standard)</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>A bit is the smallest data size.</li>
            <li>8 bits = 1 Byte</li>
            <li>1,000 Bytes = 1 KB (<strong>K</strong>ilo<strong>B</strong>yte)</li>
            <li>1,000 KB = 1 MB (<strong>M</strong>ega<strong>B</strong>yte)</li>
            <li>1,000 MB = 1 GB (<strong>G</strong>iga<strong>B</strong>yte)</li>
            <li>1,000 GB = 1 TB (<strong>T</strong>era<strong>B</strong>yte)</li>
            <li>1,000 TB = 1 PB (<strong>P</strong>eta<strong>B</strong>yte)</li>
            <li>1,000 PB = 1 ExB (<strong>E</strong>xa<strong>B</strong>yte)</li>
            <li>1,000 ExB = 1 ZB (<strong>Z</strong>eta<strong>B</strong>yte)</li>
            <li>1,000 ZB = 1 YB (<strong>Y</strong>otta<strong>B</strong>yte)</li>
          </ul>
        </div>

      </section>

      {/* OUTPUT */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          4. Output (Output Devices)
        </h2>

        <p>
          Output is the final stage where processed data is presented in a human-readable form.
        </p>

        <div className="grid md:grid-cols-2 gap-5">

          <div className="p-5 border rounded-2xl bg-white dark:bg-slate-900 dark:border-slate-800">
            <h3 className="font-bold">What output devices do</h3>
            <p>They convert processed data into visual, audio, or printed information.</p>
          </div>

          <div className="p-5 border rounded-2xl bg-white dark:bg-slate-900 dark:border-slate-800">
            <h3 className="font-bold">Examples</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Monitor / Screen</li>
              <li>Printer</li>
              <li>Speakers</li>
              <li>Headphones</li>
              <li>Projector</li>
              <li>Plotter</li>
            </ul>
          </div>

        </div>

        <img
          src="https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=1600&auto=format&fit=crop"
          className="w-full h-[280px] object-cover rounded-3xl border border-slate-200 dark:border-slate-800"
          alt="Output devices"
        />
      </section>

      {/* VIDEO */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Watch: Data Flow Explained
        </h2>

        <div className="aspect-video rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/CBf-jIn44X0"
            title="Data Flow in Computer System"
            allowFullScreen
          />
        </div>
      </section>

      {/* SUMMARY */}
      <section className="p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
        <h2 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">
          Summary
        </h2>

        <p>
          Data flows in a structured cycle: Input → Processing → Storage → Output.
          Each stage depends on dedicated hardware components working together to
          transform raw data into useful information.
        </p>
      </section>

    </div>
  );
}
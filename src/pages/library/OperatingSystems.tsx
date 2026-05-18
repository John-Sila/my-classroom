export default function OperatingSystemsTopic() {
  return (
    <div className="space-y-12 text-slate-700 dark:text-slate-300 leading-7">

      {/* HERO */}
      <section className="space-y-4">
        <span className="inline-flex items-center rounded-full bg-indigo-100 dark:bg-indigo-950/40 px-3 py-1 text-sm font-medium text-indigo-700 dark:text-indigo-400">
          System Software
        </span>

        <h1 className="text-4xl font-black text-slate-900 dark:text-white">
          Operating Systems (OS)
        </h1>

        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-4xl">
          An operating system is system software that manages computer hardware and software resources
          and provides services for computer programs.
        </p>

        <img
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop"
          alt="Operating system concept"
          className="w-full h-[320px] md:h-[420px] object-cover rounded-3xl border border-slate-200 dark:border-slate-800"
        />
      </section>

      {/* WHAT OS DOES */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          What an Operating System Does
        </h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>Manages hardware resources (CPU, memory, storage)</li>
          <li>Controls input and output devices</li>
          <li>Provides user interface (GUI / CLI)</li>
          <li>Runs applications</li>
          <li>Handles security and permissions</li>
        </ul>
      </section>

      {/* MOBILE / DESKTOP OS TABLE */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Common Operating Systems
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden text-sm">

            <thead className="bg-slate-100 dark:bg-slate-900">
              <tr>
                <th className="p-3 text-left">Operating System</th>
                <th className="p-3 text-left">Device Type</th>
                <th className="p-3 text-left">Manufacturer</th>
                <th className="p-3 text-left">Used In</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">

              <tr>
                <td className="p-3 font-medium">Windows</td>
                <td className="p-3">Desktop / Laptop</td>
                <td className="p-3">Microsoft</td>
                <td className="p-3">PCs, offices, schools</td>
              </tr>

              <tr>
                <td className="p-3 font-medium">macOS</td>
                <td className="p-3">Desktop / Laptop</td>
                <td className="p-3">Apple</td>
                <td className="p-3">MacBooks, iMac</td>
              </tr>

              <tr>
                <td className="p-3 font-medium">Linux</td>
                <td className="p-3">Desktop / Server</td>
                <td className="p-3">Open Source</td>
                <td className="p-3">Servers, developers</td>
              </tr>

              <tr>
                <td className="p-3 font-medium">Android</td>
                <td className="p-3">Mobile</td>
                <td className="p-3">Google</td>
                <td className="p-3">Smartphones, tablets</td>
              </tr>

              <tr>
                <td className="p-3 font-medium">iOS</td>
                <td className="p-3">Mobile</td>
                <td className="p-3">Apple</td>
                <td className="p-3">iPhone</td>
              </tr>

              <tr>
                <td className="p-3 font-medium">iPadOS</td>
                <td className="p-3">Tablet</td>
                <td className="p-3">Apple</td>
                <td className="p-3">iPad devices</td>
              </tr>

              <tr>
                <td className="p-3 font-medium">Chrome OS</td>
                <td className="p-3">Laptop</td>
                <td className="p-3">Google</td>
                <td className="p-3">Chromebooks</td>
              </tr>

              <tr>
                <td className="p-3 font-medium">HarmonyOS</td>
                <td className="p-3">Mobile / IoT</td>
                <td className="p-3">Huawei</td>
                <td className="p-3">Phones, smart devices</td>
              </tr>

            </tbody>
          </table>
        </div>
      </section>

      {/* KERNEL SECTION */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Linux as a Kernel
        </h2>

        <p>
          A <strong>kernel</strong> is the core part of an operating system that directly manages
          hardware resources such as CPU, memory, and devices. It acts as a bridge between OS and firmware.
        </p>

        <div className="grid md:grid-cols-2 gap-5">

          <div className="p-5 border rounded-2xl bg-white dark:bg-slate-900 dark:border-slate-800">
            <h3 className="font-bold text-lg mb-2">What Linux is</h3>
            <p>
              Linux is not a full operating system by itself — it is a kernel.
              When combined with software tools, it forms a complete OS.
            </p>
          </div>

          <div className="p-5 border rounded-2xl bg-white dark:bg-slate-900 dark:border-slate-800">
            <h3 className="font-bold text-lg mb-2">Why it matters</h3>
            <p>
              Linux powers servers, smartphones (Android), supercomputers,
              and embedded systems worldwide.
            </p>
          </div>

        </div>

        <img
          src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1600&auto=format&fit=crop"
          alt="Linux server systems"
          className="w-full h-[300px] object-cover rounded-3xl border border-slate-200 dark:border-slate-800"
        />
      </section>

      {/* LINUX DISTRIBUTIONS */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Linux-Based Operating Systems (Distributions)
        </h2>

        <p>
          These are operating systems built using the Linux kernel.
          There are many distributions, each designed for different users and purposes.
          They are mostly referred to as <strong>Linux distros</strong>.
        </p>

        <div className="grid md:grid-cols-2 gap-4">

          {[
            "Ubuntu",
            "Debian",
            "Fedora",
            "Red Hat Enterprise Linux",
            "CentOS",
            "Arch Linux",
            "Manjaro",
            "Linux Mint",
            "Kali Linux",
            "Pop!_OS",
            "openSUSE",
            "Alpine Linux",
            "Gentoo",
            "Zorin OS",
            "Elementary OS",
            "Raspberry Pi OS",
            "Oracle Linux",
            "Slackware",
            "MX Linux",
            "Parrot OS"
          ].map((os) => (
            <div
              key={os}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
            >
              {os}
            </div>
          ))}

        </div>
      </section>

      {/* VIDEO */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Watch: Operating Systems Explained
        </h2>

        <div className="aspect-video rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/26QPDBe-NB8"
            title="Operating Systems Explained"
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
          Operating systems control and manage all computer activities.
          Linux acts as a powerful kernel used in many systems worldwide,
          while modern OS platforms like Android, iOS, Windows, and macOS
          dominate personal and enterprise computing.
        </p>
      </section>

    </div>
  );
}
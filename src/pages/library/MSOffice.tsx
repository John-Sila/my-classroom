export default function MSOfficeTopic() {
  return (
    <div className="space-y-10 text-slate-700 dark:text-slate-300 leading-7">

      {/* HERO */}
      <section className="space-y-4">
        <span className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-950/40 px-3 py-1 text-sm font-medium text-blue-700 dark:text-blue-400">
          Productivity Suite
        </span>

        <h1 className="text-4xl font-black text-slate-900 dark:text-white">
          Microsoft Office (MS Office)
        </h1>

        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-4xl">
          Microsoft Office is a suite of productivity applications used globally for
          document creation, spreadsheets, presentations, email management, and data processing.
        </p>

        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop"
          alt="Microsoft Office productivity tools"
          className="w-full h-[300px] md:h-[420px] object-cover rounded-3xl border border-slate-200 dark:border-slate-800"
        />
      </section>

      {/* HISTORY */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          History & Manufacturer
        </h2>

        <p>
          Microsoft Office was developed by <strong>Microsoft Corporation</strong> and
          first released in <strong>1989 for Macintosh</strong>, followed by Windows in 1990.
        </p>

        <p>
          It was designed to unify office productivity tools into a single ecosystem
          instead of using separate standalone applications.
        </p>
      </section>

      {/* SOFTWARE TABLE */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Microsoft Office Ecosystem (Full Suite)
        </h2>

        <p className="text-slate-600 dark:text-slate-400">
          Microsoft Office has evolved into a full productivity ecosystem combining desktop, cloud, and collaboration tools.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden text-sm">
            
            <thead className="bg-slate-100 dark:bg-slate-900">
              <tr>
                <th className="text-left p-3">Software</th>
                <th className="text-left p-3">Category</th>
                <th className="text-left p-3">Purpose</th>
                <th className="text-left p-3">Core Color Theme</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">

              <tr>
                <td className="p-3 font-medium">Microsoft Word</td>
                <td className="p-3">Document</td>
                <td className="p-3">Word processing and reports</td>
                <td className="p-3 text-blue-600">Blue</td>
              </tr>

              <tr>
                <td className="p-3 font-medium">Microsoft Excel</td>
                <td className="p-3">Spreadsheet</td>
                <td className="p-3">Calculations, data analysis</td>
                <td className="p-3 text-green-600">Green</td>
              </tr>

              <tr>
                <td className="p-3 font-medium">Microsoft PowerPoint</td>
                <td className="p-3">Presentation</td>
                <td className="p-3">Slides and presentations</td>
                <td className="p-3 text-orange-500">Orange</td>
              </tr>

              <tr>
                <td className="p-3 font-medium">Microsoft Outlook</td>
                <td className="p-3">Communication</td>
                <td className="p-3">Email, calendar, contacts</td>
                <td className="p-3 text-sky-500">Sky Blue</td>
              </tr>

              <tr>
                <td className="p-3 font-medium">Microsoft Access</td>
                <td className="p-3">Database</td>
                <td className="p-3">Database creation and management</td>
                <td className="p-3 text-red-500">Red</td>
              </tr>

              <tr>
                <td className="p-3 font-medium">Microsoft OneNote</td>
                <td className="p-3">Notes</td>
                <td className="p-3">Digital notebooks and note-taking</td>
                <td className="p-3 text-purple-600">Purple</td>
              </tr>

              <tr>
                <td className="p-3 font-medium">Microsoft Teams</td>
                <td className="p-3">Collaboration</td>
                <td className="p-3">Chat, meetings, teamwork</td>
                <td className="p-3 text-indigo-600">Indigo</td>
              </tr>

              <tr>
                <td className="p-3 font-medium">Microsoft OneDrive</td>
                <td className="p-3">Cloud Storage</td>
                <td className="p-3">File storage and syncing</td>
                <td className="p-3 text-blue-500">Light Blue</td>
              </tr>

              <tr>
                <td className="p-3 font-medium">Microsoft SharePoint</td>
                <td className="p-3">Collaboration Platform</td>
                <td className="p-3">Team sites and document sharing</td>
                <td className="p-3 text-emerald-600">Green</td>
              </tr>

              <tr>
                <td className="p-3 font-medium">Microsoft Publisher</td>
                <td className="p-3">Desktop Publishing</td>
                <td className="p-3">Flyers, brochures, layouts</td>
                <td className="p-3 text-pink-600">Pink (legacy)</td>
              </tr>

            </tbody>
          </table>
        </div>
      </section>


      {/* WORD PROCESSING CONCEPTS */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Microsoft Word Concepts
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <div className="p-5 border rounded-2xl bg-white dark:bg-slate-900 dark:border-slate-800">
            <h3 className="font-bold text-lg mb-2">Text Alignment</h3>
            <p>Align text to the left, center, right, or justify for clean document formatting.</p>
          </div>

          <div className="p-5 border rounded-2xl bg-white dark:bg-slate-900 dark:border-slate-800">
            <h3 className="font-bold text-lg mb-2">Page Orientation</h3>
            <p>Choose between portrait (vertical) and landscape (horizontal) layout.</p>
          </div>

          <div className="p-5 border rounded-2xl bg-white dark:bg-slate-900 dark:border-slate-800">
            <h3 className="font-bold text-lg mb-2">Saving Documents</h3>
            <p>Use Save or Save As to store documents in formats like .docx or PDF.</p>
          </div>

          <div className="p-5 border rounded-2xl bg-white dark:bg-slate-900 dark:border-slate-800">
            <h3 className="font-bold text-lg mb-2">Formatting Tools</h3>
            <p>Includes font styles, size, bold, italic, underline, and spacing controls.</p>
          </div>

        </div>
      </section>

      {/* EXCEL CONCEPTS */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Microsoft Excel Concepts
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <div className="p-5 border rounded-2xl bg-white dark:bg-slate-900 dark:border-slate-800">
            <h3 className="font-bold text-lg mb-2">Workbook</h3>
            <p>A file containing one or more worksheets.</p>
          </div>

          <div className="p-5 border rounded-2xl bg-white dark:bg-slate-900 dark:border-slate-800">
            <h3 className="font-bold text-lg mb-2">Cell</h3>
            <p>Intersection of a row and column where data is entered.</p>
          </div>

          <div className="p-5 border rounded-2xl bg-white dark:bg-slate-900 dark:border-slate-800">
            <h3 className="font-bold text-lg mb-2">Formula Bar</h3>
            <p>Displays and edits formulas or data in a selected cell.</p>
          </div>

          <div className="p-5 border rounded-2xl bg-white dark:bg-slate-900 dark:border-slate-800">
            <h3 className="font-bold text-lg mb-2">Fill Handle</h3>
            <p>Small square used to copy or extend data patterns automatically.</p>
          </div>

        </div>

        <img
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop"
          alt="Excel spreadsheet concept"
          className="w-full h-[280px] object-cover rounded-3xl border border-slate-200 dark:border-slate-800"
        />
      </section>

      {/* POWERPOINT */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Microsoft PowerPoint Concepts
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <div className="p-5 border rounded-2xl bg-white dark:bg-slate-900 dark:border-slate-800">
            <h3 className="font-bold text-lg mb-2">Slide</h3>
            <p>A single page in a presentation.</p>
          </div>

          <div className="p-5 border rounded-2xl bg-white dark:bg-slate-900 dark:border-slate-800">
            <h3 className="font-bold text-lg mb-2">Presentation</h3>
            <p>A collection of slides displayed in sequence.</p>
          </div>

          <div className="p-5 border rounded-2xl bg-white dark:bg-slate-900 dark:border-slate-800">
            <h3 className="font-bold text-lg mb-2">Transitions</h3>
            <p>Visual effects when moving between slides.</p>
          </div>

          <div className="p-5 border rounded-2xl bg-white dark:bg-slate-900 dark:border-slate-800">
            <h3 className="font-bold text-lg mb-2">Animations</h3>
            <p>Effects applied to objects within a slide.</p>
          </div>

        </div>

        <img
          src="https://images.unsplash.com/photo-1586282391129-76a6df230234?q=80&w=1600&auto=format&fit=crop"
          alt="PowerPoint presentation"
          className="w-full h-[280px] object-cover rounded-3xl border border-slate-200 dark:border-slate-800"
        />
      </section>

      {/* SUMMARY */}
      <section className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 p-8">
        <h2 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">
          Summary
        </h2>

        <p>
          Microsoft Office is a foundational productivity ecosystem used globally in education,
          business, and administration. Mastering its tools provides essential digital literacy
          for modern computing environments.
        </p>
      </section>

    </div>
  );
}
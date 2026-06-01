import { useState } from "react";
import { lessons } from "./data/lessons";

import Sidebar from "./components/Sidebar";
import LessonPanel from "./components/LessonPanel";
import Preview from "./components/LessonPanel";

function App() {
  const [selected, setSelected] = useState(lessons[0]);

  const [activeClasses, setActiveClasses] = useState("bg-blue-500 text-white p-4 rounded-lg");

  const applyClass = (newClass) => {
    setActiveClasses((prev) => {
      let updated = prev
        .split(" ")
        .filter((c) => !c.startsWith("bg-"))
        .join(" ");

      return `${updated} ${newClass}`;
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <header className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold">
            Tailwind Playground
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid lg:grid-cols-4 gap-6">

          <Sidebar
            lessons={lessons}
            selected={selected}
            setSelected={setSelected}
          />

          <div className="lg:col-span-3 space-y-6">

            <LessonPanel
              lesson={selected}
              applyClass={applyClass}
            />

            <Preview
              activeClasses={activeClasses}
            />

          </div>

        </div>

      </main>

    </div>
  );
}

export default App;
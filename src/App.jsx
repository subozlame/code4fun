import { useState, useEffect } from "react";
import { lessons } from "./data/lessons";

import Sidebar from "./components/Sidebar";
import LessonPanel from "./components/LessonPanel";
import Preview from "./components/Preview";

function App() {
  const [selected, setSelected] = useState(lessons[0]);
  const [activeClasses, setActiveClasses] = useState(
    "bg-blue-500 text-white p-4 rounded-lg"
  );

  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [completed, setCompleted] = useState([]);

  const applyClass = (newClass, lessonId) => {
    setActiveClasses((prev) => {
      let updated = prev
        .split(" ")
        .filter((c) => !c.startsWith("bg-"))
        .join(" ");

      return `${updated} ${newClass}`;
    });

    setXp((prev) => prev + 10);

    setCompleted((prev) => {
      if (!prev.includes(lessonId)) {
        return [...prev, lessonId];
      }
      return prev;
    });
  };

  useEffect(() => {
    if (xp >= level * 100) {
      setLevel((prev) => prev + 1);
    }
  }, [xp]);

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* HEADER */}
      <header className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <h1 className="text-2xl font-bold">
            Tailwind Playground
          </h1>

          {/* XP UI */}
          <div className="flex items-center gap-6">

            <span className="text-sm text-slate-400">
              Level: {level}
            </span>

            <div className="w-40 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500"
                style={{ width: `${xp % 100}%` }}
              />
            </div>

            <span className="text-sm text-slate-400">
              XP: {xp}
            </span>

          </div>

        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid lg:grid-cols-4 gap-6">

          <Sidebar
            lessons={lessons}
            selected={selected}
            setSelected={setSelected}
            completed={completed}
          />

          <div className="lg:col-span-3 space-y-6">

            <LessonPanel
              lesson={selected}
              applyClass={applyClass}
            />

            <Preview activeClasses={activeClasses} />

          </div>

        </div>

      </main>

    </div>
  );
}

export default App;
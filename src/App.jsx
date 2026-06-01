import { useEffect, useMemo, useState } from "react";

import { lessons } from "./data/lessons";
import { challenges } from "./data/challenges";

import Sidebar from "./components/Sidebar";
import LessonPanel from "./components/LessonPanel";
import Preview from "./components/Preview";
import Challenge from "./components/Challenge";

function App() {
  // =========================
  // MODE SYSTEM
  // =========================
  const [mode, setMode] = useState("learn");

  // =========================
  // LESSON SYSTEM
  // =========================
  const [selected, setSelected] = useState(lessons[0]);

  // =========================
  // BUILDER STATE
  // =========================
  const [activeClasses, setActiveClasses] = useState(
    "bg-blue-500 text-white p-4 rounded-lg transition-all"
  );

  // =========================
  // GAMIFICATION CORE
  // =========================
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [streak, setStreak] = useState(0);
  const [lastActiveDate, setLastActiveDate] = useState(null);

  // =========================
  // PROGRESSION
  // =========================
  const [completedLessons, setCompletedLessons] = useState([]);

  // =========================
  // DAILY CHALLENGE (viral mechanic)
  // =========================
  const dailyChallenge = useMemo(() => {
    const index =
      new Date().getDate() % challenges.length;

    return challenges[index];
  }, []);

  // =========================
  // BADGES
  // =========================
  const [badges, setBadges] = useState([]);

  // =========================
  // LOAD SAVE STATE
  // =========================
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tailwind-game"));

    if (saved) {
      setXp(saved.xp || 0);
      setLevel(saved.level || 1);
      setStreak(saved.streak || 0);
      setLastActiveDate(saved.lastActiveDate || null);
      setCompletedLessons(saved.completedLessons || []);
    }
  }, []);

  // =========================
  // SAVE STATE
  // =========================
  useEffect(() => {
    localStorage.setItem(
      "tailwind-game",
      JSON.stringify({
        xp,
        level,
        streak,
        lastActiveDate,
        completedLessons,
      })
    );
  }, [xp, level, streak, lastActiveDate, completedLessons]);

  // =========================
  // STREAK SYSTEM (viral hook)
  // =========================
  const updateStreak = () => {
    const today = new Date().toDateString();

    if (lastActiveDate !== today) {
      setStreak((s) => s + 1);
      setLastActiveDate(today);
    }
  };

  // =========================
  // XP SYSTEM
  // =========================
  const addXP = (amount) => {
    setXp((prev) => prev + amount);
    updateStreak();
  };

  // =========================
  // LEVEL SYSTEM
  // =========================
  useEffect(() => {
    if (xp >= level * 120) {
      setLevel((l) => l + 1);
    }
  }, [xp]);

  // =========================
  // BADGE SYSTEM (viral reward loop)
  // =========================
  useEffect(() => {
    const newBadges = [];

    if (xp >= 100) newBadges.push("🔥 Starter");
    if (xp >= 300) newBadges.push("⚡ Builder");
    if (xp >= 600) newBadges.push("🚀 Pro Coder");
    if (streak >= 3) newBadges.push("🏆 Consistent");
    if (level >= 5) newBadges.push("👑 Master");

    setBadges(newBadges);
  }, [xp, streak, level]);

  // =========================
  // APPLY CLASS (learning mode)
  // =========================
  const applyClass = (cls, lessonId) => {
    setActiveClasses((prev) => {
      const cleaned = prev
        .split(" ")
        .filter((c) => !c.startsWith("bg-"))
        .join(" ");

      return `${cleaned} ${cls} transition-all duration-300`;
    });

    addXP(10);

    if (lessonId && !completedLessons.includes(lessonId)) {
      setCompletedLessons((prev) => [...prev, lessonId]);
    }
  };

  // =========================
  // UI
  // =========================
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* HEADER */}
      <header className="border-b border-slate-800 sticky top-0 bg-slate-950/80 backdrop-blur z-50">

        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <a href="/">
            <img src="./c4f.ico" alt="Logo" className="w-8 h-8 mr-2 rounded-full" />
          </a>
          <h1 className="text-2xl font-bold tracking-wide">
            Tailwind Quest
          </h1>

          {/* MODE SWITCH */}
          <div className="flex gap-2">
            <button
              onClick={() => setMode("learn")}
              className={`px-3 py-1 rounded ${mode === "learn"
                ? "bg-white text-black"
                : "bg-slate-800"
                }`}
            >
              Learn
            </button>

            <button
              onClick={() => setMode("challenge")}
              className={`px-3 py-1 rounded ${mode === "challenge"
                ? "bg-white text-black"
                : "bg-slate-800"
                }`}
            >
              Daily Challenge
            </button>
          </div>

          {/* STATS */}
          <div className="flex items-center gap-4 text-sm text-slate-300">

            <span>Lvl {level}</span>

            <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all"
                style={{ width: `${xp % 100}%` }}
              />
            </div>

            <span>XP {xp}</span>

            <span>🔥 {streak}</span>

          </div>

        </div>

        {/* BADGES */}
        <div className="px-6 pb-3 flex gap-2 flex-wrap">
          {badges.map((b, i) => (
            <span
              key={i}
              className="px-2 py-1 text-xs bg-yellow-500 text-black rounded-full"
            >
              {b}
            </span>
          ))}
        </div>

      </header>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid lg:grid-cols-4 gap-6">

          {/* SIDEBAR */}
          {mode === "learn" && (
            <Sidebar
              lessons={lessons}
              selected={selected}
              setSelected={setSelected}
              completed={completedLessons}
            />
          )}

          {/* CONTENT */}
          <div className="lg:col-span-3 space-y-6 ">

            {/* LEARN MODE */}
            {mode === "learn" && (
              <>
                <LessonPanel
                  lesson={selected}
                  applyClass={applyClass}
                />

                <Preview activeClasses={activeClasses} />
              </>
            )}

            {/* CHALLENGE MODE (DAILY VIRAL LOOP) */}
            {mode === "challenge" && (
              <Challenge
                challenge={dailyChallenge}
                activeClasses={activeClasses}
                setActiveClasses={setActiveClasses}
                addXP={addXP}
                className="animate-fade-in"
              />
            )}

          </div>

        </div>

      </main>

      <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 py-8">

        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">

          {/* LEFT SIDE */}
          <div className="text-center md:text-left">
            <h2 className="text-white text-lg font-semibold">
              Subodh Madai
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              © {new Date().getFullYear()} Tailwind Quest. All rights reserved.
            </p>
          </div>

          {/* RIGHT SIDE - SOCIALS */}
          <div className="flex items-center gap-4">

            {/* GitHub */}
            <a
              href="https://github.com/subozlame"
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-full bg-slate-900 hover:bg-white hover:text-black transition"
            >
              <FaGithub size={18} />
            </a>

            {/* Gmail */}
            <a
              href="mailto:jrffx86@gmail.com"
              className="p-3 rounded-full bg-slate-900 hover:bg-red-500 hover:text-white transition"
            >
              <FaEnvelope size={18} />
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-full bg-slate-900 hover:bg-blue-500 hover:text-white transition"
            >
              <FaLinkedin size={18} />
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-full bg-slate-900 hover:bg-pink-500 hover:text-white transition"
            >
              <FaInstagram size={18} />
            </a>

          </div>

        </div>
      </footer>

    </div>
  );
}

export default App;
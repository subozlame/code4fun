import { useEffect, useMemo, useState } from "react";

import { lessons } from "./data/lessons";
import { challenges } from "./data/challenges";

import Sidebar from "./components/Sidebar";
import LessonPanel from "./components/LessonPanel";
import Preview from "./components/Preview";
import Challenge from "./components/Challenge";
import FreeType from "./components/FreeType";

import {
  FaGithub,
  FaEnvelope,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";

import { Link } from "react-router-dom";

function App() {
  // =========================
  // MODE SYSTEM
  // =========================
  const [mode, setMode] = useState("learn");

  // =========================
  // FREE TYPE PAGE STATE
  // =========================
  const [freeInput, setFreeInput] = useState("");

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
  // DAILY CHALLENGE
  // =========================
  const dailyChallenge = useMemo(() => {
    const index = new Date().getDate() % challenges.length;
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
  // STREAK SYSTEM
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
  // BADGES SYSTEM
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
  // APPLY CLASS
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

      {/* ================= HEADER ================= */}
      <header className="border-b border-slate-800 sticky top-0 bg-slate-950/80 backdrop-blur z-50">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">

          {/* TOP ROW */}
          <div className="flex flex-col items-center sm:flex-row sm:justify-between gap-4">

            {/* LOGO */}
            <h1 className="text-xl sm:text-2xl font-bold">
              Tailwind Quest
            </h1>

            {/* MODE BUTTONS */}
            <div className="flex gap-2 flex-wrap justify-center">

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
                Challenge
              </button>

              <button
                onClick={() => setMode("freetype")}
                className={`px-3 py-1 rounded ${mode === "freetype"
                  ? "bg-white text-black"
                  : "bg-purple-600 hover:bg-purple-500"
                  }`}
              >
                Free Type
              </button>

            </div>

            {/* STATS */}
            <div className="text-xs sm:text-sm text-slate-300 flex gap-3 items-center">
              <span>Lvl {level}</span>

              <div className="w-20 sm:w-32 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500"
                  style={{ width: `${xp % 100}%` }}
                />
              </div>

              <span>XP {xp}</span>
              <span>🔥 {streak}</span>
            </div>

          </div>

          {/* BADGES */}
          <div className="mt-3 flex flex-wrap gap-2 justify-center sm:justify-start">
            {badges.map((b, i) => (
              <span
                key={i}
                className="px-2 py-1 text-xs bg-yellow-500 text-black rounded-full"
              >
                {b}
              </span>
            ))}
          </div>

        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid lg:grid-cols-4 gap-6">

          {mode === "learn" && (
            <Sidebar
              lessons={lessons}
              selected={selected}
              setSelected={setSelected}
              completed={completedLessons}
            />
          )}

          <div className="lg:col-span-3 space-y-6">

            {mode === "learn" && (
              <>
                <LessonPanel
                  lesson={selected}
                  applyClass={applyClass}
                />

                <Preview activeClasses={activeClasses} />
              </>
            )}

            {mode === "challenge" && (
              <Challenge
                challenge={dailyChallenge}
                activeClasses={activeClasses}
                setActiveClasses={setActiveClasses}
                addXP={addXP}
              />
            )}
            {mode === "freetype" && (
              <FreeType />
            )}

          </div>
        </div>

      </main>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-slate-800 py-8 text-slate-400">

        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">

          <p>© {new Date().getFullYear()} Tailwind Quest</p>

          <div className="flex gap-4">

            <FaGithub className="cursor-pointer hover:text-white" />
            <FaEnvelope className="cursor-pointer hover:text-white" />
            <FaLinkedin className="cursor-pointer hover:text-white" />
            <FaInstagram className="cursor-pointer hover:text-white" />

          </div>

        </div>
      </footer>

    </div>
  );
}

export default App;
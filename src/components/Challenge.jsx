import { useState } from "react";

function Challenge({ challenge, activeClasses, setActiveClasses, addXP }) {
    const [message, setMessage] = useState("");

    const checkAnswer = () => {
        const userClasses = activeClasses.split(" ");

        const isCorrect = challenge.solution.every((cls) =>
            userClasses.includes(cls)
        );

        if (isCorrect) {
            setMessage("🎉 Correct! +50 XP");
            addXP(50);
        } else {
            setMessage("❌ Not quite. Try again!");
        }
    };

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-3xl mx-auto mt-10">

            <h2 className="text-2xl font-bold">{challenge.title}</h2>

            <p className="text-slate-400 mt-2">
                {challenge.description}
            </p>

            {/* Preview */}
            <div className="bg-slate-950 min-h-[200px] mt-6 flex items-center justify-center rounded-lg">
                <div className={activeClasses}>
                    Try Me
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mt-6">

                <button
                    onClick={checkAnswer}
                    className="px-4 py-2 bg-green-500 text-black rounded-lg"
                >
                    Check Answer
                </button>

                <button
                    onClick={() => setActiveClasses("")}
                    className="px-4 py-2 bg-slate-700 rounded-lg"
                >
                    Reset
                </button>

            </div>

            {message && (
                <p className="mt-4 text-cyan-400">
                    {message}
                </p>
            )}

        </div>
    );
}

export default Challenge;
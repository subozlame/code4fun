import { useState } from "react";

function FreeType() {
    const [classes, setClasses] = useState(
        "bg-blue-500 text-white p-4 rounded-lg"
    );

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">

            <h2 className="text-2xl font-bold mb-2">
                Free Type Playground
            </h2>

            <p className="text-slate-400 mb-6">
                Type any Tailwind CSS classes and see the result instantly.
            </p>

            <textarea
                value={classes}
                onChange={(e) => setClasses(e.target.value)}
                placeholder="bg-red-500 text-white p-8 rounded-xl"
                className="w-full h-32 bg-slate-950 border border-slate-700 rounded-lg p-4 outline-none"
            />

            <div className="mt-8 bg-slate-950 rounded-lg min-h-[250px] flex items-center justify-center">

                <div className={classes}>
                    Live Preview
                </div>

            </div>

        </div>
    );
}

export default FreeType;
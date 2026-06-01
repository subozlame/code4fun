import { useState } from 'react';

function Playground() {
    const [classes, setClasses] = useState(
        "bg-blue-500 text-white p-4 rounded-lg"
    );

    return (
        <div className="grid lg:grid-cols-2 gap-8">

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-60">
                <h2 className="text-2xl font-bold mb-4">
                    Try Tailwind Classes
                </h2>

                <textarea
                    value={classes}
                    onChange={(e) => setClasses(e.target.value)}
                    className="w-full h-40 bg-slate-950 border border-slate-700 rounded-lg p-4 outline-none"
                    placeholder="Enter Tailwind classes..."
                />
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h2 className="text-2xl font-bold mb-4">
                    Live Result
                </h2>

                <div className="bg-slate-950 rounded-lg min-h-[250px] flex items-center justify-center p-4">
                    <div className={classes}>
                        Hello Tailwind!
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Playground;










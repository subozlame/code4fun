function Preview({ activeClasses }) {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">

            <h2 className="text-2xl font-bold mb-4">Preview</h2>

            <div className="bg-slate-950 min-h-[300px] rounded-lg flex items-center justify-center">

                <div className={activeClasses}>
                    Hello Tailwind!
                </div>

            </div>

        </div>
    );
}

export default Preview;
function Sidebar({ lessons, selected, setSelected, completed }) {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">

            <h2 className="text-xl font-bold mb-4">Lessons</h2>

            <div className="space-y-2">
                {lessons.map((lesson) => (
                    <button
                        key={lesson.id}
                        onClick={() => setSelected(lesson)}
                        className={`w-full text-left p-3 rounded-lg flex justify-between ${selected.id === lesson.id
                                ? "bg-white text-black"
                                : "hover:bg-slate-800"
                            }`}
                    >
                        {lesson.title}

                        {completed.includes(lesson.id) && (
                            <span className="text-green-400">✔</span>
                        )}
                    </button>
                ))}
            </div>

        </div>
    );
}

export default Sidebar;
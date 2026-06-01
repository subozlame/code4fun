function Sidebar({ lessons, selected, setSelected }) {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">

            <h2 className="text-xl font-bold mb-4">
                Lessons
            </h2>

            <div className="space-y-2">
                {lessons.map((lesson) => (
                    <button
                        key={lesson.id}
                        onClick={() => setSelected(lesson)}
                        className={`w-full text-left p-3 rounded-lg transition ${selected.id === lesson.id
                            ? "bg-white text-black"
                            : "hover:bg-slate-800"
                            }`}
                    >
                        {lesson.title}
                    </button>
                ))}
            </div>

        </div>
    );
}

export default Sidebar;
function LessonPanel({ lesson, applyClass }) {
    if (!lesson) {
        return (
            <div className="bg-slate-900 p-6 rounded-xl">
                Loading lesson...
            </div>
        );
    }

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">

            <h2 className="text-2xl font-bold">{lesson.title}</h2>

            <p className="text-slate-400 mt-2">{lesson.description}</p>

            <div className="mt-6 flex flex-wrap gap-3">
                {lesson.examples.map((example) => (
                    <button
                        key={example}
                        onClick={() => applyClass(example, lesson.id)}
                        className="px-4 py-2 bg-slate-800 rounded-lg hover:bg-slate-700"
                    >
                        {example}
                    </button>
                ))}
            </div>

        </div>
    );
}

export default LessonPanel;
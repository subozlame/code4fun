function LessonPanel({ lesson, applyClass }) {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">

            <h2 className="text-2xl font-bold">
                {lesson.title}
            </h2>

            <div className="bg-slate-950 min-h-[300px] rounded-lg flex items-center justify-center">

                <div className={activeClasses}>
                    Hello Tailwind!
                </div>
            </div>


        </div>
    );
}

export default Preview;
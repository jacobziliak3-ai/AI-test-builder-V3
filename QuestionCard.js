export default function QuestionCard({ q, index }){
  const letters = ["A","B","C","D"];
  return (
    <div className="rounded-2xl p-5 bg-white/5 border border-white/10">
      <div className="flex gap-3">
        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 grid place-items-center font-bold">{index+1}</div>
        <div className="flex-1">
          <p className="text-lg">{q.prompt}</p>
          <ul className="mt-3 space-y-2">
            {q.choices?.map((c,i)=>{
              const letter = letters[i];
              const correct = q.correct === letter;
              return (
                <li key={i} className={`rounded-xl border px-3 py-2 ${correct ? "border-emerald-400/40 bg-emerald-400/10" : "border-white/10 bg-white/5"}`}>
                  <span className={`font-semibold mr-2 ${correct ? "text-emerald-300":"text-white/70"}`}>{letter}.</span>
                  <span className="text-white/90">{c}</span>
                </li>
              );
            })}
          </ul>
          {q.explanation && <p className="mt-2 text-white/70 text-sm"><span className="font-semibold text-emerald-300">Why:</span> {q.explanation}</p>}
        </div>
      </div>
    </div>
  );
}

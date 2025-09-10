"use client";
import { useState } from "react";
import QuestionCard from "@/components/QuestionCard";

export default function Home(){
  const [subject,setSubject]=useState("");
  const [grade,setGrade]=useState("9th");
  const [difficulty,setDifficulty]=useState("medium");
  const [numQuestions,setNumQuestions]=useState(6);
  const [data,setData]=useState(null);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");

  async function generate(){
    setLoading(true);setError("");setData(null);
    try{
      const res=await fetch("/api/generate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({subject,grade,difficulty,numQuestions})});
      const json=await res.json();
      if(!res.ok) throw new Error(json.error||"Failed");
      setData(json);
    }catch(e){ setError(e.message);} finally{ setLoading(false); }
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-300 via-fuchsia-300 to-cyan-300 text-transparent bg-clip-text">AI Test Builder (Minimal)</h1>
      <p className="text-white/70 mt-2">Generate multiple-choice questions with correct answers—live.</p>

      <div className="mt-4 grid md:grid-cols-3 gap-4">
        <div className="md:col-span-1 bg-white/5 border border-white/10 rounded-2xl p-4">
          <label className="block text-sm text-white/70">Subject
            <input value={subject} onChange={e=>setSubject(e.target.value)} placeholder="e.g., Algebra, Biology" className="mt-1 w-full rounded-lg bg-white/10 border border-white/10 px-3 py-2 outline-none"/>
          </label>
          <label className="block text-sm text-white/70 mt-3">Grade
            <select value={grade} onChange={e=>setGrade(e.target.value)} className="mt-1 w-full rounded-lg bg-white/10 border border-white/10 px-3 py-2">
              {["6th","7th","8th","9th","10th","11th","12th"].map(g=>(<option key={g} value={g}>{g}</option>))}
            </select>
          </label>
          <label className="block text-sm text-white/70 mt-3">Difficulty
            <select value={difficulty} onChange={e=>setDifficulty(e.target.value)} className="mt-1 w-full rounded-lg bg-white/10 border border-white/10 px-3 py-2">
              {["easy","medium","hard"].map(d=>(<option key={d} value={d}>{d}</option>))}
            </select>
          </label>
          <label className="block text-sm text-white/70 mt-3">Number of Questions
            <input type="number" min="1" max="20" value={numQuestions} onChange={e=>setNumQuestions(Number(e.target.value))} className="mt-1 w-full rounded-lg bg-white/10 border border-white/10 px-3 py-2"/>
          </label>
          <button onClick={generate} disabled={loading} className="mt-4 w-full rounded-xl bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-cyan-300 text-black font-bold py-2">
            {loading? "Generating..." : "Generate Test"}
          </button>
          {error && <div className="mt-3 text-sm text-rose-300 bg-rose-500/10 border border-rose-400/20 p-2 rounded">{error}</div>}
        </div>

        <div className="md:col-span-2 space-y-4">
          {!data && !loading && <div className="rounded-2xl p-6 bg-white/5 border border-dashed border-white/20 text-white/70">Fill the form and click Generate.</div>}
          {data && (
            <div className="space-y-4">
              <div className="rounded-2xl p-4 bg-white/5 border border-white/10">
                <h2 className="text-xl font-semibold">{data.metadata?.title || "Generated Test"}</h2>
                <p className="text-white/70 text-sm mt-1">{data.metadata?.subject} • {data.metadata?.grade} • {data.metadata?.difficulty} • {data.metadata?.num_questions} questions</p>
              </div>
              <ol className="list-decimal pl-5 space-y-4">
                {data.questions?.map((q,idx)=>(<li key={q.id??idx}><QuestionCard q={q} index={idx}/></li>))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

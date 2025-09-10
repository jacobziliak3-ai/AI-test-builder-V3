import OpenAI from "openai";

export async function POST(req){
  try{
    const { subject, grade, difficulty, numQuestions } = await req.json();
    if(!process.env.OPENAI_API_KEY){
      return new Response(JSON.stringify({ error: "Missing OPENAI_API_KEY" }), { status: 500 });
    }
    if(!subject || !grade || !numQuestions){
      return new Response(JSON.stringify({ error: "subject, grade, numQuestions required" }), { status: 400 });
    }
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const system = `You are an expert K-12 assessment designer. Output strict JSON: {
      "metadata":{"title":string,"subject":string,"grade":string,"difficulty":string,"num_questions":number},
      "questions":[{"id":number,"type":"multiple_choice","prompt":string,"choices":[string,string,string,string],"correct":"A"|"B"|"C"|"D","explanation":string}]
    } Return only JSON with no extra text.`;
    const user = `Create a ${numQuestions}-question multiple-choice test.
Subject: ${subject}
Grade: ${grade}
Difficulty: ${difficulty||"medium"}
Include 4 choices (A-D) and mark the correct letter and explanation.`;
    const resp = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role:"system", content: system }, { role:"user", content: user }],
      temperature: 0.2,
      max_tokens: 1200
    });
    const content = resp.choices?.[0]?.message?.content || "";
    let data;
    try{ data = JSON.parse(content); } catch(e){ return new Response(JSON.stringify({ error:"Model returned invalid JSON", raw: content }), { status: 502 }); }
    return new Response(JSON.stringify(data), { status: 200, headers: { "Content-Type":"application/json" } });
  }catch(err){
    return new Response(JSON.stringify({ error: err.message || "Server error" }), { status: 500 });
  }
}

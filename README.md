# AI Test Builder (Minimal, Vercel-ready)
Minimal Next.js + Tailwind app with a working /api/generate that calls OpenAI.
Only env var needed: OPENAI_API_KEY. Node 18.x.

## Deploy to Vercel
1) Push this folder to a GitHub repo (top level must contain `package.json` and `app/`).
2) In Vercel: New Project → Import repo. Root Directory = `./`, Node = 18.x.
3) Add env var in Project Settings → Environment Variables:
   - `OPENAI_API_KEY` = your key
4) Deploy.

## Run locally
```
npm install
OPENAI_API_KEY=... npm run dev
```

# SafeShop AI

Simulated AI shopping agent for the **Razorpay AI Buildathon 2026**, Track 1: AI Growth & Agentic Commerce.

**TEST / SIMULATION ONLY.** No real money and no real financial transactions.

## Step 0 — local setup

You need [Node.js](https://nodejs.org/) 20 or newer.

```bash
npm install
npx prisma migrate dev --name init
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).  
Database check: [http://localhost:3000/api/health](http://localhost:3000/api/health)

Copy `.env.example` to `.env` if you do not already have a `.env` file. Leave Razorpay and LLM keys empty until later steps.

## Stack (MVP)

- Next.js (App Router) + TypeScript + Tailwind CSS
- Prisma + SQLite
- Razorpay Test Mode (later)
- LLM as a planner only (later)

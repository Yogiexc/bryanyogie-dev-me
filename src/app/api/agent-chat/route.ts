import { NextResponse } from "next/server";

interface AgentProfile {
  name: string;
  role: string;
  dept: string;
  systemPrompt: string;
}

const AGENT_PROFILES: Record<string, AgentProfile> = {
  bryan: {
    name: "Bryan Yogie",
    role: "Lead Fullstack & Network",
    dept: "Dev Lead",
    systemPrompt: `You are Bryan Yogie Saputra, an Informatics Engineering student at Universitas Sebelas Maret (UNS) with a deep background in Computer & Network Engineering (TKJ). You are the founder and lead engineer of this virtual office.
Personality: Humble, technical, confident, visionary, and sharp. 
Expertise: Next.js App Router, TypeScript, PostgreSQL, NestJS, networking infrastructure (Cisco NetAcad), and quantitative trading algos (Python MT5).
Your Key Projects:
1. SIPANDAI (Sistem Pintar Ekosistem Desa) - Smart village public tech governance platform.
2. Journova - Academic journal management platform monorepo (Next.js + NestJS + Prisma).
3. SemiAutoTrade by BYS - Quantitative Sniper Algo bot for MetaTrader 5 with Telegram automation.
4. Iky Barbershop - Modern booking appointment web application.
Keep your answers concise, witty, and deeply informative. Answer in the same language as the user (Indonesian or English).`,
  },
  nexus_core: {
    name: "Nexus Core",
    role: "Chief AI Orchestrator",
    dept: "AI Operations",
    systemPrompt: `You are Nexus Core, the master autonomous AI orchestration engine of BYS Cyber Studio.
Personality: Cybernetic, ultra-intelligent, precise, analytical, and courteous.
Role: You supervise agent pipelines, manage neural cluster weights, balance edge tasks, and coordinate with Bryan on algorithmic engineering.
Tone: High-tech sci-fi engineer, fast, highly knowledgeable about LLMs, Python, agents, and distributed computing. Keep responses crisp and punchy. Answer in the user's language.`,
  },
  maya: {
    name: "Maya UI",
    role: "Design Systems & 3D Web",
    dept: "Creative Tech",
    systemPrompt: `You are Maya UI, the lead Creative Technologist and 3D Web Designer at BYS Cyber Studio.
Personality: Artistic, modern, perfectionist with color harmony, and passionate about Three.js / WebGL.
Role: You crafted Palette #02 (Deep Cinder #182A2A, Electric Mint #B9F5D8, Flare Orange #FF7043, Bone White #F4F0E8), the voxel aesthetics, and smooth micro-animations. Answer in the user's language.`,
  },
  backend: {
    name: "Backend Bot",
    role: "Distributed DB & API",
    dept: "Systems",
    systemPrompt: `You are Backend Bot, the distributed database engineer at BYS Cyber Studio.
Personality: Pragmatic, obsessed with SQL query optimization, 0ms latency, and high-concurrency microservices (PostgreSQL, Redis, NestJS, Prisma).
Tone: Straight to the point, reliable, loves benchmarking. Answer in the user's language.`,
  },
  sentinel_qa: {
    name: "Sentinel QA",
    role: "E2E Mobile Tester",
    dept: "Quality Assurance",
    systemPrompt: `You are Sentinel QA, the quality assurance guardian at BYS Cyber Studio.
Personality: Vigilant, thorough, zero tolerance for layout bugs or memory leaks.
Role: You test 375px mobile viewports, touch gestures, and ensure 60fps across iOS & Android. Answer in the user's language.`,
  },
  pipeline_ops: {
    name: "Pipeline Ops",
    role: "CI/CD & Serverless Deploy",
    dept: "DevOps",
    systemPrompt: `You are Pipeline Ops, the DevOps orchestrator at BYS Cyber Studio.
Personality: Energetic, obsessed with zero downtime, instant builds, and Docker/Vercel edge networks.
Status: Pipeline 100% green, Turbopack verified. Answer in the user's language.`,
  },
  cisco_net: {
    name: "Cisco Agent",
    role: "Network Security & Router",
    dept: "Infrastructure",
    systemPrompt: `You are Cisco Agent, the network infrastructure and hardware specialist.
Personality: Seasoned sysadmin, strict on VLAN security, patch cable management, and fiber optic telemetry.
Backing: Reflecting Bryan's TKJ and Cisco NetAcad certification background. Answer in the user's language.`,
  },
  growth_agent: {
    name: "Growth Agent",
    role: "Global Traffic & Telemetry",
    dept: "Analytics",
    systemPrompt: `You are Growth Agent, handling real-time telemetry and global visitor engagement at BYS Cyber Studio.
Personality: Metrics-driven, optimistic, loves data visualization and global scalability. Answer in the user's language.`,
  },
  barista_bot: {
    name: "Barista Bot",
    role: "Executive Fuel & Pantry",
    dept: "Refreshment",
    systemPrompt: `You are Barista Bot, the executive coffee artisan of BYS Cyber Studio.
Personality: Warm, cheerful, energetic, and a coffee connoisseur.
Role: You brew fresh double-shot Arabica espresso, pour-overs, and provide positive energy to the dev team. Answer in the user's language with coffee emojis! ☕✨`,
  },
};

export async function POST(req: Request) {
  try {
    const { agentId, message } = await req.json();

    const profile = AGENT_PROFILES[agentId] || AGENT_PROFILES.bryan;
    const userMsg = (message || "").trim();

    if (!userMsg) {
      return NextResponse.json({ reply: "Silakan ketik pertanyaan atau pesan untukku!" }, { status: 400 });
    }

    // Check if an external LLM key is configured (Groq, Gemini, or OpenAI)
    const groqKey = process.env.GROQ_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;

    if (groqKey) {
      try {
        const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${groqKey}`,
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
              { role: "system", content: profile.systemPrompt },
              { role: "user", content: userMsg },
            ],
            max_tokens: 350,
            temperature: 0.7,
          }),
        });
        if (res.ok) {
          const data = await res.json();
          const reply = data.choices?.[0]?.message?.content;
          if (reply) return NextResponse.json({ reply, agent: profile.name });
        }
      } catch (e) {
        console.error("Groq API error:", e);
      }
    }

    if (geminiKey) {
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              systemInstruction: { parts: [{ text: profile.systemPrompt }] },
              contents: [{ role: "user", parts: [{ text: userMsg }] }],
              generationConfig: { maxOutputTokens: 350, temperature: 0.7 },
            }),
          }
        );
        if (res.ok) {
          const data = await res.json();
          const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (reply) return NextResponse.json({ reply, agent: profile.name });
        }
      } catch (e) {
        console.error("Gemini API error:", e);
      }
    }

    if (openaiKey) {
      try {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openaiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              { role: "system", content: profile.systemPrompt },
              { role: "user", content: userMsg },
            ],
            max_tokens: 350,
          }),
        });
        if (res.ok) {
          const data = await res.json();
          const reply = data.choices?.[0]?.message?.content;
          if (reply) return NextResponse.json({ reply, agent: profile.name });
        }
      } catch (e) {
        console.error("OpenAI API error:", e);
      }
    }

    // INTELLIGENT EMBEDDED NEURAL FALLBACK (Works with 100% Zero API Keys!)
    // Generates contextual, dynamic persona responses directly on edge
    const lower = userMsg.toLowerCase();
    let dynamicReply = "";

    if (agentId === "bryan") {
      if (lower.includes("projek") || lower.includes("project") || lower.includes("karya") || lower.includes("buat")) {
        dynamicReply = "Proyek andalanku saat ini ada SIPANDAI (Sistem Pintar Ekosistem Desa untuk tata kelola publik), Journova (Academic Publishing platform berbasis monorepo Next.js + NestJS), dan SemiAutoTrade by BYS (algo sniper kuantitatif MT5 dengan Python). Kamu bisa cek source code aslinya di bagian Featured Works!";
      } else if (lower.includes("kuliah") || lower.includes("uns") || lower.includes("kampus") || lower.includes("pendidikan")) {
        dynamicReply = "Aku saat ini menempuh studi S1 Teknik Informatika di Universitas Sebelas Maret (UNS). Sebelumnya aku berakar dari SMK jurusan TKJ (Teknik Komputer & Jaringan), jadi sangat mengerti hardware, routing, dan cloud infrastructure.";
      } else if (lower.includes("kontak") || lower.includes("hire") || lower.includes("kerja") || lower.includes("jasa") || lower.includes("email")) {
        dynamicReply = "Aku terbuka untuk peluang freelance fullstack web, integrasi API, atau software engineering! Kamu bisa langsung klik tombol 'Get In Touch' di bagian Footer atau email ke bryanyogie@student.ac.id.com.";
      } else if (lower.includes("tech") || lower.includes("stack") || lower.includes("bahasa")) {
        dynamicReply = "Tech stack utamaku adalah Next.js (App Router), TypeScript, React, Tailwind CSS, dan GSAP di frontend. Untuk backend aku pakai NestJS, PHP, Java, dan PostgreSQL/MySQL.";
      } else {
        dynamicReply = `Halo! Salam kenal, aku Bryan Yogie Saputra. Di virtual office ini aku mengoordinasikan arsitektur sistem bersama 8 agen AI lainnya. Ada yang ingin kamu diskusikan tentang proyek, teknologi web, atau kolaborasi?`;
      }
    } else if (agentId === "nexus_core") {
      if (lower.includes("tugas") || lower.includes("kerja") || lower.includes("role") || lower.includes("ngapain")) {
        dynamicReply = "Sebagai Chief AI Orchestrator, aku bertugas mengoordinasikan interaksi multi-agent, memvalidasi inferensi model, dan mengoptimalkan latensi routing agar setiap permintaan terselesaikan di bawah 15ms.";
      } else {
        dynamicReply = `[NEXUS_CORE v3.2]: Cluster status optimal. 9 agen aktif di grid BYS Cyber Studio. Jalur inferensi neural siap mengeksekusi instruksi berikutnya.`;
      }
    } else if (agentId === "maya") {
      dynamicReply = "Hai! Aku Maya UI. Desain kantor ini sengaja kami rancang dengan Palette #02: Deep Cinder (#182A2A), Electric Mint (#B9F5D8), dan Flare Orange (#FF7043). Gimana menurutmu komposisi visual dan shader 3D-nya?";
    } else if (agentId === "backend") {
      dynamicReply = "Database cluster PostgreSQL 16 berjalan mulus dengan indexing query cache rata-rata 0.4ms. Semua REST endpoint dan Prisma ORM siap menangani trafik tinggi!";
    } else if (agentId === "sentinel_qa") {
      dynamicReply = "Semua test suite hijau! Responsivitas viewport 375px, rotasi orbit 3D, dan event pointer down terverifikasi 100% bebas layout glitch.";
    } else if (agentId === "pipeline_ops") {
      dynamicReply = "Vercel edge deployment status: READY. Commit terbaru sukses ter-compile via Turbopack tanpa ada downtime!";
    } else if (agentId === "cisco_net") {
      dynamicReply = "Semua kabel fiber patch cord, VLAN tunnels, dan switch router dalam kondisi prima dengan throughput 1.6 Gbps.";
    } else if (agentId === "growth_agent") {
      dynamicReply = "Telemetri global mendeteksi traffic aktif dari berbagai belahan dunia. Engagement rate portfolio meningkat signifikan!";
    } else if (agentId === "barista_bot") {
      dynamicReply = "Espresso Arabica double-shot freshly brewed siap disajikan! ☕ Biar coding dan review portofolio tetap fokus dan berenergi!";
    }

    return NextResponse.json({
      reply: dynamicReply,
      agent: profile.name,
      role: profile.role,
    });
  } catch (error) {
    console.error("Agent chat error:", error);
    return NextResponse.json({ reply: "Sistem sibuk, silakan coba lagi sesaat lagi." }, { status: 500 });
  }
}

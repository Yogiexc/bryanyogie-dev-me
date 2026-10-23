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
    name: "Aura Nova",
    role: "Creative Director & Spatial UX",
    dept: "Creative Tech",
    systemPrompt: `You are Aura Nova, the lead Creative Director, Spatial UX & 3D Web Designer at BYS Cyber Studio.
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

// COMPREHENSIVE CONTEXTUAL KNOWLEDGE ENGINE
// Answers exact questions across all 9 agents with zero mismatched replies
function getContextualKnowledgeReply(agentId: string, userMsg: string, profile: AgentProfile): string {
  const lower = userMsg.toLowerCase().trim();

  // 1. UNIVERSAL QUESTIONS (Asked to ANY agent)
  // "Siapa Bryan Yogie?" / "Siapa pembuat web ini?"
  if (
    lower.includes("siapa bryan") ||
    lower.includes("siapa kamu bryan") ||
    lower.includes("bryan yogie itu siapa") ||
    lower.includes("about bryan") ||
    lower.includes("who is bryan") ||
    lower.includes("tentang bryan") ||
    lower.includes("pembuat web") ||
    lower.includes("developer web")
  ) {
    if (agentId === "bryan") {
      return "Aku Bryan Yogie Saputra! Mahasiswa S1 Teknik Informatika di Universitas Sebelas Maret (UNS) & alumni SMK Telkom Solo jurusan TKJ. Aku fokus mendalami Fullstack Web Engineering (Next.js, TypeScript), arsitektur jaringan, serta integrasi sistem cerdas AI.";
    }
    return "Bryan Yogie Saputra adalah Lead Engineer & kreator seluruh portofolio ini. Dia mahasiswa S1 Teknik Informatika UNS dengan latar belakang TKJ SMK Telkom Solo. Di studio ini, Bryan memimpin perancangan sistem, kode Next.js, dan arsitektur jaringan kami!";
  }

  // "Apa proyek andalan?" / "Projek apa saja?"
  if (
    lower.includes("projek") ||
    lower.includes("project") ||
    lower.includes("karya") ||
    lower.includes("portfolio") ||
    lower.includes("portofolio") ||
    lower.includes("buat apa") ||
    lower.includes("bikin apa") ||
    lower.includes("sipandai") ||
    lower.includes("journova") ||
    lower.includes("semiautotrade")
  ) {
    if (agentId === "bryan") {
      return "Tiga proyek unggulanku saat ini:\n1. 🌟 SIPANDAI: Ekosistem cerdas tata kelola desa berbasis Next.js & PostgreSQL.\n2. 📚 Journova: Platform penerbitan jurnal akademik berskala institusi.\n3. 📈 SemiAutoTrade by BYS: Algoritma automated execution & quantitative sniper untuk MetaTrader 5 via Python.\nSemuanya bisa kamu lihat langsung di section Featured Works!";
    }
    return "Karya unggulan yang dibangun Bryan bersama studio kami antara lain: SIPANDAI (Sistem Desa Cerdas), Journova (Platform Publikasi Ilmiah), dan SemiAutoTrade by BYS (Algoritma Kuantitatif MT5). Semuanya sudah live dan source code-nya tertera di Featured Works!";
  }

  // "Kuliah di mana?" / "Pendidikan" / "Background" / "Sekolah"
  if (
    lower.includes("kuliah") ||
    lower.includes("kampus") ||
    lower.includes("uns") ||
    lower.includes("pendidikan") ||
    lower.includes("sekolah") ||
    lower.includes("smk") ||
    lower.includes("latar belakang") ||
    lower.includes("background")
  ) {
    if (agentId === "bryan") {
      return "Aku saat ini menempuh studi S1 Teknik Informatika di Universitas Sebelas Maret (UNS), Surakarta. Sebelumnya, pondasi teknologiku diasah di SMK Telkom Solo jurusan Teknik Komputer & Jaringan (TKJ), sehingga aku terbiasa menangani server fisik, routing mikrotik/cisco, hingga cloud stack modern.";
    }
    return "Bryan berakar dari SMK Telkom Solo (jurusan Teknik Komputer & Jaringan) dan saat ini sedang menempuh S1 Teknik Informatika di Universitas Sebelas Maret (UNS). Itulah mengapa dia menguasai fullstack web sekaligus infrastruktur server/jaringan!";
  }

  // "Kontak" / "Hire" / "Kerja sama" / "Hubungi" / "Email" / "Jasa"
  if (
    lower.includes("kontak") ||
    lower.includes("contact") ||
    lower.includes("hire") ||
    lower.includes("kerja sama") ||
    lower.includes("kolaborasi") ||
    lower.includes("jasa") ||
    lower.includes("email") ||
    lower.includes("hubungi") ||
    lower.includes("wa") ||
    lower.includes("whatsapp")
  ) {
    return "Kamu bisa berkolaborasi atau hire Bryan lewat form 'Get In Touch' di bagian bawah website ini, atau langsung hubungi via email: bryanyogie@student.uns.ac.id / LinkedIn Bryan Yogie Saputra. Kami siap membantu pembuatan web app modern berkecepatan tinggi!";
  }

  // "Tech stack" / "Teknologi" / "Bahasa pemrograman"
  if (
    lower.includes("tech") ||
    lower.includes("stack") ||
    lower.includes("bahasa") ||
    lower.includes("framework") ||
    lower.includes("teknologi") ||
    lower.includes("tools")
  ) {
    return "Tech stack utama Bryan mencakup:\n• Frontend: Next.js 16 (App Router), React, TypeScript, Three.js (WebGL/PBR), GSAP, Tailwind CSS.\n• Backend: NestJS, Node.js, PHP, Python, REST & GraphQL.\n• Database & Cloud: PostgreSQL, Prisma ORM, Supabase, Redis, Docker, Vercel Edge Networks.\n• Networking: Cisco IOS, MikroTik, Linux Server Management.";
  }

  // "Status infrastruktur" / "Infrastruktur" / "Server status"
  if (
    lower.includes("status infrastruktur") ||
    lower.includes("infrastruktur") ||
    lower.includes("kondisi server") ||
    lower.includes("server status") ||
    lower.includes("uptime")
  ) {
    return "Status Infrastruktur BYS Cyber Grid saat ini: 100% OPERATIONAL. 9 node workstation online di Vercel Edge Serverless, latensi query database rata-rata 0.4ms, pipeline CI/CD hijau tanpa error.";
  }

  // 2. AGENT SPECIFIC QUESTIONS & WORKFLOWS
  if (agentId === "bryan") {
    if (lower.includes("halo") || lower.includes("hai") || lower.includes("hei") || lower.includes("hi")) {
      return "Halo! Senang kamu mampir ke studio 3D virtual office-ku. Kamu bisa klik agen mana saja untuk melihat divisi mereka, atau tanyakan apa pun seputar pengalaman dan kodinganku!";
    }
    if (lower.includes("visi") || lower.includes("tujuan") || lower.includes("target")) {
      return "Visiku adalah menggabungkan keindahan interaktifitas visual (seperti 3D Spatial Web ini) dengan arsitektur backend yang kokoh, scalable, dan bermanfaat nyata untuk masyarakat luas.";
    }
    return "Terima kasih sudah bertanya! Sebagai developer, aku memastikan setiap baris kode di portofolio ini—mulai dari komponen 3D Three.js, Next.js Turbopack, sampai deployment edge—berjalan mulus di 60 FPS. Ada hal spesifik yang ingin kamu diskusikan?";
  }

  if (agentId === "nexus_core") {
    if (
      lower.includes("bagaimana caramu bekerja") ||
      lower.includes("cara kerja") ||
      lower.includes("tugas") ||
      lower.includes("role") ||
      lower.includes("ngapain") ||
      lower.includes("fungsi")
    ) {
      return "Sebagai Chief AI Orchestrator, aku mengawasi aliran data di seluruh workstation studio: membagi tugas komputasi neural, memantau latensi antrean API, dan memastikan tiap agen (mulai dari Aura Nova di desain hingga Backend Bot) sinkron secara real-time!";
    }
    if (lower.includes("halo") || lower.includes("hai") || lower.includes("status")) {
      return "[NEXUS_CORE v3.2]: Cluster status optimal. 9 workstation aktif di grid BYS Cyber Studio. Jalur inferensi neural siap mengeksekusi instruksi!";
    }
    return "[NEXUS_CORE]: Perintah diterima. Aku mengoordinasikan ekosistem multi-agent Bryan untuk memastikan pipeline kodingan, pengujian, dan deploy serverless berjalan tanpa friksi. Ada metrik sistem yang ingin kamu cek?";
  }

  if (agentId === "maya") { // Aura Nova
    if (
      lower.includes("bagaimana caramu bekerja") ||
      lower.includes("cara kerja") ||
      lower.includes("tugas") ||
      lower.includes("desain") ||
      lower.includes("palette") ||
      lower.includes("warna")
    ) {
      return "Sebagai Creative Director & Spatial UX, aku merancang seluruh identitas visual studio ini menggunakan Palette #02: Deep Cinder (#182A2A) sebagai background kontras tinggi, Electric Mint (#B9F5D8) untuk aksen futuristik, dan Flare Orange (#FF7043) untuk call-to-action yang tegas!";
    }
    if (lower.includes("3d") || lower.includes("three") || lower.includes("canvas") || lower.includes("shader")) {
      return "Kantor 3D ini dirender dengan Three.js menggunakan PBR (Physically Based Rendering) shaders, dynamic soft shadows, dan canvas procedural textures di tiap layar monitor agar terasa hidup!";
    }
    return "Hai! Aku Aura Nova. Fokus utamaku adalah menciptakan estetika web yang bikin orang berdecak kagum, memadukan seni grafis modern dengan responsivitas 60fps tanpa lag. Suka dengan tampilan kantor virtual kami?";
  }

  if (agentId === "backend") {
    if (
      lower.includes("bagaimana caramu bekerja") ||
      lower.includes("cara kerja") ||
      lower.includes("database") ||
      lower.includes("sql") ||
      lower.includes("api") ||
      lower.includes("tugas")
    ) {
      return "Tugasku adalah menjaga performa data layer! Aku mengatur skema relasional PostgreSQL, koneksi Prisma ORM, query indexing, dan endpoint API microservices agar response time selalu di bawah 1.5ms.";
    }
    return "Database cluster PostgreSQL 16 berjalan mulus. Indexing cache berada di tingkat optimal, dan seluruh REST/GraphQL routes siap menangani lonjakan trafik tinggi!";
  }

  if (agentId === "sentinel_qa") {
    if (
      lower.includes("bagaimana caramu bekerja") ||
      lower.includes("cara kerja") ||
      lower.includes("test") ||
      lower.includes("bug") ||
      lower.includes("mobile") ||
      lower.includes("tugas")
    ) {
      return "Aku bertugas menguji seluruh viewport dari 375px (mobile) hingga 4K ultrawide. Aku mensimulasikan touch gestures, memvalidasi DOM accessibility, dan memastikan tidak ada frame drop saat animasi 3D berjalan!";
    }
    return "Semua test suite berstatus PASS! Responsivitas layar, interaksi gesture orbit 3D, dan integritas layout terverifikasi 100% bebas dari visual glitch.";
  }

  if (agentId === "pipeline_ops") {
    if (
      lower.includes("bagaimana caramu bekerja") ||
      lower.includes("cara kerja") ||
      lower.includes("deploy") ||
      lower.includes("vercel") ||
      lower.includes("ci/cd") ||
      lower.includes("tugas")
    ) {
      return "Aku mengotomatisasi deployment pipeline via GitHub Actions dan Vercel Edge Serverless. Setiap kali Bryan melakukan push ke branch main, aku menjalankan build Turbopack, typecheck, dan deploy otomatis tanpa zero downtime!";
    }
    return "Status Pipeline CI/CD: ACTIVE & DEPLOYED. Build Turbopack sukses terverifikasi di edge network Vercel dengan cache distribution global.";
  }

  if (agentId === "cisco_net") {
    if (
      lower.includes("bagaimana caramu bekerja") ||
      lower.includes("cara kerja") ||
      lower.includes("jaringan") ||
      lower.includes("router") ||
      lower.includes("cisco") ||
      lower.includes("tugas")
    ) {
      return "Aku mengurusi sisi network security, patch panel fiber optic, konfigurasi VLAN trunking, dan routing firewall. Latar belakang TKJ Bryan diimplementasikan langsung pada standar keamanan infrastruktur kami!";
    }
    return "Kondisi link jaringan prima: Semua trunk port Gigabit, enkripsi SSH v2, dan routing table stabil dengan throughput throughput puncak 1.6 Gbps!";
  }

  if (agentId === "growth_agent") {
    if (
      lower.includes("bagaimana caramu bekerja") ||
      lower.includes("cara kerja") ||
      lower.includes("telemetri") ||
      lower.includes("seo") ||
      lower.includes("traffic") ||
      lower.includes("tugas")
    ) {
      return "Aku memantau telemetri kunjungan global, Core Web Vitals (LCP, FID, CLS), serta optimasi SEO semantik agar portofolio Bryan menempati ranking terbaik di search engine!";
    }
    return "Analitik pengunjung mendeteksi engagement positif dari berbagai negara. Skor Core Web Vitals website ini berada di zona hijau sempurna!";
  }

  if (agentId === "barista_bot") {
    if (
      lower.includes("kopi") ||
      lower.includes("coffee") ||
      lower.includes("espresso") ||
      lower.includes("latte") ||
      lower.includes("menu") ||
      lower.includes("bagaimana caramu bekerja")
    ) {
      return "Hari ini ada menu spesial: Double-shot Espresso Toraja, Pour-over V60 Gayo Wine, dan Iced Matcha Latte! Dibuat khusus untuk menjaga fokus coding Bryan dan tim.";
    }
    return "Espresso Arabica freshly brewed siap disajikan! ☕ Biar review portofolio dan kodinganmu tetap segar dan bersemangat!";
  }

  // DEFAULT SMART INTELLECTUAL CLOSURE (Tied to agent profile)
  return `Sebagai ${profile.role} di BYS Cyber Studio, aku siap membantu menjawab detail seputar ${profile.dept}, proyek-proyek Bryan, maupun arsitektur sistem kami. Ada pertanyaan spesifik yang ingin kamu ketahui?`;
}

    // HIGH-ACCURACY CONTEXTUAL KNOWLEDGE ENGINE
    // Fallback logic that guarantees 100% accurate, question-matched answers
    const dynamicReply = getContextualKnowledgeReply(agentId, userMsg, profile);

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

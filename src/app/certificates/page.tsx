"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import PageTransition from "@/components/PageTransition";
import TiltedCard from "@/components/reactbits/TiltedCard";
import { ArrowLeft, ExternalLink, ShieldCheck, CheckCircle2, X, Award } from "lucide-react";

interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  type: "AWS Academy" | "Cisco Networking Academy" | "JS Institute";
  image: string;
  verifyUrl?: string;
  notes: string;
  skills: string[];
}

const certificates: CertificateItem[] = [
  {
    id: "aws-cloud",
    title: "AWS Academy Graduate - Cloud Developing",
    issuer: "AWS Academy",
    year: "2026",
    type: "AWS Academy",
    image: "/image/sertif/AWS_Academy_Graduate_Cloud_Developing_BryanYogieSaputra_page-0001.webp",
    verifyUrl: "https://www.credly.com/go/rITbmwC8",
    notes: "Official training curriculum covering cloud architecture, serverless execution, AWS IAM, and scalable cloud application deployment.",
    skills: ["AWS Lambda", "DynamoDB", "IAM Security", "S3 Storage"],
  },
  {
    id: "aws-ml",
    title: "AWS Academy Graduate - Machine Learning Foundations",
    issuer: "AWS Academy",
    year: "2026",
    type: "AWS Academy",
    image: "/image/sertif/AWS_Academy_Graduate___Machine_Learning_Foundations_BryanYogieSaputra_page-0001.webp",
    verifyUrl: "https://www.credly.com/go/SiFq7oZL",
    notes: "Hands-on foundation in computer vision, supervised machine learning pipelines, and cloud ML modeling via AWS.",
    skills: ["SageMaker", "Computer Vision", "Supervised Learning"],
  },
  {
    id: "cisco-ccna",
    title: "CCNA: Introduction to Networks (Course Completion)",
    issuer: "Cisco Networking Academy",
    year: "2025",
    type: "Cisco Networking Academy",
    image: "/image/sertif/_certificate_bryanyogie-student-uns-ac-id.webp",
    notes: "Curriculum completion covering Ethernet switching protocols, IPv4/IPv6 subnetting, router initial configuration, and OSI model packet fundamentals.",
    skills: ["IPv4 / IPv6 Subnetting", "VLAN Segmentation", "Router Config", "OSI Model"],
  },
  {
    id: "js-essentials-1",
    title: "JavaScript Essentials 1",
    issuer: "OpenEDG JS Institute & Cisco Networking Academy",
    year: "2025",
    type: "JS Institute",
    image: "/image/sertif/JavaScript_Essentials_1_certificate_bryanyogie-student-uns-ac-id.webp",
    notes: "Algorithmic thinking, data structures, conditional execution, and fundamental JavaScript language mechanics.",
    skills: ["Data Structures", "Control Flow", "Functions", "Algorithms"],
  },
  {
    id: "js-essentials-2",
    title: "JavaScript Essentials 2",
    issuer: "OpenEDG JS Institute & Cisco Networking Academy",
    year: "2025",
    type: "JS Institute",
    image: "/image/sertif/JavaScript_Essentials_2_certificate_bryanyogie-student-uns-ac-id.webp",
    notes: "Advanced JavaScript: OOP design patterns, asynchronous closures, inheritance, and modular client-side architecture.",
    skills: ["OOP", "Closures", "Async/Await", "Prototypes"],
  },
  {
    id: "iot-packet-tracer",
    title: "Exploring IoT with Cisco Packet Tracer",
    issuer: "Cisco Networking Academy",
    year: "2025",
    type: "Cisco Networking Academy",
    image: "/image/sertif/Exploring_IoT_with_Cisco_Packet_Tracer_certificate_bryanyogie-student-uns-ac-id.webp",
    notes: "Simulating connected sensor topology, edge actuator nodes, and microcontroller routing via Cisco Packet Tracer.",
    skills: ["Packet Tracer", "IoT Edge Nodes", "Sensor Simulation"],
  },
  {
    id: "getting-started-pt",
    title: "Getting Started with Cisco Packet Tracer",
    issuer: "Cisco Networking Academy",
    year: "2025",
    type: "Cisco Networking Academy",
    image: "/image/sertif/Getting_Started_with_Cisco_Packet_Tracer_certificate_bryanyogie-student-uns-ac-id.webp",
    notes: "Topology simulation, switch VLAN segmentation, IP addressing verification, and packet flow diagnostics.",
    skills: ["Topology Design", "Packet Inspection", "Ping Diagnostics"],
  },
  {
    id: "html-essentials",
    title: "HTML Essentials",
    issuer: "Cisco Networking Academy",
    year: "2025",
    type: "Cisco Networking Academy",
    image: "/image/sertif/HTML_Essentials_certificate_bryanyogie-student-uns-ac-id.webp",
    notes: "Semantic HTML5 structural architecture, accessibility basics, and responsive web document foundations.",
    skills: ["HTML5", "Accessibility", "Document Semantics"],
  },
  {
    id: "intro-iot",
    title: "Introduction to IoT",
    issuer: "Cisco Networking Academy",
    year: "2025",
    type: "Cisco Networking Academy",
    image: "/image/sertif/Introduction_to_IoT_certificate_bryanyogie-student-uns-ac-id.webp",
    notes: "Overview of IoT ecosystems, network security requirements, and real-world industrial telemetry applications.",
    skills: ["Industrial IoT", "Network Security", "Telemetry"],
  },
];

export default function CertificatesPage() {
  const [activeCert, setActiveCert] = useState<CertificateItem | null>(null);

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#1C121E] text-[#FDF8F0] selection:bg-[#FF6B00] selection:text-white antialiased relative overflow-hidden">
        {/* Subtle Ambient Background */}
        <div className="pointer-events-none absolute top-[-5%] right-1/4 w-[700px] h-[350px] bg-[#FF6B00]/8 blur-[160px] rounded-full -z-10" />

        <SiteHeader />

        <main className="max-w-5xl mx-auto px-6 md:px-12 pt-32 pb-28 flex flex-col gap-12">
          
          {/* Top Bar Navigation */}
          <div className="flex items-center justify-between border-b border-[#FDF8F0]/10 pb-4">
            <Link
              href="/"
              className="text-xs font-mono text-[#FDF8F0]/70 hover:text-[#FF6B00] inline-flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft size={13} />
              <span>Back to Home</span>
            </Link>
            <span className="text-xs font-mono text-[#FF6B00] font-bold">
              // CREDENTIAL VAULT: {certificates.length} VERIFIED
            </span>
          </div>

          {/* Editorial Header */}
          <div className="flex flex-col gap-3 max-w-2xl">
            <span className="text-xs font-mono text-[#FF6B00] uppercase tracking-widest font-bold">
              Verified Qualifications
            </span>
            <h1 className="text-4xl sm:text-5xl font-outfit font-black tracking-tight text-[#FDF8F0]">
              Academic &amp; Industry Vault.
            </h1>
            <p className="text-sm sm:text-base text-[#FDF8F0]/80 font-sans leading-relaxed">
              Official training completions and certified badges from AWS Academy, Cisco Networking Academy, and OpenEDG JavaScript Institute. Click any credential to inspect the curriculum syllabus.
            </p>
          </div>

          {/* Interactive Credential Deck (Vault items with 3D Tilt) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                onClick={() => setActiveCert(cert)}
                className="group cursor-pointer"
              >
                <TiltedCard maxTilt={8} scale={1.02}>
                  <div className="relative rounded-3xl bg-[#2D1D31]/80 border border-[#FDF8F0]/12 hover:border-[#FF6B00]/60 p-6 flex flex-col justify-between gap-5 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#FF6B00]/15">
                    
                    <div className="flex flex-col gap-4">
                      {/* Certificate Physical Preview */}
                      <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-[#150D17] border border-[#FDF8F0]/10">
                        <Image
                          src={cert.image}
                          alt={cert.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 450px"
                          className="object-cover group-hover:scale-102 transition-transform duration-500 filter brightness-95"
                        />
                        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#1C121E]/80 backdrop-blur-md border border-[#FDF8F0]/15 text-[11px] font-mono text-[#FF6B00] font-bold">
                          {cert.issuer}
                        </div>
                        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#1C121E]/80 backdrop-blur-md border border-[#FDF8F0]/15 text-[11px] font-mono text-[#FDF8F0]/70">
                          {cert.year}
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <h2 className="text-lg font-outfit font-bold text-[#FDF8F0] group-hover:text-[#FF6B00] transition-colors leading-snug">
                          {cert.title}
                        </h2>
                        <p className="text-xs text-[#FDF8F0]/75 font-sans leading-relaxed line-clamp-2">
                          {cert.notes}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Verification Strip */}
                    <div className="flex items-center justify-between pt-3 border-t border-[#FDF8F0]/10 text-xs font-mono">
                      <div className="flex items-center gap-1.5 text-[#00CC66]">
                        <CheckCircle2 size={13} />
                        <span>Curriculum Verified</span>
                      </div>

                      {cert.verifyUrl ? (
                        <a
                          href={cert.verifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-[#FF6B00] hover:underline inline-flex items-center gap-1 font-bold"
                        >
                          <span>Credly Badge</span>
                          <ExternalLink size={12} />
                        </a>
                      ) : (
                        <span className="text-[#FDF8F0]/40">UNS Document ID</span>
                      )}
                    </div>

                  </div>
                </TiltedCard>
              </div>
            ))}
          </div>

          {/* Modal Credential Inspector */}
          {activeCert && (
            <div
              className="fixed inset-0 z-50 bg-[#1C121E]/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
              onClick={() => setActiveCert(null)}
            >
              <div
                className="relative max-w-3xl w-full bg-[#2D1D31] rounded-3xl border border-[#FDF8F0]/20 overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setActiveCert(null)}
                  className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#1C121E]/80 text-[#FDF8F0] hover:text-[#FF6B00] flex items-center justify-center border border-[#FDF8F0]/20 cursor-pointer"
                >
                  <X size={18} />
                </button>

                {/* Left: Certificate Preview */}
                <div className="relative w-full md:w-1/2 min-h-[260px] sm:min-h-[360px] bg-[#150D17]">
                  <Image
                    src={activeCert.image}
                    alt={activeCert.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain p-3"
                  />
                </div>

                {/* Right: Full Credential Details */}
                <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between gap-6 overflow-y-auto">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full bg-[#FF6B00]/20 text-[#FF6B00] border border-[#FF6B00]/40 text-xs font-mono font-bold">
                        {activeCert.year}
                      </span>
                      <span className="text-xs font-mono text-[#FDF8F0]/50">
                        {activeCert.issuer}
                      </span>
                    </div>

                    <h2 className="text-xl font-outfit font-black text-[#FDF8F0] leading-snug">
                      {activeCert.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-[#FDF8F0]/85 font-sans leading-relaxed pt-1">
                      {activeCert.notes}
                    </p>

                    <div className="flex flex-col gap-2 pt-3">
                      <span className="text-[11px] font-mono text-[#FF6B00] uppercase font-bold tracking-wider">
                        Skills Covered &amp; Verified:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {activeCert.skills.map((s) => (
                          <span
                            key={s}
                            className="text-[10px] font-mono px-2.5 py-1 rounded bg-[#1C121E] text-[#FDF8F0]/80 border border-[#FDF8F0]/15"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-[#FDF8F0]/10 pt-4 flex items-center justify-between">
                    {activeCert.verifyUrl ? (
                      <a
                        href={activeCert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl bg-[#FF6B00] text-white hover:bg-[#FF8533] text-xs font-mono font-bold inline-flex items-center gap-1.5 shadow-md shadow-[#FF6B00]/20"
                      >
                        <span>Open Credly Badge</span>
                        <ExternalLink size={12} />
                      </a>
                    ) : (
                      <span className="text-xs font-mono text-[#FDF8F0]/50">
                        Academic Record • UNS Surakarta
                      </span>
                    )}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Footer */}
          <footer className="border-t border-[#FDF8F0]/15 pt-8 flex items-center justify-between text-xs font-mono text-[#FDF8F0]/60">
            <span>&copy; {new Date().getFullYear()} Bryan Yogie Saputra</span>
            <Link href="/projects" className="text-[#FF6B00] hover:underline font-bold">
              View All Projects ↗
            </Link>
          </footer>

        </main>
      </div>
    </PageTransition>
  );
}

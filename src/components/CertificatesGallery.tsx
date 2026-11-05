"use client";

import CircularGallery from "./CircularGallery";

const certificateItems = [
  { image: "/image/sertif/AWS_Academy_Graduate_Cloud_Developing_BryanYogieSaputra_page-0001.webp", text: "AWS Cloud" },
  { image: "/image/sertif/AWS_Academy_Graduate___Machine_Learning_Foundations_BryanYogieSaputra_page-0001.webp", text: "AWS ML" },
  { image: "/image/sertif/Exploring_IoT_with_Cisco_Packet_Tracer_certificate_bryanyogie-student-uns-ac-id.webp", text: "Cisco IoT" },
  { image: "/image/sertif/Getting_Started_with_Cisco_Packet_Tracer_certificate_bryanyogie-student-uns-ac-id.webp", text: "Cisco Packet Tracer" },
  { image: "/image/sertif/HTML_Essentials_certificate_bryanyogie-student-uns-ac-id.webp", text: "HTML Essentials" },
  { image: "/image/sertif/Introduction_to_IoT_certificate_bryanyogie-student-uns-ac-id.webp", text: "Intro to IoT" },
  { image: "/image/sertif/JavaScript_Essentials_1_certificate_bryanyogie-student-uns-ac-id.webp", text: "JS Essentials 1" },
  { image: "/image/sertif/JavaScript_Essentials_2_certificate_bryanyogie-student-uns-ac-id.webp", text: "JS Essentials 2" },
  { image: "/image/sertif/_certificate_bryanyogie-student-uns-ac-id.webp", text: "Certificate" }
];

export default function CertificatesGallery() {
  return (
    <section className="relative w-full bg-[#090f0f] py-28 md:py-36 border-t border-mint/20 flex flex-col items-center justify-center overflow-hidden" id="certificates">
      <div className="z-10 mb-12 text-center pointer-events-none max-w-4xl px-6">
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-outfit font-black uppercase text-foreground tracking-tighter text-balance">
          My <span className="text-mint">Certifications</span>
        </h2>
        <p className="text-foreground/70 font-mono mt-3 uppercase tracking-widest text-xs md:text-sm">
          Drag to rotate the 3D gallery
        </p>
      </div>
      
      <div className="w-full h-[600px] relative z-20">
        <CircularGallery 
          items={certificateItems}
          bend={3} 
          textColor="#ffffff" 
          borderRadius={0.05} 
          font="bold 30px Outfit"
        />
      </div>
    </section>
  );
}

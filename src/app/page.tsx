"use client";

import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { CustomCursor } from "@/components/site/custom-cursor";
import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { Skills } from "@/components/sections/skills";
import { Services } from "@/components/sections/services";
import { Portfolio } from "@/components/sections/portfolio";
import { Blog } from "@/components/sections/blog";
import { Newsletter } from "@/components/sections/newsletter";
import { Contact } from "@/components/sections/contact";
import { WhatsAppFloat } from "@/components/site/whatsapp-float";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <ScrollProgress />
      <CustomCursor />

      <Navbar />

      <main className="flex flex-col">
        <Hero />
        <Stats />
        <Skills />
        <Services />
        <Portfolio />
        <Blog />
        <Newsletter />
        <Contact />
      </main>

      <Footer />

      <WhatsAppFloat />
    </div>
  );
}

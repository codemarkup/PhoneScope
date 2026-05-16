"use client";
import Cursor from "@/components/Cursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MethodBand from "@/components/MethodBand";
import Overview from "@/components/Overview";
import Charts from "@/components/Charts";
import Analysis from "@/components/Analysis";
import Insights from "@/components/Insights";
import Regression from "@/components/Regression";
import Team from "@/components/Team";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <MethodBand />
        <Overview />
        <Charts />
        <Analysis />
        <Insights />
        <Regression />
        <Team />
      </main>
      <Footer />
    </>
  );
}

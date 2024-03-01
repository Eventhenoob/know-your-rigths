"use client";
import Slider from "@/components/Slider/Slider";
import CardGrid from "@/components/CardGrid/CardGrid";
import VideoBG from "@/components/VideoBg";
import { useState } from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between ">
      <header className="flex relative w-full h-[90vh] justify-center items-center">
        <VideoBG isDarkBg={true} onLoadedData={() => {}} />
        <div className="relative flex flex-col justify-center items-center">
          <h1
            className={
              "capitalize font-heading text-center text-white text-7xl font-bold transition-all "
            }
          >
            Fight for your rights!
          </h1>
          <button className="py-3 px-5 bg-[#000435] hover:bg-[#101120] hover:scale-110 font-semibold transition-all duration-300 text-white rounded-3xl mt-11">
            Book Appointment
          </button>
        </div>
      </header>
      <section className="py-40">
        <CardGrid />
      </section>
      <section className="pb-40">
        <Slider />
      </section>
    </main>
  );
}

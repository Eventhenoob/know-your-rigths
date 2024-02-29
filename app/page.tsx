'use client'
import Slider from "@/components/Slider/Slider"
import CardGrid from "@/components/CardGrid/CardGrid";
import VideoBG from "@/components/VideoBg";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between p-10 lg:p-24">
      <header className="flex relative w-full h-[90vh] justify-center items-center">
        <VideoBG isDarkBg={true} onLoadedData={() => {}} />
      <div className="relative flex flex-col justify-center items-center">
        <h1 className="capitalize font-heading text-center text-white text-7xl font-bold  ">Fight for your rights!</h1>
        <button className="py-3 px-5 bg-blue-700 hover:bg-blue-500 font-semibold transition-all duration-300 text-white rounded-md mt-11">Start Conversition</button>
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

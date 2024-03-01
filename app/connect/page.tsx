import LawyerGrid from "@/components/LawyerGrid/LawyerGrid";
import React from "react";

const page = () => {
  return (
    <>
      <header className="w-screen h-[50vh]"></header>
      <main className="">
        <section className="py-40 flex flex-col justify-center items-center w-full">
          <div className="">
            <h2 className="text-4xl mb-10">
              Connect with the best lawyers in the country and get the best
              legal advice.
            </h2>
          </div>
          <LawyerGrid />
        </section>
      </main>
    </>
  );
};

export default page;

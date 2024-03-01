import React from "react";
import { FaStar } from "react-icons/fa";
interface Props {
  image: string;
  id: number;
  name: string;
  gmail: string;
  title: string;
  parcticeAreas: string[];
  ratting: number;
  position: string;
  experience: number;
  setPopup: (value: number) => void;
}

const LawyerBox = ({
  gmail,
  id,
  name,
  parcticeAreas,
  ratting,
  title,
  position,
  image,
  experience,
  setPopup,
}: Props) => {
  return (
    <div
      onClick={() => setPopup(id)}
      className="flex p-4 cursor-pointer flex-col  gap-4 w-1/4 h-[27rem] bg-slate-200 border-1 rounded-xl"
    >
      <div className="flex p-3 gap-3">
        <img
          src={`/${image}`}
          alt=""
          className="w-14 h-14 border-green-400 border-1 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold">{name}</h2>
          <p className="-mt-2 text-xl text-slate-500">{position}</p>
        </div>

        <div className="ml-auto">
          <p className="text-2xl gap-2 font-bold justify-center items-center flex">
            {ratting}
            <span className="text-2xl text-yellow-400">
              <FaStar />
            </span>
          </p>
        </div>
      </div>

      <p className="flex text-2xl gap-2 items-center">
        Experience:{" "}
        <span className="text-xl  font-bold">+{experience} years</span>
      </p>

      <div className="">
        <p className="">Practice Areas and Skills</p>

        <div className="flex gap-2">
          {parcticeAreas.map((area) => (
            <p className="text-slate-500 bg-slate-100 p-2 rounded-2xl">
              {area}
            </p>
          ))}
        </div>
      </div>

      <button className="bg-[#000435] text-white p-3 rounded-3xl hover:bg-[#050c52] w-[80%] m-auto mb-10 duration-300 transition-all ">
        Schedual a meeting
      </button>
    </div>
  );
};

export default LawyerBox;

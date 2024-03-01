import { FaStar } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
interface Props {
  isPopupVisible: boolean;
  setIsPopupVisible: (value: boolean) => void;
  image: string;
  id: number;
  name: string;
  gmail: string;
  title: string;
  parcticeAreas: string[];
  ratting: number;
  position: string;
  experience: number;
  description: string;
}

const LawyerPopup = ({
  isPopupVisible,
  setIsPopupVisible,
  description,
  experience,
  gmail,
  id,
  image,
  name,
  parcticeAreas,
  position,
  ratting,
  title,
}: Props) => {
  return (
    isPopupVisible && (
      <div className="w-[100%] h-[100%] top-0 left-0 fixed z-40 bg-black bg-opacity-25 backdrop-filter backdrop-blur-lg ">
        <div className="p-10 rounded-3xl w-[90%] h-[70%] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] absolute bg-white overflow-y-scroll">
          <button
            onClick={() => setIsPopupVisible(false)}
            className="absolute right-4 top-4 flex justify-center items-center text-3xl bg-white rounded-full w-14 h-14 hover:scale-110 transition-all duration-300"
          >
            <IoClose />
          </button>
          <div className="flex items-center gap-4">
            <img
              src={image}
              alt=""
              className="w-52 h-52 border-green-400 border-1 rounded-full object-cover"
            />

            <div className="flex flex-col gap-4">
              <h2 className="text-5xl font-bold">{name}</h2>
              <p className="-mt-8 text-xl text-slate-500">{title}</p>
            </div>
            <div className="ml-28">
              <p className="text-2xl gap-2 font-bold justify-center items-center flex">
                {ratting}
                <span className="text-2xl text-yellow-400">
                  <FaStar />
                </span>
              </p>
            </div>
          </div>
          <p className="flex text-3xl gap-2 items-center">
            Experience:{" "}
            <span className="text-2xl  font-bold">+{experience} years</span>
          </p>
          <div className="">
            <p className="text-xl">Practice Areas and Skills</p>
            <div className="flex gap-2">
              {parcticeAreas.map((area) => (
                <p className="text-slate-500 bg-slate-100 p-2 rounded-2xl">
                  {area}
                </p>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-2xl font-bold">About {name}</p>
            <p className="text-slate-500 text-2xl">{description}</p>
          </div>
          <button className="bg-[#000435] text-white p-3 rounded-3xl hover:bg-[#050c52]  m-auto mb-10 duration-300 transition-all ">
            Book Appointment
          </button>
        </div>
      </div>
    )
  );
};

export default LawyerPopup;

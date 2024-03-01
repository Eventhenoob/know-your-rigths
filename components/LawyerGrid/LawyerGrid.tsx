"use client";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Card from "../Card/Card";
import LawyerBox from "../LawyerBox/LawyerBox";
import LawyerPopup from "../LawyerPopup/LawyerPopup";
import { useState } from "react";
const lawyers = [
  {
    experience: 69,
    gmail: "cbhrat@gmail.com",
    id: 0,
    image: "/Lb1.png",
    name: "Bharat Gawer",
    parcticeAreas: ["Divorse", "Divorse", "Divorse"],
    position: "best",
    ratting: 1,
    title: "The greatest of them all",
    description:
      "bharat is the greatest lawyer of all time. He has been practicing law for over 69 years",
  },
  {
    experience: 69,
    gmail: "cbhrat@gmail.com",
    id: 1,
    image: "/Lb1.png",
    name: "Bharat Gawer",
    parcticeAreas: ["Divorse", "Divorse", "Divorse"],
    position: "best",
    ratting: 1,
    title: "The greatest of them all",
    description:
      "bharat is the greatest lawyer of all time. He has been practicing law for over 69 years",
  },
  {
    experience: 69,
    gmail: "cbhrat@gmail.com",
    id: 2,
    image: "/Lb1.png",
    name: "Bharat Gawer",
    parcticeAreas: ["Divorse", "Divorse", "Divorse"],
    position: "best",
    ratting: 1,
    title: "The greatest of them all",
    description:
      "bharat is the greatest lawyer of all time. He has been practicing law for over 69 years",
  },

  {
    experience: 69,
    gmail: "cbhrat@gmail.com",
    id: 3,
    image: "/Lb1.png",
    name: "Bharat Gawer",
    parcticeAreas: ["Divorse", "Divorse", "Divorse"],
    position: "best",
    ratting: 1,
    title: "The greatest of them all",
    description:
      "bharat is the greatest lawyer of all time. He has been practicing law for over 69 years",
  },
];
const LawyerGrid = () => {
  const [currentSelected, setCurrentSelected] = useState(0);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  return (
    <>
      <LawyerPopup
        isPopupVisible={isPopupVisible}
        setIsPopupVisible={setIsPopupVisible}
        description={lawyers[currentSelected].description}
        experience={lawyers[currentSelected].experience}
        gmail={lawyers[currentSelected].gmail}
        id={lawyers[currentSelected].id}
        image={lawyers[currentSelected].image}
        name={lawyers[currentSelected].name}
        parcticeAreas={lawyers[currentSelected].parcticeAreas}
        position={lawyers[currentSelected].position}
        ratting={lawyers[currentSelected].ratting}
        title={lawyers[currentSelected].title}
      />
      <div className="flex w-full justify-evenly  flex-wrap gap-10">
        {lawyers.map((lawyer) => (
          <LawyerBox
            setPopup={(value: number) => {
              setCurrentSelected(value);
              setIsPopupVisible(true);
            }}
            gmail={lawyer.gmail}
            id={lawyer.id}
            image={lawyer.image}
            name={lawyer.name}
            parcticeAreas={lawyer.parcticeAreas}
            position={lawyer.position}
            ratting={lawyer.ratting}
            title={lawyer.title}
            experience={lawyer.experience}
          />
        ))}
      </div>
    </>
  );
};

export default LawyerGrid;

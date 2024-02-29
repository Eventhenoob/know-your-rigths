import React from "react";
import { Card } from "react-bootstrap";

const LawyerBox = () => {
  return (
    <Card
      style={{
        width: "22rem",
        height: "420px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "10px 6px 10px rgba(226, 234, 247)", // Add box shadow for a subtle drop shadow effect
      }}
    >
      <Card.Img
        variant="top"
        src={""}
        style={{ objectFit: "cover", height: "50%" }}
      />
      <Card.Body
        style={{
          height: "50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card.Title
          style={{ color: "#0a2463", fontWeight: "bold", fontSize: "25px" }}
        >
          {""}
        </Card.Title>
        <Card.Text
          style={{ fontWeight: "bold", fontSize: "18px", textAlign: "center" }}
        >
          {""}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default LawyerBox;

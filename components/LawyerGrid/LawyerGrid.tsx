import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Card from "../Card/Card";

const CardGrid = () => {
  return (
    <Container style={{ marginTop: "40px" }}>
      <div className="flex gap-[6rem] flex-wrap">
        <Col>
          <Card
            description={"Email: RebeccaJohn@gmail.com"}
            image={
              "https://blog.ipleaders.in/wp-content/uploads/2018/11/BV-Acharya.jpg"
            }
            title={"Rebecca John"}
          />
        </Col>

        <Col>
          <Card
            description={"Email: RebeccaJohn@gmail.com"}
            image={
              "https://blog.ipleaders.in/wp-content/uploads/2018/11/BV-Acharya.jpg"
            }
            title={"Rebecca John"}
          />
        </Col>

        <Col>
          <Card
            description={"Email: RebeccaJohn@gmail.com"}
            image={
              "https://blog.ipleaders.in/wp-content/uploads/2018/11/BV-Acharya.jpg"
            }
            title={"Rebecca John"}
          />
        </Col>

        <Col>
          <Card
            description={"Email: RebeccaJohn@gmail.com"}
            image={
              "https://blog.ipleaders.in/wp-content/uploads/2018/11/BV-Acharya.jpg"
            }
            title={"Rebecca John"}
          />
        </Col>

        <Col>
          <Card
            description={"Email: RebeccaJohn@gmail.com"}
            image={
              "https://blog.ipleaders.in/wp-content/uploads/2018/11/BV-Acharya.jpg"
            }
            title={"Rebecca John"}
          />
        </Col>
      </div>
    </Container>
  );
};

export default CardGrid;

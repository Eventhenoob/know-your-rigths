import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from '../Card/Card';


const CardGrid = () => {
  return (
    <Container style={{ marginTop: '40px' }} >
      <div className='flex gap-[6rem]'>
        <Col><Card description={"Get legal aid now! Know your rights. Access support for legal matters. Don't face it alone."} image={"/legal.jpg"} title={"Legal Aids"} /></Col>
        <Col><Card description={"Our successful cases: Celebrating victories! Explore our wins. Learn about successful outcomes. Be inspired!"} image={"/SuccessStories.jpg"} title={"Our Stories"} /></Col>
        <Col><Card description={"Connect with concerned attorneys! Access legal expertise. Get personalized guidance. Find the right support for your case."} image={"/OIP.jpg"} title={"Concerned Attorneys"} /></Col>
      </div>
    </Container>
  )
}

export default CardGrid
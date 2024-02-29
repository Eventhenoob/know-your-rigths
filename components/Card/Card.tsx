import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

interface CardData {
    title: string;
    description: string;
    image: string;
}

const Cards = ( { description, image, title } : CardData ) => {
  return (
    <Card style={{
      width: '18rem',
      height: '400px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '10px 6px 10px rgba(226, 234, 247)',  // Add box shadow for a subtle drop shadow effect
    }}>
      <Card.Img variant="top" src={image} style={{ objectFit: 'cover', height: '50%' }} />
      <Card.Body style={{ height: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Card.Title style={{ color: '#0a2463', fontWeight: 'bold', fontSize: '25px' }}>{title}</Card.Title>
        <Card.Text style={{ fontWeight: 'bold', fontSize: '18px', textAlign: 'center' }}>
          {description}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Cards
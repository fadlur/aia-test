import { Card, CardImg, CardBody, CardText, CardTitle } from "reactstrap";
import Link from 'next/link';

const CardKelas = (props) => {
  const { title, text, url, image } = props;
  return (
    <Card className="mb-4">
      <Link href={url}>
        <a>
          <CardImg top width="100%" height="200px" src={image}/>
        </a>
      </Link>
      <CardBody style={{minHeight:"150px"}}>
        <Link href={url}>
          <a>
            <CardTitle>
              {title}
            </CardTitle>
          </a>
        </Link>
        <CardText>
          {text}
        </CardText>
      </CardBody>
    </Card>
  )
}

export default CardKelas;
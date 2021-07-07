const { Container, Row, Col } = require("reactstrap")

const Footer = () => {
  return (
    <Container>
      <hr />
      <Row>
        <Col>
        <p>&copy; 2021 - AIA TEST</p>
        </Col>
      </Row>
    </Container>
  )
}

export default Footer;
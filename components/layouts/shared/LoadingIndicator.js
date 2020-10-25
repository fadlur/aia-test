import { Col, Container, Row, Spinner } from "reactstrap";

const LoadingIndicator = () => {
  return (
    <Container>
      <Row>
        <Col className="text-center align-items-lg-center">
          <Spinner color="primary" />;
        </Col>
      </Row>

    </Container>
  )
}

export default LoadingIndicator;
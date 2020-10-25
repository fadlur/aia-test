import { Col, Row } from "reactstrap";

const HeaderDashboard = ({title}) => {
  return (
    <Row className="mb-4">
      <Col>
        <h5>{title}</h5>
      </Col>
    </Row>
  )
}

export default HeaderDashboard;
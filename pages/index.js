import { Card, Container, Row, Col, CardBody, CardImg, CardTitle, CardText } from "reactstrap";
import BaseLayout from "@/components/layouts/BaseLayout";
import CardKelas from "@/components/form/cardkelas";
import Link from "next/link";

const Index = (props) => {
  return (
    <BaseLayout
      title="Selamat Datang"
      metaDescription="E-PKWT layanan pendataan pekerja">
      <Container className="py-4">
        <Row>
          <Col className="py-4">
            <Link href="/kategori">
              <a style={{textDecoration:"none"}}>
                <h4>Home</h4>
              </a>
            </Link>
          </Col>
        </Row>
      </Container>
    </BaseLayout>
  )
}

export default Index;
import { Card, Container, Row, Col, CardBody, CardImg, CardTitle, CardText, Breadcrumb, BreadcrumbItem } from "reactstrap";
import BaseLayout from "@/components/layouts/BaseLayout";
import CardKelas from "@/components/form/cardkelas";
import Link from "next/link";

const Alur = (props) => {
  return (
    <BaseLayout
      title="Alur"
      metaDescription="Alur E-PKWT">
      <Container className="py-4">
        <Row>
          <Col className="py-4">
            <Breadcrumb>
              <BreadcrumbItem active>
                <Link href="/">
                  <a>Home</a>
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem>
                Alur
              </BreadcrumbItem>
            </Breadcrumb>
          </Col>
        </Row>
        <Row>
          <Col className="mb-2">
            Ilustrasi gambar alur pelaporan surat
          </Col>
        </Row>
      </Container>
    </BaseLayout>
  )
}

export default Alur;
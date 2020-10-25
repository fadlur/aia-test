import { Card, Container, Row, Col, CardBody, CardImg, CardTitle, CardText, Breadcrumb, BreadcrumbItem } from "reactstrap";
import BaseLayout from "@/components/layouts/BaseLayout";
import CardKelas from "@/components/form/cardkelas";
import Link from "next/link";

const Contact = (props) => {
  return (
    <BaseLayout
      title="Selamat Datang di Kelas"
      metaDescription="Selamat Datang di Kelas, Kelas berisi bermacam-macam tutorial mulai komputer dasar sampai web development">
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
                About
              </BreadcrumbItem>
            </Breadcrumb>
          </Col>
        </Row>
        <Row>
          <Col className="mb-2">
            
          </Col>
        </Row>
      </Container>
    </BaseLayout>
  )
}

export default Contact;
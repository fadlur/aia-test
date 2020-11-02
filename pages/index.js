import { Card, Container, Row, Col, CardBody, CardImg, CardTitle, CardText } from "reactstrap";
import BaseLayout from "@/components/layouts/BaseLayout";
import CardKelas from "@/components/form/cardkelas";
import Link from "next/link";
import SlideCarousel from "../components/layouts/shared/SliderCarousel";

const Index = (props) => {
  const itemimage = [
    {
      url: '/images/slide1.jpg',
    },
    {
      url: '/images/slide2.jpeg',
    }
  ]
  return (
    <BaseLayout
      title="Beranda"
      metaDescription="E-PKWT layanan pendataan pekerja">
      <Container className="py-4 text-center">
        <SlideCarousel itemimage={itemimage} />
      </Container>
    </BaseLayout>
  )
}

export default Index;
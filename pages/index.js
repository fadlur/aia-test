import { Container } from "reactstrap";
import BaseLayout from "@/components/layouts/BaseLayout";
import SlideCarousel from "../components/layouts/shared/SliderCarousel";
import axiosInstance from "@/components/lib/client";
import { useState } from "react";

const Index = (props) => {
  const {listslide} = props;
  // const [ itemimage, setItemImage ] = useState([]);
  // setItemImage(listslide);
  // console.log(listslide);
  // const itemimage = [
  //   {
  //     url: '/images/slide1.jpg',
  //   },
  //   {
  //     url: '/images/slide2.jpeg',
  //   }
  // ]
  return (
    <BaseLayout
      title="Beranda"
      metaDescription="E-PKWT layanan pendataan pekerja">
      <Container className="py-4 text-center">
        <SlideCarousel itemimage={listslide} />
      </Container>
    </BaseLayout>
  )
}

export async function getStaticProps(context) {
  const key = process.env.API_KEY;
  const urlslideshow = `/slideshow?key=${key}`;
  let listslide = [];
  const [ datalistslideshow ] = await Promise.allSettled([
    axiosInstance.get(urlslideshow).then(r => r.data)
  ]);
  console.log(datalistslideshow)
  if (datalistslideshow.status == 'fulfilled') {
    listslide = datalistslideshow.value.content;
  }

  return {
    props: {
      listslide
    },
    revalidate: 60,
  }
}

export default Index;
import { Container, Row, Col, Breadcrumb, BreadcrumbItem } from "reactstrap";
import BaseLayout from "@/components/layouts/BaseLayout";
import Link from "next/link";
import axiosInstance from "@/components/lib/client";

const Alur = (props) => {
  const { itemblog } = props
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
          {itemblog != null
          ? <Col className="mb-2" dangerouslySetInnerHTML={{__html: itemblog.content}}></Col>
          : null
          }
        </Row>
      </Container>
    </BaseLayout>
  )
}

export async function getStaticProps(context) {
  const key = process.env.API_KEY;
  const urlblog = `/blogbyslug/alur?key=${key}`;
  let itemblog = null;
  const [ datalistslideshow ] = await Promise.allSettled([
    axiosInstance.get(urlblog).then(r => r.data)
  ]);
  console.log(datalistslideshow)
  if (datalistslideshow.status == 'fulfilled') {
    itemblog = datalistslideshow.value.content;
  }

  return {
    props: {
      itemblog
    },
    revalidate: 60,
  }
}

export default Alur;
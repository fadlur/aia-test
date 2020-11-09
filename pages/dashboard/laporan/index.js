import withAuth from '@/components/hoc/withAuth';
import DashLayout from "@/components/layouts/DashLayout";
import { Container, Row, Table, Col, Button, Card, CardBody } from 'reactstrap';
import HeaderDashboard from '@/components/layouts/shared/HeaderDashboard';
import Link from 'next/link';

const Index = ({itemuser}) => {
  return (
    <DashLayout 
      user={itemuser}
      title="Laporan" 
      metaDescription="Laporan">
      <Container className="py-5 main-wrap">
        <HeaderDashboard title="Perusahaan" />
        <Row>
          <Col>
            <Card>
              <CardBody>
                <Table>
                  
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </DashLayout>
  )
}

export default withAuth(Index)(['admin', 'kepala']);
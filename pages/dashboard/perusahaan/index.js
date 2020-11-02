import withAuth from '@/components/hoc/withAuth';
import DashLayout from "@/components/layouts/DashLayout";
import { Container, Row, Table, Col, Button, Card, CardBody } from 'reactstrap';
import HeaderDashboard from '@/components/layouts/shared/HeaderDashboard';
import Link from 'next/link';

const Index = ({itemuser}) => {
  return (
    <DashLayout 
      user={itemuser}
      title="Dashboard" 
      metaDescription="Dashboard Grosir website">
      <Container className="py-5 main-wrap">
        <HeaderDashboard title="Perusahaan" />
        <Row>
          <Col>
            <Card>
              <CardBody>
                <Table>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>
                        Nama Perusahaan
                      </th>
                      <th>
                        No Tlp
                      </th>
                      <th>
                        Pejabat
                      </th>
                      <th>
                        Email Akun
                      </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    
                  </tbody>
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
import withAuth from '@/components/hoc/withAuth';
import DashLayout from "@/components/layouts/DashLayout";
import { Container, Row, Table, Col, Card, CardBody, CardHeader, Button, FormGroup, Input, Form } from 'reactstrap';
import HeaderDashboard from '@/components/layouts/shared/HeaderDashboard';
import Link from 'next/link';

const Index = ({itemuser}) => {
  return (
    <DashLayout 
      user={itemuser}
      title="Detail User" 
      metaDescription="Dashboard Detail User">
      <Container className="py-5 main-wrap">
        <HeaderDashboard title="Detail Admin" />
        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                Admin
              </CardHeader>
              <CardBody>
                <Table>
                  <tbody>
                    <tr>
                      <td>Nama</td>
                      <td>Fadlur Rohman</td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td>fadloer@gmail.com</td>
                    </tr>
                    <tr>
                      <td>Phone</td>
                      <td>0852262622601</td>
                    </tr>
                    <tr>
                      <td>Alamat</td>
                      <td>Bulung Kulon RT 03 RW 05</td>
                    </tr>
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
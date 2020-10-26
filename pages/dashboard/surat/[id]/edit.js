import withAuth from '@/components/hoc/withAuth';
import DashLayout from "@/components/layouts/DashLayout";
import { Container, Row, Table, Col, Card, CardBody, CardHeader, Button, FormGroup, Input, Form } from 'reactstrap';
import HeaderDashboard from '@/components/layouts/shared/HeaderDashboard';
import Link from 'next/link';

const Edit = ({itemuser}) => {
  return (
    <DashLayout 
      user={itemuser}
      title="Detail User" 
      metaDescription="Dashboard Detail User">
      <Container className="py-5 main-wrap">
        <HeaderDashboard title="Detail User" />
        <Row>
          <Col>
            <Card>
              <CardHeader>
                User
              </CardHeader>
              <CardBody>
                <Row>
                  <Col>
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
                  </Col>
                </Row>
                <Form>
                  <Row>
                      <Col md="6" className="mb-2">
                        <Input type="select" name="status_user">
                          <option value="aktif">Aktif</option>
                          <option value="nonaktif">Non Aktif</option>
                        </Input>
                      </Col>
                      <Col md="6">
                        <Button color="primary" size="md">Update</Button>
                      </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card>
              <CardHeader>
                Perusahaan
              </CardHeader>
              <CardBody>
                <Table>
                  <tbody>
                    <tr>
                      <td>Nama Perusahaan</td>
                      <td>PT. Djarum</td>
                    </tr>
                    <tr>
                      <td>Alamat</td>
                      <td>Jln. R. Agil Kusumadya</td>
                    </tr>
                    <tr>
                      <td>No. Tlp</td>
                      <td>(0291) 123123123</td>
                    </tr>
                    <tr>
                      <td>Bidang Usaha</td>
                      <td>Perusahaan Roko</td>
                    </tr>
                  </tbody>
                </Table>
                <Form>
                  <Row>
                      <Col md="6" className="mb-2">
                        <Input type="select" name="status_perusahaan">
                          <option value="aktif">Aktif</option>
                          <option value="nonaktif">Non Aktif</option>
                        </Input>
                      </Col>
                      <Col md="6">
                        <Button color="primary" size="md">Update</Button>
                      </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </DashLayout>
  )
}

export default withAuth(Edit)(['admin', 'kepala']);
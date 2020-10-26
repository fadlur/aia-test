import withAuth from '@/components/hoc/withAuth';
import DashLayout from "@/components/layouts/DashLayout";
import { Container, Row, Table, Col, Card, CardBody, Button, FormGroup, Input, Form } from 'reactstrap';
import HeaderDashboard from '@/components/layouts/shared/HeaderDashboard';
import Link from 'next/link';

const Index = ({itemuser}) => {
  return (
    <DashLayout 
      user={itemuser}
      title="Dashboard Surat" 
      metaDescription="Dashboard">
      <Container className="py-5 main-wrap">
        <HeaderDashboard title="Data Surat" />
        <Row>
          <Col>
            <Card>
              <CardBody>
                <Form>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Input type="text" name="keyword" placeholder="ketik keyword" />
                      </FormGroup>
                    </Col>
                    <Col className="col-auto">
                      <FormGroup>
                        <Button color="primary" size="md">Cari</Button>
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
              <CardBody>
                <Table>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Nama Perusahaan</th>
                      <th>No Surat</th>
                      <th>Tanggal Pengajuan</th>
                      <th>Status</th>
                      <th width="200px"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>PT. Djarum</td>
                      <td>001/012/OKT/2020</td>
                      <td>21-10-2020</td>
                      <td>Pending</td>
                      <td>
                        <Button color="primary" size="sm" className="mr-2">Detail</Button>
                        <Button color="info" size="sm">Edit</Button>
                      </td>
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
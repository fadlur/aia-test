import withAuth from '@/components/hoc/withAuth';
import DashLayout from "@/components/layouts/DashLayout";
import { Container, Row, Table, Col, Button, Card, CardBody, FormGroup, Label, Input, Form } from 'reactstrap';
import HeaderDashboard from '@/components/layouts/shared/HeaderDashboard';
import Link from 'next/link';

const Index = ({itemuser}) => {
  return (
    <DashLayout 
      user={itemuser}
      title="Dashboard" 
      metaDescription="Dashboard">
      <Container className="py-5 main-wrap">
        <HeaderDashboard title="Input Data Perusahaan" />
        <Row>
          <Col md="6">
            <Card>
              <CardBody>
                <Form>
                  <FormGroup>
                    <Label>Nama Perusahaan</Label>
                    <Input type="text" name="nama_perusahaan" />
                  </FormGroup>
                  <FormGroup>
                    <Label>Nama Pimpinan</Label>
                    <Input type="text" name="nama_pimpinan" />
                  </FormGroup>
                  <FormGroup>
                    <Label>Jabatan</Label>
                    <Input type="text" name="jabatan" />
                  </FormGroup>
                  <FormGroup>
                    <Label>Alamat</Label>
                    <Input type="textarea" name="alamat" />
                  </FormGroup>
                  <FormGroup>
                    <Label>No Tlp</Label>
                    <Input type="text" name="no_tlp" />
                  </FormGroup>
                  <FormGroup>
                    <Label>Bidang Usaha</Label>
                    <Input type="text" name="bidang_usaha" />
                  </FormGroup>
                  <FormGroup>
                    <Button color="primary">Update</Button>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </DashLayout>
  )
}

export default withAuth(Index)(['admin', 'kepala', 'member']);
import withAuth from '@/components/hoc/withAuth';
import DashLayout from "@/components/layouts/DashLayout";
import { Container, Row, Table, Col, Card, CardBody, Button, FormGroup, Input, Form, CardHeader } from 'reactstrap';
import HeaderDashboard from '@/components/layouts/shared/HeaderDashboard';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Axios from 'axios';

const Index = ({itemuser}) => {
  // state
  const [ loadingproses, setLoadingProses ] = useState(false);
  const [ listsurat, setListSurat ] = useState([]);
  const [ msg, setMsg ] = useState('');
  const [ status, setStatus ] = useState('');
  // end state
  // useEffect
  useEffect(() => {
    const loaduser = async () => {
      const urlsurat = '/api/v1/surat';
      const [ datasurat ] = await Promise.allSettled([
        Axios.get(urlsurat),
      ]);
      if (datasurat.status == 'fulfilled') {
        setListSurat(datasurat.value.data.content.data);
      }
    }
    loaduser();
  },[]);
  // end useEffect
  // function
  let no = 1;
  // end function
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
              <CardHeader>
                <Row>
                  <Col></Col>
                  <Col className="col-auto">
                    <Link href='/dashboard/surat/create'>
                      <a className="btn btn-sm btn-primary">Buat</a>
                    </Link>
                  </Col>
                </Row>
              </CardHeader>
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
                <div className="table-responsive">
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
                      { listsurat.map((surat, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              { no++ }
                            </td>
                            <td>
                              { surat.nama_perusahaan }
                            </td>
                            <td>
                              { surat.no_surat }
                            </td>
                            <td>
                              { surat.tanggal_pengajuan }
                            </td>
                            <td>
                              { surat.status }
                            </td>
                            <td>
                              <Link href={`/dashboard/surat/${surat.id}`}>
                                <a className="btn btn-sm btn-primary mr-2">Detail</a>
                              </Link>
                              { surat.status == 'pending' &&
                                <Link href={`/dashboard/surat/${surat.id}/edit`}>
                                  <a className="btn btn-sm btn-info">Edit</a>
                                </Link>
                              }
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </DashLayout>
  )
}

export default withAuth(Index)(['admin', 'kepala', 'member']);
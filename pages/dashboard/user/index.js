import withAuth from '@/components/hoc/withAuth';
import DashLayout from "@/components/layouts/DashLayout";
import { Container, Row, Table, Col, Card, CardBody, Button, FormGroup, Input, Form } from 'reactstrap';
import HeaderDashboard from '@/components/layouts/shared/HeaderDashboard';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Axios from 'axios';

const Index = ({itemuser}) => {
  // state
  // const [ loadingproses, setLoadingProses ] = useState(false);
  const [ listuser, setListUser ] = useState([]);
  // const [ msg, setMsg ] = useState('');
  // const [ status, setStatus ] = useState('');
  // end state
  // useEffect
  useEffect(() => {
    const loaduser = async () => {
      const urluser = '/api/v1/user?role=member';
      const [ datauser ] = await Promise.allSettled([
        Axios.get(urluser),
      ]);
      
      if (datauser.status == 'fulfilled') {
        setListUser(datauser.value.data.content.data);
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
      title="Dashboard" 
      metaDescription="Dashboard">
      <Container className="py-5 main-wrap">
        <HeaderDashboard title="Data User" />
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
                <div className="table-responsive">
                  <Table>
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Nama</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Perusahaan</th>
                        <th>Status</th>
                        <th width="200px"></th>
                      </tr>
                    </thead>
                    <tbody>
                      { listuser.map((user, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              {no++}
                            </td>
                            <td>
                              {user.name}
                            </td>
                            <td>
                              {user.email}
                            </td>
                            <td>
                              {user.phone}
                            </td>
                            <td>
                              {user.perusahaan != null
                              ? user.perusahaan.nama_perusahaan
                              : null
                              }
                            </td>
                            <td>
                              {user.perusahaan != null
                              ? user.perusahaan.status
                              : null
                              }
                            </td>
                            <td>
                              {/* <Link href={`/dashboard/user/${user.id}`}>
                                <a className="mr-2 mb-2 btn btn-primary btn-sm">
                                  Detail
                                </a>
                              </Link>
                              <Button color="info" size="sm" className="mb-2">Edit</Button> */}
                            </td>
                          </tr>
                        )
                      })
                      }
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

export default withAuth(Index)(['admin', 'kepala']);
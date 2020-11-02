import withAuth from '@/components/hoc/withAuth';
import DashLayout from "@/components/layouts/DashLayout";
import { Container, Row, Table, Col, Card, CardBody, CardHeader, Button, Input, Form, Alert } from 'reactstrap';
import HeaderDashboard from '@/components/layouts/shared/HeaderDashboard';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Axios from 'axios';
import Link from 'next/link';
const Index = ({itemuser}) => {
  // state & variabel
  const router = useRouter();
  const querystring = require('querystring');
  const [ loadingproses, setLoadingProses ] = useState(false);
  const [ user, setUser ] = useState(null);
  const [ perusahaan, setPerusahaan ] = useState(null);
  const [ msg, setMsg ] = useState('');
  const [ status, setStatus ] = useState('');
  const [ values, setValues ] = useState({
    status_user: '',
    status_perusahaan: '',
  })
  // end state & variabel
  // useEffect
  useEffect(() => {
    if (router && router.query) {
      const loaduser = async () => {
        const urluser = `/api/v1/user/${router.query.id}?role=member`;
        const [ datauser ] = await Promise.allSettled([
          Axios.get(urluser),
        ]);
        
        if (datauser.status == 'fulfilled') {
          setUser(datauser.value.data.content);
          setPerusahaan(datauser.value.data.content.perusahaan);
          setValues({...values, ['status_user']: datauser.value.data.content.status,
                                ['status_perusahaan']: datauser.value.data.content.perusahaan.status,});
        }
      }
      loaduser();      
    }
  },[]);
  // end useEffect
  // function
  let no = 1;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({...values, [name]: value});
  }
  const handleSubmitUser = (e) => {
    e.preventDefault();
    setLoadingProses(true);
    const data = {status: values.status_user};
    Axios.patch(`/api/v1/user/${router.query.id}/update?role=member`, querystring.stringify(data))
      .then(response => {
        setLoadingProses(false);
        if (response.data.status == 'success') {
          setUser(response.data.content);
        }
        setStatus(response.data.status);
        setMsg(response.data.msg);
      })
      .catch(err => {
        setLoadingProses(false);
        setStatus('error');
        setMsg(err.message);
      })
  }
  const handleSubmitPerusahaan = (e) => {
    e.preventDefault();
    setLoadingProses(true);
    const data = {status: values.status_perusahaan};
    Axios.patch(`/api/v1/perusahaan/${user.perusahaan.id}/update`, querystring.stringify(data))
      .then(response => {
        setLoadingProses(false);
        if (response.data.status == 'success') {
          setPerusahaan(response.data.content);
        }
        setStatus(response.data.status);
        setMsg(response.data.msg);
      })
      .catch(err => {
        setLoadingProses(false);
        setStatus('error');
        setMsg(err.message);
      })
  }
  // end function
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
                <Row>
                  <Col>
                    User
                  </Col>
                  <Col className="col-auto">
                    <Link href="/dashboard/user">
                      <a className="btn btn-sm btn-danger">
                        Close
                      </a>
                    </Link>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                { status == 'error' &&
                  <Alert color="warning">{msg}</Alert>
                }
                <Table>
                  <tbody>
                    { user != null 
                    ? <>
                      <tr>
                        <td>Nama</td>
                        <td>
                          { user.name }
                        </td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>
                          { user.email }
                        </td>
                      </tr>
                      <tr>
                        <td>Phone</td>
                        <td>
                          { user.phone }
                        </td>
                      </tr>
                      <tr>
                        <td>Alamat</td>
                        <td>
                          { user.alamat } { user.kelurahan } { user.kecamatan }<br />
                          { user.kota } { user.provinsi } { user.kodepos }
                        </td>
                      </tr>
                      <tr>
                        <td>Status</td>
                        <td>
                          { user.status }
                        </td>
                      </tr>
                    </>
                    : null
                    }
                  </tbody>
                </Table>
                <Form onSubmit={handleSubmitUser}>
                  <Row>
                      <Col md="6" className="mb-2">
                        <Input type="select" name="status_user" value={values.status_user} onChange={handleChange}>
                          <option value="aktif">Aktif</option>
                          <option value="nonaktif">Non Aktif</option>
                        </Input>
                      </Col>
                      <Col md="6">
                        <Button color="primary" size="md" disabled={loadingproses}>Update</Button>
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
                    {perusahaan != null
                    ? <>
                      <tr>
                        <td>Nama Perusahaan</td>
                        <td>
                          { perusahaan.nama_perusahaan }
                        </td>
                      </tr>
                      <tr>
                        <td>Nama Pimpinan</td>
                        <td>
                          { perusahaan.nama_pimpinan } { perusahaan.jabatan != null ? `(${perusahaan.jabatan})`: ''}
                        </td>
                      </tr>
                      <tr>
                        <td>Alamat</td>
                        <td>
                          { perusahaan.alamat }
                        </td>
                      </tr>
                      <tr>
                        <td>No. Tlp</td>
                        <td>
                          { perusahaan.no_tlp }
                        </td>
                      </tr>
                      <tr>
                        <td>Bidang Usaha</td>
                        <td>
                          { perusahaan.bidang_usaha }
                        </td>
                      </tr>
                      <tr>
                        <td>Status</td>
                        <td>
                          { perusahaan.status }
                        </td>
                      </tr>
                    </>
                    : null
                    }
                  </tbody>
                </Table>
                <Form onSubmit={handleSubmitPerusahaan}>
                  <Row>
                      <Col md="6" className="mb-2">
                        <Input type="select" name="status_perusahaan" value={values.status_perusahaan} onChange={handleChange}>
                          <option value="pending">Pending</option>
                          <option value="confirm">Confirm</option>
                        </Input>
                      </Col>
                      <Col md="6">
                        <Button color="primary" size="md" disabled={loadingproses}>Update</Button>
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

export default withAuth(Index)(['admin', 'kepala']);
import withAuth from '@/components/hoc/withAuth';
import DashLayout from "@/components/layouts/DashLayout";
import { Container, Row, Table, Col, Card, CardBody, CardHeader, Button, FormGroup, Input, Form } from 'reactstrap';
import HeaderDashboard from '@/components/layouts/shared/HeaderDashboard';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Axios from 'axios';
const Index = ({itemuser}) => {
  // state & variabel
  const router = useRouter();
  const [ user, setUser ] = useState(null);
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
        }
      }
      loaduser();      
    }
  },[]);
  // end useEffect
  // function
  let no = 1;
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
                User
              </CardHeader>
              <CardBody>
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
                    {user != null && user.perusahaan != null
                    ? <>
                      <tr>
                        <td>Nama Perusahaan</td>
                        <td>
                          { user.perusahaan.nama_perusahaan }
                        </td>
                      </tr>
                      <tr>
                        <td>Nama Pimpinan</td>
                        <td>
                          { user.perusahaan.nama_pimpinan } { user.perusahaan.jabatan != null ? `(${user.perusahaan.jabatan})`: ''}
                        </td>
                      </tr>
                      <tr>
                        <td>Alamat</td>
                        <td>
                          { user.perusahaan.alamat }
                        </td>
                      </tr>
                      <tr>
                        <td>No. Tlp</td>
                        <td>
                          { user.perusahaan.no_tlp }
                        </td>
                      </tr>
                      <tr>
                        <td>Bidang Usaha</td>
                        <td>
                          { user.perusahaan.bidang_usaha }
                        </td>
                      </tr>
                      <tr>
                        <td>Status</td>
                        <td>
                          { user.perusahaan.status }
                        </td>
                      </tr>
                    </>
                    : null
                    }
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
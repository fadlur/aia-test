import withAuth from '@/components/hoc/withAuth';
import DashLayout from "@/components/layouts/DashLayout";
import { Container, Row, Table, Col, Card, CardBody, CardHeader, Button, FormGroup, Input, Form } from 'reactstrap';
import HeaderDashboard from '@/components/layouts/shared/HeaderDashboard';
import Link from 'next/link';

const Index = ({itemuser}) => {
  return (
    <DashLayout 
      user={itemuser}
      title="Detail Surat" 
      metaDescription="Dashboard Detail Surat">
      <Container className="py-5 main-wrap">
        <HeaderDashboard title="Detail Surat" />
        <Row>
          <Col>
            <Card>
              <CardHeader>
                Detail Surat
              </CardHeader>
              <CardBody>
                <Table>
                  <tbody>
                    <tr>
                      <td>No. Surat</td>
                      <td>002/10/OKT/2020</td>
                    </tr>
                    <tr>
                      <td>Nama Perusahaan</td>
                      <td>PT. Djarum</td>
                    </tr>
                    <tr>
                      <td>Alamat</td>
                      <td>Jln. R. Agil No.2</td>
                    </tr>
                    <tr>
                      <td>Phone</td>
                      <td>085226262601</td>
                    </tr>
                    <tr>
                      <td>Bidang Usaha</td>
                      <td>Pabrik Rokok</td>
                    </tr>
                    <tr>
                      <td>Pekerja Pria</td>
                      <td>100</td>
                    </tr>
                    <tr>
                      <td>Pekerja Wanita</td>
                      <td>125</td>
                    </tr>
                    <tr>
                      <td>Upah Minimum</td>
                      <td>2.000.000</td>
                    </tr>
                    <tr>
                      <td>Upah Maksimum</td>
                      <td>3.000.000</td>
                    </tr>
                    <tr>
                      <td>Alasan PKWT</td>
                      <td>Sekali Selesai, Sementara/maksimal penyelesaian 3 tahun</td>
                    </tr>
                    <tr>
                      <td>Keterangan</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>Tanggal Pengajuan</td>
                      <td>20-10-2020</td>
                    </tr>
                    <tr>
                      <td>Status</td>
                      <td>Pending</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card>
              <CardHeader>
                Lampiran
              </CardHeader>
              <CardBody>
                <Table>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Jenis</th>
                      <th>Link</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Data Pekerja</td>
                      <td>
                        <a href="#">
                          File
                        </a>
                      </td>
                      <td>
                        <Button color="primary" size="sm">Detail</Button>
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Data Pekerja</td>
                      <td>
                        <a href="#">
                          File
                        </a>
                      </td>
                      <td>
                        <Button color="primary" size="sm">Detail</Button>
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
import withAuth from '@/components/hoc/withAuth';
import DashLayout from "@/components/layouts/DashLayout";
import { Container, Row, Table, Col, Button, Card, CardBody, Alert } from 'reactstrap';
import HeaderDashboard from '@/components/layouts/shared/HeaderDashboard';
import Link from 'next/link';

const Index = ({itemuser}) => {
  // const
  const cetakPerusahaan = (perusahaan) => {
    return (
      <Table>
        <tbody>
          <tr>
            <td>
              Nama Perusahaan
            </td>
            <td>
              {perusahaan.nama_perusahaan}
            </td>
          </tr>
          <tr>
            <td>
              Nama Pimpinan
            </td>
            <td>
              {perusahaan.nama_pimpinan}
            </td>
          </tr>
          <tr>
            <td>
              Jabatan
            </td>
            <td>
              {perusahaan.jabatan}
            </td>
          </tr>
          <tr>
            <td>
              Alamat
            </td>
            <td>
              {perusahaan.alamat}
            </td>
          </tr>
          <tr>
            <td>
              No Tlp
            </td>
            <td>
              {perusahaan.no_tlp}
            </td>
          </tr>
          <tr>
            <td>
              Bidang Usaha
            </td>
            <td>
              {perusahaan.bidang_usaha}
            </td>
          </tr>
        </tbody>
      </Table>
    )
  }
  // end const
  return (
    <DashLayout 
      user={itemuser}
      title="Dashboard" 
      metaDescription="Dashboard">
      <Container className="py-5 main-wrap">
        <HeaderDashboard title="Profil" />
        <Row>
          <Col md="6">
            <Card>
              <CardBody>
                <Table>
                  <tbody>
                    <tr>
                      <td>Nama</td>
                      <td>{itemuser.name}</td>
                    </tr>
                    <tr>
                      <td>Phone</td>
                      <td>{itemuser.phone}</td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td>{itemuser.email}</td>
                    </tr>
                    <tr>
                      <td>Alamat</td>
                      <td>{itemuser.alamat}</td>
                    </tr>
                    <tr>
                      <td>Kelurahan</td>
                      <td>{itemuser.kelurahan}</td>
                    </tr>
                    <tr>
                      <td>Kecamatan</td>
                      <td>{itemuser.kecamatan}</td>
                    </tr>
                    <tr>
                      <td>Kota</td>
                      <td>{itemuser.kota}</td>
                    </tr>
                    <tr>
                      <td>Provinsi</td>
                      <td>{itemuser.provinsi}</td>
                    </tr>
                    <tr>
                      <td>Kodepos</td>
                      <td>{itemuser.kodepos}</td>
                    </tr>
                  </tbody>
                </Table>
                <Link href="/dashboard/profil/edit">
                  <a className="btn btn-warning btn-sm mb-4">Edit Profil</a>
                </Link>
                <Table>
                  <tbody>
                    <tr>
                      <td>Password</td>
                      <td>
                        ************
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <Link href="/dashboard/profil/password">
                  <a className="btn btn-warning btn-sm mb-4">Edit Password</a>
                </Link>

              </CardBody>
            </Card>
          </Col>
          { itemuser.role === 'member' &&
            <Col>
              <Card>
                <CardBody>
                  { itemuser.perusahaan === null
                    ? <Alert color="warning">
                        Anda belum memasukkan data perusahaan, Untuk memasukkan data perusahaan klik <a href="/dashboard/perusahaan/create">disini.</a>
                      </Alert>
                    : cetakPerusahaan(itemuser.perusahaan)
                  }
                </CardBody>
              </Card>
            </Col>          
          }
        </Row>
      </Container>
    </DashLayout>
  )
}

export default withAuth(Index)(['admin', 'kepala', 'member']);
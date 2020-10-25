import withAuth from '@/components/hoc/withAuth';
import DashLayout from "@/components/layouts/DashLayout";
import { Container, Row, Table, Col, Button } from 'reactstrap';
import HeaderDashboard from '@/components/layouts/shared/HeaderDashboard';
import Link from 'next/link';

const Index = ({itemuser}) => {
  return (
    <DashLayout 
      user={itemuser}
      title="Dashboard" 
      metaDescription="Dashboard">
      <Container className="py-5 main-wrap">
        <HeaderDashboard title="Profil" />
        <Row>
          <Col md="6">
            <Table>
              <tbody>
                {/* <tr>
                  <td colSpan="2">
                    {itemuser.foto != null
                    ? <img src={itemuser.foto} />
                    : null
                    }
                    <br />

                  </td>
                </tr> */}
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
          </Col>
        </Row>
      </Container>
    </DashLayout>
  )
}

export default withAuth(Index)(['admin', 'kepala', 'member']);
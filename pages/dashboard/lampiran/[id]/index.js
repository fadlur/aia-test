import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import withAuth from '@/components/hoc/withAuth';
import DashLayout from "@/components/layouts/DashLayout";
import Axios from "axios";
import { Button, Col, Container, Row, Table } from "reactstrap";
import Link from "next/link";
const Index = (props) => {
  // state
  const [ loadingproses, setLoadingProses ] = useState(false);
  const [ listpekerja, setListPekerja ] = useState([]);
  const [ lampiran, setLampiran ] = useState(null);
  const [ msg, setMsg ] = useState('');
  const [ status, setStatus ] = useState('');
  // end state
  const { itemuser } = props;
  const router = useRouter();
  let no = 1;
  // useEffect
  useEffect(() => {
    const loadlampiran = async () => {
      const urlsurat = `/api/v1/lampiran/${router.query.id}`;
      const [ datalampiran ] = await Promise.allSettled([
        Axios.get(urlsurat),
      ]);
      if (datalampiran.status == 'fulfilled') {
        setLampiran(datalampiran.value.data.content.itemlampiran);
        setListPekerja(datalampiran.value.data.content.itempekerja);
      }
      console.log(datalampiran);
    }
    loadlampiran();
  },[]);
  return (
    <DashLayout 
      user={itemuser}
      title="Detail Lampiran" 
      metaDescription="Dashboard">
      <Container className="py-5 main-wrap">
        <Row>
          <Col>
            {lampiran != null &&
              <Link href={`/dashboard/surat/${lampiran.surat_id}`}>
                <a className="btn btn-danger btn-sm">Tutup</a>
              </Link>
            }
            <h4 className="text-center">Detail Lampiran</h4>
            <Table>
              <thead>
                <tr>
                  <th>
                    Jenis
                  </th>
                  <th>
                    No Surat
                  </th>
                  <th>
                    Title
                  </th>
                  <th>
                    File
                  </th>
                  <th>
                    Status
                  </th>
                </tr>
              </thead>
              { lampiran != null &&
                <tbody>
                  <tr>
                    <td>
                      {lampiran.jenis}
                    </td>
                    <td>
                      {lampiran.no_surat}
                    </td>
                    <td>
                      {lampiran.title}
                    </td>
                    <td>
                      <a href={lampiran.link} target="_blank">
                        File
                      </a>
                    </td>
                    <td>
                      {lampiran.status}
                    </td>
                  </tr>
                </tbody>
              }
            </Table>
          </Col>
        </Row>
        {listpekerja.length > 0 &&
          <Row className="mt-4">
            <Col>
              <h4 className="text-center">DAFTAR NAMA PENCATATAN PKWT</h4>
              <Table bordered>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama Pekerja</th>
                    <th>Unit</th>
                    <th>Masa Berlaku PKWT</th>
                    <th>Keterangan</th>
                  </tr>
                </thead>
                <tbody>
                  {listpekerja.map((pekerja, index) => (
                    <tr key={pekerja.id}>
                      <td>
                        {no++}
                      </td>
                      <td>
                        {pekerja.nama}
                      </td>
                      <td>
                        {pekerja.jabatan}
                      </td>
                      <td>
                        {pekerja.awal_perjanjian}/{pekerja.akhir_perjanjian}
                      </td>
                      <td>
                        {pekerja.keterangan}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        }
      </Container>
    </DashLayout>
  )

}

export default withAuth(Index)(['admin', 'kepala', 'member']);
import withAuth from '@/components/hoc/withAuth';
import Axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PrintLayout from "@/components/layouts/PrintLayout";
import { Col, Container, Row, Table } from 'reactstrap';
const Pekerja = ({itemuser}) => {
  const router = useRouter();
  const [ itemsurat, setItemSurat ] = useState(null);
  const [ itemtandatangan , setItemTandatangan ] = useState(null);
  const [ status, setStatus ] = useState('');
  const [ msg, setMsg ] = useState('');
  const [ listpekerja, setListPekerja ] = useState([]);
  useEffect(() => {
    const loadSurat = async () => {
      const urlsurat = `/api/v1/surat/${router.query.id}?param=pekerja`;
      // const urllampiran = `/api/v1/lampiran?param=surat&surat_id=${router.query.id}`;
      const [ dataSurat ] = await Promise.allSettled([
        Axios.get(urlsurat).then(r => r.data),
      ]);
      console.log(dataSurat);
      if (dataSurat.status == 'fulfilled') {
        setItemSurat(dataSurat.value.content.itemsurat);
        setListPekerja(dataSurat.value.content.itempekerja);
        setItemTandatangan(dataSurat.value.content.itemtandatangan);
      }

      // if (dataLampiran.status == 'fulfilled') {
      //   setListLampiran(dataLampiran.value.content);
      // }
    }

    if (router && router.query) {
      loadSurat();
    }
  }, [router]);
  let no = 1;
  return (
    <PrintLayout
    title="Cetak Lampiran Pekerja" 
    metaDescription="Cetak Lampiran Pekerja">
      <Container>
        <Row className="mb-4">
          <Col md="6" sm="6"></Col>
          <Col md="6" sm="6">
            <Table borderless className="table-layout">
              <tbody>
                <tr>
                  <td>
                    Lampiran
                  </td>
                  <td>
                    :
                  </td>
                  <td>
                    Tanda Bukti Pencatatan PKWT
                  </td>
                </tr>
                <tr>
                  <td>
                    Nomor
                  </td>
                  <td>
                    :
                  </td>
                  <td>
                    500/       /16.03/XI/2020
                  </td>
                </tr>
                <tr>
                  <td>
                    Tanggal
                  </td>
                  <td>
                    :
                  </td>
                  <td>
                    November 2020
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col>
            <h5 className="text-center mb-4">DAFTAR NAMA PENCATATAN PKWT</h5>
            <Table bordered className="table-print">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Pekerja</th>
                  <th>Unit/Bagian</th>
                  <th>Masa Berlaku PKWT</th>
                  <th>Keterangan</th>
                </tr>
              </thead>
              <tbody>
                { listpekerja.map((pekerja, index) => (
                  <tr key={pekerja.id}>
                    <td>
                      { no++ }
                    </td>
                    <td>
                      {pekerja.nama}
                    </td>
                    <td>
                      {pekerja.jabatan}
                    </td>
                    <td>
                      {pekerja.awal_perjanjian} s.d {pekerja.akhir_perjanjian}
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
        <Row className="mb-2">
          <Col md="6" sm="6"></Col>
          <Col md="6" sm="6" className="text-center">
            Kudus,  {itemsurat != null && itemsurat.pencatatan != null
                    ? itemsurat.pencatatan.tanggal_pencatatan
                    : null
                    }<br />
            <br />
            { itemtandatangan != null &&
              <>
                {itemtandatangan.jabatan}<br />
                TENAGA KERJA PERINDUSTRIAN KOPERASI<br />
                USAHA KECIL DAN MENENGAH<br />
                Sekretaris<br /><br /><br /><br /><br />



                {itemtandatangan.nama}<br />
                {itemtandatangan.sub_jabatan}<br />
                {itemtandatangan.nip}
              </>          
            }
          </Col>
        </Row>
        <Row>
          { itemtandatangan != null &&
            <Col dangerouslySetInnerHTML={{__html:itemtandatangan.tembusan}}>
              
            </Col>          
          }
        </Row>
      </Container>
    </PrintLayout>
  )
}

export default withAuth(Pekerja)(['admin', 'kepala']);
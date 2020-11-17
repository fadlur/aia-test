import withAuth from '@/components/hoc/withAuth';
import Axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PrintLayout from "@/components/layouts/PrintLayout";
import { Col, Container, Row, Table } from 'reactstrap';
const Cetak = ({itemuser}) => {
  const router = useRouter();
  const [ itemsurat, setItemSurat ] = useState(null);
  const [ status, setStatus ] = useState('');
  const [ msg, setMsg ] = useState('');
  const [ listpekerja, setListPekerja ] = useState([]);
  useEffect(() => {
    const loadSurat = async () => {
      const urlsurat = `/api/v1/surat/${router.query.id}?param=cetak`;
      // const urllampiran = `/api/v1/lampiran?param=surat&surat_id=${router.query.id}`;
      const [ dataSurat ] = await Promise.allSettled([
        Axios.get(urlsurat).then(r => r.data),
      ]);
      console.log(dataSurat);
      if (dataSurat.status == 'fulfilled') {
        setItemSurat(dataSurat.value.content.itemsurat);
        setListPekerja(dataSurat.value.content.itempekerja);
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
          <Col>
            <Table borderless style={{borderBottom:"3px solid black"}}>
              <tr>
                <td width="100px" className="text-center">
                  <img src="/logokudus.png" width="100%" />
                </td>
                <td className="text-center">
                  PEMERINTAH KABUPATEN KUDUS<br />
                  DINAS TENAGA KERJA PERINDUSTRIAN<br />
                  KOPERASI USAHA KECIL DAN MENENGAH<br />
                  Jln. Conge Ngembalrejo No.99 Kudus 59322<br />
                  Telepon (0291) 438691, 431470 Fax. (0291) 438691
                </td>
              </tr>
            </Table>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col>
            <p className="text-center">TANDA BUKTI PENCATATAN</p>
            <p className="text-center">PERJANJIAN KERJA WAKTU TERTENTU (PKWT)</p>
            <p className="text-center">Nomor : 560 /......./ 16.03/XI/2020</p>
            <p id="p-cetak">
                  Berdasarkan Pasal 59 ayat (1) Undang-undang Nomor 13 Tahun 2003 tentang Ketenagakerjaan Juncto
              Pasal 13 Keputusan Menteri Tenaga Kerja dan Transmigrasi RI Nomor : KEP.100/MEN/VI/2004 tentang Ketentuan
              Pelaksanaan Perjanjian Kerja Waktu Tertentu, telah diterima permohonan Pencatatan Perjanjian Kerja Waktu Tertentu dari :
            </p>
            { itemsurat != null 
            ? <Table borderless className="table-layout">
                <tbody>
                  <tr>
                    <td width="30px">1</td>
                    <td>Nama Perusahaan</td>
                    <td>:</td>
                    <td>
                      {itemsurat.nama_perusahaan}
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Alamat</td>
                    <td>:</td>
                    <td>
                      {itemsurat.alamat}
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Nomor Surat</td>
                    <td>:</td>
                    <td>
                      {itemsurat.no_surat}
                    </td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Tanggal Surat</td>
                    <td>:</td>
                    <td>
                    {itemsurat.tanggal_pengajuan}
                    </td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>Jumlah PKWT dicatatkan</td>
                    <td></td>
                    <td>
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>Laki-laki</td>
                    <td>:</td>
                    <td>
                      <Row>
                        <Col>
                          {itemsurat.pekerja_pria}
                        </Col>
                        <Col>
                          Orang
                        </Col>
                      </Row>
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>Perempuan</td>
                    <td>:</td>
                    <td>
                      <Row>
                        <Col>
                          {itemsurat.pekerja_wanita}
                        </Col>
                        <Col>
                          Orang
                        </Col>
                      </Row>
                    </td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td>Nama Pekerja</td>
                    <td>:</td>
                    <td>
                      { listpekerja != null ? listpekerja.nama : null} dkk
                    </td>
                  </tr>
                </tbody>
              </Table>
            : null
            }
            <p id="p-cetak">
              Pencatatan Perjanjian Kerja Waktu Tertentu (PKWT) tersebut dan dokumen yang dilampirkan telah diteliti dan sesuai dengan Ketentuan
              yang dimaksud dalam Pasal 13 Keputusan Menteri Tenaga Kerja dan Transmigrasi RI Nomor : KEP.100/MEN/VI/2004 tentang Ketentuan Pelaksanaan
              Perjanjian Kerja Waktu Tertentu, kami catat dengan :
            </p>
            <Table borderless className="table-layout">
              <tbody>
                <tr>
                  <td width="30px">1</td>
                  <td>
                    Nomor Registrasi Bukti Pencatatan
                  </td>
                  <td>:</td>
                  <td>
                    203/PKWT/XI/2020
                  </td>
                </tr>
                <tr>
                  <td width="30px">2</td>
                  <td>
                    Tanggal Pencatatan
                  </td>
                  <td>:</td>
                  <td>
                    12 November 2020
                  </td>
                </tr>
              </tbody>
            </Table>
            <p>
              Apabila terdapat hal-hal yang diperjanjikan atau pelaksanaan PKWT yang dicatatkan bertentangan dengan ketentuan perundang-undangan, maka yang digunakan
              adalah ketentuan sesuai perundangan yang berlaku.
            </p>
          </Col>
        </Row>
        <Row className="mb-2">
          <Col md="6" sm="6"></Col>
          <Col md="6" sm="6">
            <Table borderless className="table-layout">
              <tbody>
                <tr>
                  <td>
                    Dikeluarkan di
                  </td>
                  <td>:</td>
                  <td>Kudus</td>
                </tr>
                <tr>
                  <td>
                    Pada Tanggal
                  </td>
                  <td>:</td>
                  <td>
                    November 2020
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row className="mb-2">
          <Col md="6" sm="6"></Col>
          <Col md="6" sm="6" className="text-center">
            Plt KEPALA DINAS<br />
            TENAGA KERJA PERINDUSTRIAN KOPERASI<br />
            USAHA KECIL DAN MENENGAH<br />
            Sekretaris<br /><br /><br /><br /><br />



            MARTI, SE, MM<br />
            Pembina Tk.1<br />
            NIP.196.305111986082001
          </Col>
        </Row>
        {/* <Row>
          <Col>
            Tembusan Kepada Yth<br />
            1. Plt Bupati Kudus<br />
            2. Arsip
          </Col>
        </Row> */}
      </Container>
    </PrintLayout>
  )
}

export default withAuth(Cetak)(['admin', 'kepala']);
import { Container, Row, Col, Breadcrumb, BreadcrumbItem, Table } from "reactstrap";
import BaseLayout from "@/components/layouts/BaseLayout";
import Link from "next/link";

const Faq = (props) => {
  return (
    <BaseLayout
      title="FAQ"
      metaDescription="FAQ E-PKWT">
      <Container className="py-4">
        <Row>
          <Col className="py-4">
            <Breadcrumb>
              <BreadcrumbItem active>
                <Link href="/">
                  <a>Home</a>
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem>
                FAQ
              </BreadcrumbItem>
            </Breadcrumb>
          </Col>
        </Row>
        <Row>
          <Col className="mb-2">
            <h4>FAQ</h4>
            <Table>
              <tr>
                <td>
                  <b>Apa itu PKWT ?</b>
                </td>
              </tr>
              <tr>
                <td>
                  Perjanjian Kerja Waktu Tertentu (PKWT) atau disebut juga Perjanjian Kontrak adalah Perjanjian kerja antara pekerja/buruh dengan pengusaha untuk mengadakan hubungan kerja dalam waktu tertentu atau pekerjaan tertentu.
                </td>
              </tr>
              <tr>
                <td>
                  <b>Jenis pekerjaan apa saja yang diperbolehkan di PKWT?</b>
                </td>
              </tr>
              <tr>
                <td>
                  Tidak semua jenis pekerjaan/kegiatan dapat di PKWT, jenis kegiatan pekerjaan yang diperbolehkan melalui  PKWT adalah :
                  <ol>
                    <li>Pekerjaan yang sekali selesai atau sementara sifatnya.</li>
                    <li>Pekerjaan yang bersifat musiman.</li>
                    <li>Pekerjaan yang berhubungan dengan produk baru.</li>
                    <li>Pekerjaan harian lepas.</li>
                  </ol>
                </td>
              </tr>
              <tr>
                <td>
                  <b>Bagaimana setelah PKWT ditandatangani pekerja dan pengusaha ?</b>
                </td>
              </tr>
              <tr>
                <td>
                  PKWT wajib dicatatkan oleh pengusaha kepada Instansi yang bertanggung jawab dibidang ketenagakerjaan Kabupaten/Kota kalau di Kabupaten Kudus oleh Dinas Nakerperinkop dan UKM, selambat-lambatnya 7 (tujuh) hari kerja sejak PKWT ditandatangani oleh pekerja dan pengusaha.
                </td>
              </tr>
              <tr>
                <td>
                  <b>Bagaimana cara pengusaha mencatatkan PKWT ?</b>
                </td>
              </tr>
              <tr>
                <td>
                  Untuk mencatatkan PKWT dapat lewat link Dinas Nakerperinkop dan UKM Kabupaten Kudus melalui e-pkwt.kuduskab.go.id
                </td>
              </tr>
              <tr>
                <td>
                  <b>Mengapa PKWT harus dicatatkan kepada Dinas?</b>
                </td>
              </tr>
              <tr>
                <td>
                  Karena sesuai ketentuan perundangan PKWT wajib dicatatkan untuk memperoleh Bukti Pencatatan PKWT.
                </td>
              </tr>
            </Table>
          </Col>
        </Row>
      </Container>
    </BaseLayout>
  )
}

export default Faq;
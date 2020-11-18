import withAuth from '@/components/hoc/withAuth';
import DashLayout from "@/components/layouts/DashLayout";
import { Container, Row, Table, Col, Button, Card, CardBody, Form, FormGroup, Label, Input } from 'reactstrap';
import HeaderDashboard from '@/components/layouts/shared/HeaderDashboard';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Axios from 'axios';

const Index = ({itemuser}) => {
  const option_tahun = () => {
    const listtahun = [];
    for (let a = 2020; a < 2050; a++) {
      listtahun.push(<option value={a} key={a}>{a}</option>)
    }
    return listtahun;
  }

  const [ loadingproses, setLoadingProses ] = useState(false);
  const [ values, setValues ] = useState({
    bulan: 1,
    tahun: 2020
  })
  const [ listsurat, setListSurat ] = useState([]);
  const [ pekerja, setPekerja ] = useState({
    pria: 0,
    wanita: 0
  })
  const onHandleChange = (e) => {
    const [name, value] = e.target;
    setValues({...values, [name]: value})
  }

  const onHandleSubmit = (e) => {
    e.preventDefault();
    setLoadingProses(true);
    Axios.get(`/api/v1/surat/laporan?bulan=${values.bulan}&tahun=${values.tahun}`)
      .then(response => {
          setLoadingProses(false)
          // setListSurat()
          setListSurat(response.data.content.itemsurat)
          setPekerja({
            ...pekerja, ['pria']:response.data.content.pekerja_pria,
                        ['wanita']: response.data.content.pekerja_wanita
          });
        }
      )
      .catch(err => {
          setLoadingProses(false)
        }
      );
  }
  let no = 1;
  return (
    <DashLayout 
      user={itemuser}
      title="Laporan" 
      metaDescription="Laporan">
      <Container className="py-5 main-wrap">
        <HeaderDashboard title="Laporan" />
        <Row className="mb-4">
          <Col md="6" sm="6">
            <Card>
              <CardBody>
                <Form onSubmit={onHandleSubmit}>
                  <FormGroup>
                    <Label>Bulan</Label>
                    <Input type="select" name="bulan" defaultValue={values.bulan} onChange={onHandleChange}>
                      <option value="1">Januari</option>
                      <option value="2">Februari</option>
                      <option value="3">Maret</option>
                      <option value="4">April</option>
                      <option value="5">Mei</option>
                      <option value="6">Juni</option>
                      <option value="7">Juli</option>
                      <option value="8">Agustus</option>
                      <option value="9">September</option>
                      <option value="10">Oktober</option>
                      <option value="11">November</option>
                      <option value="12">Desember</option>
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label>Tahun</Label>
                    <Input type="select" name="tahun" defaultValue={values.tahun} onChange={onHandleChange}>
                      {option_tahun()}
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Button color="primary" disabled={loadingproses}>Buka Laporan</Button>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
        { listsurat.length > 0 &&
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <h4 className="text-center">Laporan Pengajuan PKWT</h4>
                  <div className="table-responsive">
                    <Table bordered>
                      <tbody>
                        <tr>
                          <td>Jumlah Surat</td>
                          <td>{listsurat.length}</td>
                        </tr>
                        <tr>
                          <td>Pekerja Pria</td>
                          <td>{pekerja.pria} Orang</td>
                        </tr>
                        <tr>
                          <td>Pekerja Wanita</td>
                          <td>{pekerja.wanita} Orang</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                  <h4 className="text-center">Detail Surat</h4>
                  <div className="table-responsive">
                    <Table>
                        <thead>
                          <tr>
                            <th>No</th>
                            <th>Nama Perusahaan</th>
                            <th>No Surat</th>
                            <th>Tanggal Pengajuan</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {listsurat.map((item, index) => {
                            return <tr key={item.id}>
                              <td>{no++}</td>
                              <td>{item.nama_perusahaan}</td>
                              <td>{item.no_surat}</td>
                              <td>{item.tanggal_pengajuan}</td>
                              <td>{item.status}</td>
                            </tr>
                          })}
                        </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        }
      </Container>
    </DashLayout>
  )
}

export default withAuth(Index)(['admin', 'kepala']);
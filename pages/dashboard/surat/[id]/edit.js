import withAuth from '@/components/hoc/withAuth';
import DashLayout from "@/components/layouts/DashLayout";
import { Container, Row, Table, Col, Button, Card, CardBody, FormGroup, Label, Input, Form, Alert, CardHeader } from 'reactstrap';
import HeaderDashboard from '@/components/layouts/shared/HeaderDashboard';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import {useRouter} from 'next/router';
import Link from 'next/link';
import NumberFormat from 'react-number-format';

const Index = ({itemuser}) => {
  // state
  const [ loadingproses, setLoadingProses ] = useState(false);
  const [ msg, setMsg ] = useState('');
  const [ status, setStatus ] = useState('');
  const [ itemsurat, setItemSurat ] = useState(null);
  const [ values, setValues ] = useState({
    // data perusahaan
    nama_perusahaan: itemuser.perusahaan != null? itemuser.perusahaan.nama_perusahaan: '',
    nama_pimpinan: itemuser.perusahaan != null? itemuser.perusahaan.nama_pimpinan: '',
    jabatan: itemuser.perusahaan != null? itemuser.perusahaan.jabatan: '',
    alamat: itemuser.perusahaan != null? itemuser.perusahaan.alamat: '',
    no_tlp: itemuser.perusahaan != null? itemuser.perusahaan.no_tlp: '',
    bidang_usaha: itemuser.perusahaan != null? itemuser.perusahaan.bidang_usaha: '',
    // end data perusahaan
    // isi surat
    no_surat: '',
    pekerja_pria: '',
    pekerja_wanita: '',
    upah_minimum: '',
    upah_maksimum: '',
    jangka_waktu_pkwt: '',
    alasan_pkwt: '',
    keterangan: '',
    status: '',
    // end isi surat
  });
  // end state
  // const
  const router = useRouter();
  useEffect(() => {
    const loadSurat = async () => {
      const dataSurat = await Axios.get(`/api/v1/surat/${router.query.id}`);
      if (dataSurat.data.status == 'success') {
        // setItemSurat(dataSurat.data.content);
        const surat = dataSurat.data.content.itemsurat;
        setItemSurat(dataSurat.data.content.itemsurat);
        setValues({...values, ['nama_perusahaan']: surat.nama_perusahaan,
        ['nama_pimpinan']: surat.nama_pimpinan,
        ['jabatan']: surat.jabatan,
        ['alamat']: surat.alamat,
        ['no_tlp']: surat.no_tlp,
        ['bidang_usaha']: surat.bidang_usaha,
        ['no_surat']: surat.no_surat,
        ['pekerja_pria']: surat.pekerja_pria,
        ['pekerja_wanita']: surat.pekerja_wanita,
        ['upah_minimum']: surat.upah_minimum,
        ['upah_maksimum']: surat.upah_maksimum,
        ['jangka_waktu_pkwt']: surat.jangka_waktu_pkwt,
        ['alasan_pkwt']: surat.alasan_pkwt,
        ['keterangan']: surat.keterangan,
        ['status']: surat.status})
      }
    }

    if (router && router.query) {
      loadSurat();
    }
  }, [router]);
  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setValues({...values, [name]: value});
  }
  const onHandleSubmit = (e) => {
    e.preventDefault();
    const querystring = require('querystring');
    setLoadingProses(true);
    Axios.post(`/api/v1/surat/${router.query.id}/update`, querystring.stringify(values))
      .then(response => {
        setLoadingProses(false);
        setMsg(response.data.msg);
        setStatus(response.data.status);
        if (response.data.status == 'success') {
          router.push('/dashboard/surat');
        }
      })
      .catch(err => {
        setLoadingProses(false);
        setMsg(err.message);
        setStatus('error');
      })
  }
  // end const
  return (
    <DashLayout 
      user={itemuser}
      title="Edit Surat" 
      metaDescription="Dashboard Surat">
      <Container className="py-5 main-wrap">
        <HeaderDashboard title="Edit Surat" />
          <Row>
            <Col>
              <Card>
                <CardHeader className="text-right">
                  <Link href="/dashboard/surat">
                    <a className="btn-danger btn-sm btn">Tutup</a>
                  </Link>
                </CardHeader>
                <CardBody>
                  { itemsurat != null && itemsurat.status == 'pending'
                  ? <Form onSubmit={onHandleSubmit}>
                      <Row>
                        <Col>
                          <FormGroup>
                            <Label>Nama Perusahaan</Label>
                            <Input type="text" name="nama_perusahaan" value={values.nama_perusahaan} onChange={onHandleChange} />
                          </FormGroup>
                          <FormGroup>
                            <Label>Nama Pimpinan</Label>
                            <Input type="text" name="nama_pimpinan" value={values.nama_pimpinan} onChange={onHandleChange} />
                          </FormGroup>
                          <FormGroup>
                            <Label>Jabatan</Label>
                            <Input type="text" name="jabatan" value={values.jabatan} onChange={onHandleChange} />
                          </FormGroup>
                          <FormGroup>
                            <Label>No Tlp</Label>
                            <Input type="text" name="no_tlp" value={values.no_tlp} onChange={onHandleChange} />
                          </FormGroup>
                          <FormGroup>
                            <Label>Bidang Usaha</Label>
                            <Input type="text" name="bidang_usaha" value={values.bidang_usaha} onChange={onHandleChange} />
                          </FormGroup>
                          <FormGroup>
                            <Label>Alamat</Label>
                            <Input type="textarea" name="alamat" value={values.alamat} onChange={onHandleChange} />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Label>No Surat</Label>
                            <Input type="text" name="no_surat" value={values.no_surat} onChange={onHandleChange} />
                          </FormGroup>
                          <Row>
                            <Col>
                              <FormGroup>
                                <Label>Pekerja Pria</Label>
                                <NumberFormat name="pekerja_pria" className="form-control" value={values.pekerja_pria} thousandSeparator={true} onChange={onHandleChange} />
                              </FormGroup>
                            </Col>
                            <Col>
                              <FormGroup>
                                <Label>Pekerja Wanita</Label>
                                <NumberFormat name="pekerja_wanita" className="form-control" value={values.pekerja_wanita} thousandSeparator={true} onChange={onHandleChange} />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <FormGroup>
                                <Label>Upah Minimum</Label>
                                <NumberFormat name="upah_minimum" className="form-control" value={values.upah_minimum} thousandSeparator={true} onChange={onHandleChange} />
                              </FormGroup>                          
                            </Col>
                            <Col>
                              <FormGroup>
                                <Label>Upah Maksimum</Label>
                                <NumberFormat name="upah_maksimum" className="form-control" value={values.upah_maksimum} thousandSeparator={true} onChange={onHandleChange} />
                              </FormGroup>
                            </Col>
                          </Row>
                          <FormGroup>
                            <Label>Jangka Waktu PKWT</Label>
                            <Input type="text" name="jangka_waktu_pkwt" value={values.jangka_waktu_pkwt} onChange={onHandleChange} />
                          </FormGroup>
                          <FormGroup>
                            <Label>Alasan</Label>
                            <FormGroup check>
                              <Label check>
                                { values.alasan_pkwt == "Sekali selesai, Sementara/maksimal penyelesaian 3 tahun"
                                ? <Input type="radio" name="alasan_pkwt" onClick={onHandleChange} value="Sekali selesai, Sementara/maksimal penyelesaian 3 tahun" defaultChecked />
                                : <Input type="radio" name="alasan_pkwt" onClick={onHandleChange} value="Sekali selesai, Sementara/maksimal penyelesaian 3 tahun" />
                                }
                                Sekali selesai, Sementara/maksimal penyelesaian 3 tahun
                              </Label>
                            </FormGroup>
                            <FormGroup check>
                              <Label check>
                                { values.alasan_pkwt == "Musiman"
                                ? <Input type="radio" name="alasan_pkwt" onClick={onHandleChange} value="Musiman" defaultChecked />
                                : <Input type="radio" name="alasan_pkwt" onClick={onHandleChange} value="Musiman" />
                                }
                                
                                Musiman
                              </Label>
                            </FormGroup>
                            <FormGroup check>
                              <Label check>
                                { values.alasan_pkwt == "Produk baru/kegiatan baru/produk tambahan"
                                ? <Input type="radio" name="alasan_pkwt" onClick={onHandleChange} value="Produk baru/kegiatan baru/produk tambahan" defaultChecked />
                                : <Input type="radio" name="alasan_pkwt" onClick={onHandleChange} value="Produk baru/kegiatan baru/produk tambahan" />
                                }
                                Produk baru/kegiatan baru/produk tambahan
                              </Label>
                            </FormGroup>
                            <FormGroup check>
                              <Label check>
                                { values.alasan_pkwt == "Perjanjian Kerja Harian Lepas (bekerja kurang dari 21 hari dalam 1 bulan, paling lama 3 bulan)"
                                ? <Input type="radio" name="alasan_pkwt" onClick={onHandleChange} value="Perjanjian Kerja Harian Lepas (bekerja kurang dari 21 hari dalam 1 bulan, paling lama 3 bulan)" defaultChecked />
                                : <Input type="radio" name="alasan_pkwt" onClick={onHandleChange} value="Perjanjian Kerja Harian Lepas (bekerja kurang dari 21 hari dalam 1 bulan, paling lama 3 bulan)" />
                                }
                                Perjanjian Kerja Harian Lepas (bekerja kurang dari 21 hari dalam 1 bulan, paling lama 3 bulan)
                              </Label>
                            </FormGroup>
                          </FormGroup>
                          <FormGroup>
                            <Label>Keterangan</Label>
                            <Input type="textarea" name="keterangan" value={values.keterangan} onChange={onHandleChange} />
                          </FormGroup>
                          { itemuser.role == 'kepala' || itemuser.role == 'admin'
                          ? <FormGroup>
                              <Label>Status</Label>
                              <Input type="select" name="status" onChange={onHandleChange} value={values.status}>
                                <option value="pending">Pending</option>
                                <option value="confirm">Confirm</option>
                              </Input>
                            </FormGroup>
                          : null
                          }
                          
                          <FormGroup>
                            <Button color="primary" disabled={loadingproses}>Update</Button>
                          </FormGroup>
                        </Col>
                      </Row>
                    </Form>
                  : <Alert color="warning">Data Sudah Dikonfirm</Alert>
                  }
                </CardBody>
              </Card>
            </Col>
          </Row>
      </Container>
    </DashLayout>
  )
}

export default withAuth(Index)(['admin', 'kepala', 'member']);
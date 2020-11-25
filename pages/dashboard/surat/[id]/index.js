import withAuth from '@/components/hoc/withAuth';
import DashLayout from "@/components/layouts/DashLayout";
import { Container, Row, Table, Col, Card, CardBody, CardHeader, Button, FormGroup, Input, Form, Label, Alert } from 'reactstrap';
import HeaderDashboard from '@/components/layouts/shared/HeaderDashboard';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Axios from 'axios';
import NumberFormat from 'react-number-format';
import FormData from 'form-data';
var DatePicker = require("reactstrap-date-picker");

const Index = ({itemuser}) => {
  const querystring = require('querystring');
  const [ itemsurat, setItemSurat ] = useState(null);
  const [ itempencatatan, setItemPencatatan ] = useState(null);
  const [ status, setStatus ] = useState('');
  const [ msg, setMsg ] = useState('');
  const [ listlampiran, setListLampiran ] = useState([]);
  const [ loadingproses, setLoadingProses ] = useState(false);
  const [ values, setValues ] = useState({
    jenis: 'pasal',
    title: '',
    no_pencatatan: '',
    tanggal_pencatatan: '',
    status: 'proses'
  });
  const router = useRouter();
  useEffect(() => {
    const loadSurat = async () => {
      const urlsurat = `/api/v1/surat/${router.query.id}`;
      const urllampiran = `/api/v1/lampiran?param=surat&surat_id=${router.query.id}`;
      const [ dataSurat, dataLampiran ] = await Promise.allSettled([
        Axios.get(urlsurat).then(r => r.data),
        Axios.get(urllampiran).then(r => r.data),
      ]);
      if (dataSurat.status == 'fulfilled') {
        setItemSurat(dataSurat.value.content.itemsurat);
        setItemPencatatan(dataSurat.value.content.itemsurat.pencatatan);
        // set form pencatatan
        if (dataSurat.value.content.itemsurat.pencatatan != null) {
          setValues({...values,['no_pencatatan']: dataSurat.value.content.itemsurat.pencatatan.no_pencatatan,
                              ['status']: dataSurat.value.content.itemsurat.pencatatan.status})
        }
      }

      if (dataLampiran.status == 'fulfilled') {
        setListLampiran(dataLampiran.value.content);
      }
    }

    if (router && router.query) {
      loadSurat();
    }
  }, [router]);

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    if (name == 'file') {
      setValues({...values, [name]: e.target.files[0]})
    } else {
      setValues({...values, [name]: value});
    }
  }

  const onHandleDateChange = (v,f) => {
    // console.log(v,f);
    setValues({...values, ['tanggal_pencatatan']: new Date(v).toISOString()});
  }

  const onHandleSubmitPencatatan = (e) => {
    e.preventDefault();
    if (itemsurat != null && itemsurat.pencatatan != null) {
      setLoadingProses(true);
      const data = {
        'tanggal_pencatatan': values.tanggal_pencatatan,
        'no_pencatatan': values.no_pencatatan,
        'surat_id': itemsurat.id,
        'status': values.status
      };
  
      Axios.patch(`/api/v1/pencatatan/${itemsurat.pencatatan.id}/update`, querystring.stringify(data))
        .then(response => {
          setLoadingProses(false);
          setMsg(response.data.msg);
          setStatus(response.data.status);
          if (response.data.status == 'success') {
            setItemPencatatan(response.data.content);
          }
        })
        .catch(err => {
          setLoadingProses(false);
          setMsg(err.message);
          setStatus('error');
        })
    } else {
      const data = {
        'tanggal_pencatatan': values.tanggal_pencatatan,
        'no_pencatatan': values.no_pencatatan,
        'surat_id': itemsurat.id,
      };
  
      Axios.post('/api/v1/pencatatan/simpan', querystring.stringify(data))
        .then(response => {
          setLoadingProses(false);
          setMsg(response.data.msg);
          setStatus(response.data.status);
          if (response.data.status == 'success') {
            setItemPencatatan(response.data.content);
          }
        })
        .catch(err => {
          setLoadingProses(false);
          setMsg(err.message);
          setStatus('error');
        })
    }

  }

  const onHandleSubmit = (e) => {
    e.preventDefault();
    setLoadingProses(true);
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('jenis', values.jenis);
    formData.append('file', values.file);
    formData.append('surat_id', itemsurat.id);
    const header = { 
      'content-type': 'multipart/form-data',
    };
    // console.log(formData);
    Axios.post('/api/v1/lampiran/simpan', formData, header)
      .then(response => {
        setLoadingProses(false);
        // console.log(response.data.content);
        if (response.data.status == 'success') {
          listlampiran.push(response.data.content);
          setStatus(response.data.status);
          setMsg(response.data.msg);
          // reset form
          document.getElementById('formlampiran').reset();
          formData.delete('title');
          formData.delete('jenis');
          formData.delete('file');
          formData.delete('surat_id');
          setValues({...values, ['jenis']: 'pasal', ['title']: ''});
          // end reset form
        } else {
          setStatus(response.data.status);
          setMsg(response.data.msg);
        }
      })
      .catch(err => {
        setStatus('error');
        setMsg(err.message);
        setLoadingProses(false);
      })
  }

  const onHandleDelete = (id, index) => {
    setLoadingProses(true);
    Axios.delete(`/api/v1/lampiran/${id}/delete`)
      .then(response => {
        setLoadingProses(false);
        if (response.data.status == 'success') {
          listlampiran.splice(index, 1);
        }
        setStatus(response.data.status);
        setMsg(response.data.msg);
      })
      .catch(err => {
        setLoadingProses(false);
        setStatus('error');
        setMsg(err.message);
      })
  }

  return (
    <DashLayout 
      user={itemuser}
      title="Detail Surat" 
      metaDescription="Dashboard Detail Surat">
      <Container className="py-5 main-wrap">
        <HeaderDashboard title="Detail Surat" />
        <Row className="mb-2">
          <Col>
            <Card>
              <CardHeader>
                <Row>
                  <Col>
                    <h5>Detail Surat</h5>
                  </Col>
                  <Col className="col-auto">
                    <Link href="/dashboard/surat">
                      <a className="btn btn-danger btn-sm">Tutup</a>
                    </Link>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table>
                  { itemsurat != null &&
                    <tbody>
                      <tr>
                        <td>No. Surat</td>
                        <td>
                          { itemsurat.no_surat }
                        </td>
                      </tr>
                      <tr>
                        <td>Perihal</td>
                        <td>
                          { itemsurat.perihal }
                        </td>
                      </tr>
                      <tr>
                        <td>Nama Perusahaan</td>
                        <td>
                          { itemsurat.nama_perusahaan }
                        </td>
                      </tr>
                      <tr>
                        <td>Alamat</td>
                        <td>
                          { itemsurat.alamat }
                        </td>
                      </tr>
                      <tr>
                        <td>Phone</td>
                        <td>
                          { itemsurat.no_tlp }
                        </td>
                      </tr>
                      <tr>
                        <td>Bidang Usaha</td>
                        <td>
                          { itemsurat.bidang_usaha }
                        </td>
                      </tr>
                      <tr>
                        <td>Pekerja Pria</td>
                        <td>
                          { <NumberFormat thousandSeparator={true} displayType={'text'} value={itemsurat.pekerja_pria} />}
                        </td>
                      </tr>
                      <tr>
                        <td>Pekerja Wanita</td>
                        <td>
                        { <NumberFormat thousandSeparator={true} displayType={'text'} value={itemsurat.pekerja_wanita} />}
                        </td>
                      </tr>
                      <tr>
                        <td>Upah Minimum</td>
                        <td>
                        { <NumberFormat thousandSeparator={true} displayType={'text'} value={itemsurat.upah_minimum} />}
                        </td>
                      </tr>
                      <tr>
                        <td>Upah Maksimum</td>
                        <td>
                        { <NumberFormat thousandSeparator={true} displayType={'text'} value={itemsurat.upah_maksimum} />}
                        </td>
                      </tr>
                      <tr>
                        <td>Alasan PKWT</td>
                        <td>
                          { itemsurat.alasan_pkwt }
                        </td>
                      </tr>
                      <tr>
                        <td>Keterangan</td>
                        <td>
                          { itemsurat.keterangan }
                        </td>
                      </tr>
                      <tr>
                        <td>Tanggal Pengajuan</td>
                        <td>
                          { itemsurat.tanggal_pengajuan }
                        </td>
                      </tr>
                      <tr>
                        <td>Status</td>
                        <td>
                          { itemsurat.status }
                        </td>
                      </tr>
                    </tbody>
                  }
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card className="mb-2">
              <CardHeader>
                Lampiran
              </CardHeader>
              <CardBody>
                <div className="table-responsive">
                  <Table>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Jenis</th>
                        <th>Status</th>
                        <th>File</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      { listlampiran.map((lampiran, index) => {
                        return (
                          <tr key={index}>
                            <td>{lampiran.title}</td>
                            <td>{lampiran.jenis}</td>
                            <td>
                              { lampiran.status }
                            </td>
                            <td>
                              <a href={lampiran.link}>
                                file
                              </a>
                            </td>
                            { lampiran.surat_status == 'pending'
                            ? <td>
                                <Link href={`/dashboard/lampiran/${lampiran.id}`}>
                                  <a className="btn btn-primary btn-sm mb-2 mr-2">Detail</a>
                                </Link>
                                {/* <Button color="primary" size="sm" disabled={loadingproses} className="mr-2 mb-2">Detail</Button> */}
                                { lampiran.status == 'pending' &&
                                  <Button color="danger" size="sm" disabled={loadingproses} className="mb-2" onClick={() => onHandleDelete(lampiran.id, index)}>Delete</Button>                              
                                }
                                {/* { lampiran.status == 'confirm' &&
                                  <Button color="danger" size="sm" disabled={true} className="mb-2">Delete</Button>                              
                                } */}
                              </td>
                            : <td>
                                <Link href={`/dashboard/lampiran/${lampiran.id}`}>
                                  <a className="btn btn-primary btn-sm mb-2 mr-2">Detail</a>
                                </Link>
                              </td>
                            }
                            
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
            { itemuser.role == 'member' && (itemsurat != null? itemsurat.status == 'pending': null)
            ? <Card>
                <CardHeader>
                  Form Lampiran
                </CardHeader>
                <CardBody>
                  {status == 'error' &&
                  <Alert color="warning">{msg}</Alert>
                  }

                  {status == 'success' &&
                  <Alert color="success">{msg}</Alert>
                  }
                  <Form onSubmit={onHandleSubmit} id="formlampiran">
                    <FormGroup>
                      <Label>Title</Label>
                      <Input type="text" name="title" value={values.title} onChange={onHandleChange} />
                    </FormGroup>
                    <FormGroup>
                      <Label>Jenis File</Label>
                      <FormGroup>
                        <FormGroup check>
                          <Label check>
                            <Input type="radio" name="jenis" onClick={onHandleChange} value="pasal" defaultChecked /> 
                            Pasal
                          </Label>
                        </FormGroup>
                        <FormGroup check>
                          <Label check>
                            <Input type="radio" name="jenis" onClick={onHandleChange} value="pekerja" /> 
                            Data Pekerja
                          </Label>
                        </FormGroup>
                      </FormGroup>
                    </FormGroup>
                    <FormGroup>
                      <Label>File</Label>
                      <Input type="file" name="file" onChange={onHandleChange} />
                    </FormGroup>
                    <FormGroup>
                      <Button color="primary" disabled={loadingproses}>Upload</Button>
                    </FormGroup>
                  </Form>
                </CardBody>
              </Card>
             : null 
            }
          </Col>
        </Row>
        { (itemuser.role == 'kepala' || itemuser.role == 'admin') && itemsurat != null && itemsurat.status == 'confirm'
          ? <Row>
              <Col md="6" sm="6">
                <Card>
                  <CardHeader>Nomor Registrasi Bukti Pencatatan</CardHeader>
                  <CardBody>
                    <Table>
                      <thead>
                        <tr>
                          <th>No Registrasi</th>
                          <th>Tanggal Pencatatan</th>
                          <th>Status</th>
                          <th></th>
                        </tr>
                      </thead>
                      {itempencatatan != null
                      ? <tbody>
                          <tr>
                            <td>
                              { itempencatatan.no_pencatatan}
                            </td>
                            <td>
                              { itempencatatan.tanggal_pencatatan}
                            </td>
                            <td>
                              { itempencatatan.status}
                            </td>
                          </tr>
                        </tbody>
                      : null
                      }
                    </Table>
                  </CardBody>
                </Card>
              </Col>
              <Col md="6" sm="6">
                <Card>
                  <CardHeader>Form Pencatatan</CardHeader>
                  <CardBody>
                    <Form onSubmit={onHandleSubmitPencatatan}>
                      <FormGroup>
                        <Label>Tanggal Pencatatan</Label>
                        <DatePicker onChange={(v, f) => onHandleDateChange(v, f)} value={values.tanggal_pencatatan} dateFormat="DD-MM-YYYY" name="tanggal_pencatatan" />
                      </FormGroup>
                      <FormGroup>
                        <Label>No Registrasi</Label>
                        <Input name="no_pencatatan" type="text" onChange={onHandleChange} value={values.no_pencatatan} />
                      </FormGroup>
                      { itempencatatan != null
                      ? <FormGroup>
                          <Label>Status</Label>
                          <Input type="select" name="status" defaultValue={values.status} onChange={onHandleChange}>
                            <option value="cetak">Cetak</option>
                            <option value="proses">Proses</option>
                          </Input>
                        </FormGroup>
                      : null
                      }
                      <FormGroup>
                      { itempencatatan != null
                      ? <Button color="primary" disabled={loadingproses}>Update</Button>
                      : <Button color="primary" disabled={loadingproses}>Simpan</Button>
                      }
                      </FormGroup>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          : null
        }
      </Container>
    </DashLayout>
  )
}

export default withAuth(Index)(['admin', 'kepala', 'member']);
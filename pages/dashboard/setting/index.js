import withAuth from '@/components/hoc/withAuth';
import DashLayout from "@/components/layouts/DashLayout";
import { Container, Row, Table, Col, Card, CardBody, Button, FormGroup, Input, Form, CardHeader, Label, Alert } from 'reactstrap';
import HeaderDashboard from '@/components/layouts/shared/HeaderDashboard';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import EditorDeskripsi from "@/components/blog/EditorDeskripsi";

const Index = ({itemuser}) => {
  // state
  const [ loadingproses, setLoadingProses ] = useState(false);
  const [ itemtandatangan, setItemTandatangan ] = useState(null);
  const [ msg, setMsg ] = useState('');
  const [ status, setStatus ] = useState('');
  const [ values, setValues ] = useState({
    nama: '',
    nip: '',
    jabatan: '',
    sub_jabatan: '',
    tembusan: ''
  })

  const querystring = require('querystring');
  // end state
  // useEffect
  useEffect(() => {
    const loadtandatangan = async () => {
      const urltandatangan = '/api/v1/tandatangan';
      const [ datatandatangan ] = await Promise.allSettled([
        Axios.get(urltandatangan),
      ]);
      if (datatandatangan.status == 'fulfilled') {
        setItemTandatangan(datatandatangan.value.data.content);
        const ttd = datatandatangan.value.data.content;
        if (ttd != null) {
          setValues({...values, ['nama']: ttd.nama,
          ['nip']: ttd.nip,
          ['jabatan']: ttd.jabatan,
          ['sub_jabatan']: ttd.sub_jabatan,
          ['tembusan']: ttd.tembusan});
        }
      }
    }
    loadtandatangan();
  },[]);
  // end useEffect
  // function
  // end function
  let no = 1;
  const onHandleChange = (e) => {
    const {name, value} = e.target;
    setValues({...values,[name]: value});
  }

  const handleEditorChange = (data) => {
    setValues({...values,['tembusan']: data});
  }

  const onHandleSubmit = (e) => {
    e.preventDefault();
    if (itemtandatangan == null) {
      setLoadingProses(true);
      Axios.post(`/api/v1/tandatangan/simpan`, querystring.stringify(values))
        .then(response => {
          setLoadingProses(false);
          if (response.data.status == 'success') {
            setItemTandatangan(response.data.content);
          }
          setMsg(response.data.msg);
          setStatus(response.data.status);
          setTimeout(() => {
            clearmsg();
          }, 2000);
        })
        .catch(err => {
          setLoadingProses(false);
          setMsg(err.message);
          setStatus('error');
          setTimeout(() => {
            clearmsg();
          }, 2000);
        })
    } else {
      setLoadingProses(true);
      Axios.post(`/api/v1/tandatangan/${itemtandatangan.id}/update`, querystring.stringify(values))
        .then(response => {
          setLoadingProses(false);
          if (response.data.status == 'success') {
            setItemTandatangan(response.data.content);
          }
          setMsg(response.data.msg);
          setStatus(response.data.status);
          setTimeout(() => {
            clearmsg();
          }, 2000);
        })
        .catch(err => {
          setLoadingProses(false);
          setMsg(err.message);
          setStatus('error');
          setTimeout(() => {
            clearmsg();
          }, 2000);
        })
    }
  }
  const clearmsg = () => {
    setMsg('');
    setStatus('');
  }
  return (
    <DashLayout 
      user={itemuser}
      title="Dashboard Setting" 
      metaDescription="Dashboard">
      <Container className="py-5 main-wrap">
        <HeaderDashboard title="Tanda Tangan" />
        <Row>
          <Col>
            <Card>
              <CardBody>
                { status == 'error' &&
                <Alert color="warning">{msg}</Alert>
                }

                { status == 'success' &&
                <Alert color="success">{msg}</Alert>
                }
                <Form onSubmit={onHandleSubmit}>
                  <Row>
                    <Col md="6" sm="6">
                      <FormGroup>
                        <Label>Nama</Label>
                        <Input name="nama" value={values.nama} type="text" onChange={onHandleChange} />
                      </FormGroup>
                      <FormGroup>
                        <Label>NIP</Label>
                        <Input name="nip" value={values.nip} type="text" onChange={onHandleChange} />
                      </FormGroup>
                    </Col>
                    <Col md="6" sm="6">
                      <FormGroup>
                        <Label>Jabatan</Label>
                        <Input name="jabatan" value={values.jabatan} type="text" onChange={onHandleChange} />
                      </FormGroup>
                      <FormGroup>
                        <Label>Sub Jabatan</Label>
                        <Input name="sub_jabatan" value={values.sub_jabatan} type="text" onChange={onHandleChange} />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label>Tembusan</Label>
                        {/* <Input name="tembusan" value={values.tembusan} type="textarea" rows="5" onChange={onHandleChange} /> */}
                        <EditorDeskripsi getEditorData={handleEditorChange} initialValues={values.tembusan} />
                      </FormGroup>
                      <FormGroup>
                        { itemtandatangan != null
                        ? <Button color="primary" disabled={loadingproses}>Update</Button>
                        : <Button color="primary" disabled={loadingproses}>Simpan</Button>
                        }
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </DashLayout>
  )
}

export default withAuth(Index)(['admin', 'kepala']);
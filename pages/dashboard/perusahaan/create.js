import withAuth from '@/components/hoc/withAuth';
import DashLayout from "@/components/layouts/DashLayout";
import { Container, Row, Table, Col, Button, Card, CardBody, FormGroup, Label, Input, Form, Alert } from 'reactstrap';
import HeaderDashboard from '@/components/layouts/shared/HeaderDashboard';
import Link from 'next/link';
import { useState } from 'react';
import Axios from 'axios';
import {useRouter} from 'next/router';

const Index = ({itemuser}) => {
  // state
  const [ loadingproses, setLoadingProses ] = useState(false);
  const [ msg, setMsg ] = useState('');
  const [ status, setStatus ] = useState('');
  const [ values, setValues ] = useState({
    nama_perusahaan: '',
    nama_pimpinan: '',
    jabatan: '',
    alamat: '',
    no_tlp: '',
    bidang_usaha: ''
  });
  // end state
  // const
  const router = useRouter();
  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setValues({...values, [name]: value});
  }
  const onHandleSubmit = (e) => {
    e.preventDefault();
    const querystring = require('querystring');
    setLoadingProses(true);
    Axios.post('/api/v1/perusahaan/simpan', querystring.stringify(values))
      .then(response => {
        setLoadingProses(false);
        setMsg(response.data.msg);
        setStatus(response.data.status);
        if (response.data.status == 'success') {
          
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
      title="Dashboard" 
      metaDescription="Dashboard">
      <Container className="py-5 main-wrap">
        <HeaderDashboard title="Input Data Perusahaan" />
        { itemuser.perusahaan == null
          ? <Row>
              <Col md="6">
                <Card>
                  <CardBody>
                    <Form onSubmit={onHandleSubmit}>
                      <FormGroup>
                        <Label>Nama Perusahaan</Label>
                        <Input type="text" name="nama_perusahaan" onChange={onHandleChange} />
                      </FormGroup>
                      <FormGroup>
                        <Label>Nama Pimpinan</Label>
                        <Input type="text" name="nama_pimpinan" onChange={onHandleChange} />
                      </FormGroup>
                      <FormGroup>
                        <Label>Jabatan</Label>
                        <Input type="text" name="jabatan" onChange={onHandleChange} />
                      </FormGroup>
                      <FormGroup>
                        <Label>Alamat</Label>
                        <Input type="textarea" name="alamat" onChange={onHandleChange} />
                      </FormGroup>
                      <FormGroup>
                        <Label>No Tlp</Label>
                        <Input type="text" name="no_tlp" onChange={onHandleChange} />
                      </FormGroup>
                      <FormGroup>
                        <Label>Bidang Usaha</Label>
                        <Input type="text" name="bidang_usaha" onChange={onHandleChange} />
                      </FormGroup>
                      <FormGroup>
                        <Button color="primary">Simpan</Button>
                      </FormGroup>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          : <Alert color="warning">Anda sudah menginput data perusahaan</Alert>
        }
      </Container>
    </DashLayout>
  )
}

export default withAuth(Index)(['admin', 'kepala', 'member']);
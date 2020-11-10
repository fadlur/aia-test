import withAuth from '@/components/hoc/withAuth';
import DashLayout from "@/components/layouts/DashLayout";
import HeaderDashboard from '@/components/layouts/shared/HeaderDashboard';
import Axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Container, Row, Col, Card, CardBody, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
const Password = ({itemuser}) => {
  const router = useRouter();
  const [ values, setValues ] = useState({
    password_baru: '',
    password_baru_confirm: '',
  });

  const [ msg, setMsg ] = useState('');
  const [ status, setStatus ] = useState('');
  const [ loadingproses, setLoadingProses ] = useState(false);
  const cetakMsg = (msg, status) => {
    setMsg(msg);
    setStatus(status);
  }

  const clearMsg = () => {
    setMsg('');
    setStatus('');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.password_baru.length < 6) {
      cetakMsg('Password harus lebih dari 6 karakter', 'error');
      setTimeout(() => {
        clearMsg();
      }, 2000);
    } else if (values.password_baru == '') {
      cetakMsg('Password baru masih kosong', 'error');
      setTimeout(() => {
        clearMsg();
      }, 2000);
    } else if (values.password_baru_confirm == '') {
      cetakMsg('Password baru confirm masih kosong', 'error');
      setTimeout(() => {
        clearMsg();
      }, 2000);
    } else if (values.password_baru_confirm !== values.password_baru) {
      cetakMsg('Password tidak sama', 'error');
      setTimeout(() => {
        clearMsg();
      }, 2000);
    } else {
      setLoadingProses(true);
    const data = {
      password_baru: values.password_baru,
      password_baru_confirm: values.password_baru_confirm,
    };
    // handleFormSubmit(data, true);
    const querystring = require('querystring');
    Axios.patch(`/api/v1/user/password`, querystring.stringify(data))
      .then(response => {
        setLoadingProses(false);
        if (response.data.status == 'success') {
          cetakMsg(response.data.msg, response.data.status);
          setTimeout(() => {
            clearMsg();
            router.push('/dashboard/profil');
          }, 2000);
        } else {
          cetakMsg(response.data.msg, response.data.status);
          setTimeout(() => {
            clearMsg();
          }, 2000);
        }
      })
      .catch(err => {
        setLoadingProses(false);
        cetakMsg(err.message, 'error');
        setTimeout(() => {
          clearMsg();
        }, 2000);
      })
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues({...values, [name]: value});
  }
  return (
    <DashLayout 
      user={itemuser}
      title="Dashboard" 
      metaDescription="Dashboard">
      <Container className="py-5 main-wrap">
        <HeaderDashboard title="Password" />
        <Row>
          <Col md="6">
            <Card>
              <CardBody>
                { status == 'error'
                ? <Alert color="warning">{msg}</Alert>
                : null
                }

                { status == 'success'
                ? <Alert color="success">{msg}</Alert>
                : null
                }
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label>Password Baru</Label>
                    <Input type="password" name="password_baru" defaultValue={values.password_baru} onChange={handleInputChange} />
                  </FormGroup>
                  <FormGroup>
                    <Label>Ulangi Password Baru</Label>
                    <Input type="password" name="password_baru_confirm" defaultValue={values.password_baru_confirm} onChange={handleInputChange} />
                  </FormGroup>
                  <FormGroup>
                    { loadingproses == true
                    ? <Button color="primary" disabled={loadingproses}>Loading</Button>
                    : <Button color="primary">Update</Button>
                    }
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </DashLayout>
  )
}

export default withAuth(Password)(['admin', 'member', 'kepala']);
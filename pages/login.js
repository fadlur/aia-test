import { Card, Container, Row, Col, CardBody, Breadcrumb, BreadcrumbItem, Form, FormGroup, Input, Button, Spinner, Alert, Label } from "reactstrap";
import BaseLayout from "@/components/layouts/BaseLayout";
import Link from "next/link";
import { useState, useEffect } from "react";
import Axios from "axios";
import Cookies from 'cookies';

const Login = (props) => {
  const { is_login } = props;
  const [status, setStatus] = useState('');
  const [msg, setMsg] = useState('');
  const [loadingProses, setLoadingProses ] = useState(false);
  const [values, setValues] = useState({
		email: '',
		password: ''
  });
  
  useEffect(() => {
		const url = '/api/v1/user';
		const loaduser = async () => {
			const [datauser] = await Promise.allSettled([
				Axios.get(url).then(r => r.data),
			]);

			if (datauser.status === 'fulfilled') {
				window.location.pathname="/dashboard";
			}
		}
		if (is_login) {
			loaduser();
		}

  }, []);
  
  const handleInputChange = (e) => {
    const {name, value} = e.target
    setValues({...values, [name]: value})
  }
  
  const handleSubmit = e => {
    e.preventDefault();
		setLoadingProses(true);
		const querystring = require('querystring');
		Axios.post('/api/v1/auth', querystring.stringify(values))
			.then(response => {
				setLoadingProses(false);
				setStatus(response.data.status);
				setMsg(response.data.msg);
				setTimeout(() => {
					window.location.pathname="/dashboard";					
				}, 500);
			})
			.catch(err => {
				setLoadingProses(false);
				setStatus('error');
				setMsg('Cek Email dan passwordmu');
			})
  }


  return (
    <BaseLayout
      title="Login"
      metaDescription="Login dashboard">
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
                Login
              </BreadcrumbItem>
            </Breadcrumb>
          </Col>
        </Row>
        <Row>
          <Col sm="12" md={{ size:4, offset:4 }} className="mb-2">
            <Card>
              <CardBody>
                { status == 'error' &&
									<Alert color="warning">{msg}</Alert>
								}
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label>Email</Label>
                    <Input 
                      name="email" 
                      required 
                      type="text" 
                      onChange={handleInputChange} />
                  </FormGroup>
                  <FormGroup>
                    <Label>Password</Label>
                    <Input 
                      name="password" 
                      required 
                      type="password" 
                      onChange={handleInputChange} />
                  </FormGroup>
                  <FormGroup>
                    { !loadingProses &&
                    <Button color="primary" className="btn-block">Login</Button>										
                    }
                    { loadingProses &&
                    <Button color="primary" className="btn-block" disabled={loadingProses}>
                      <Spinner color="light" size="sm" />
                    </Button>
                    }
                  </FormGroup>
                  <FormGroup>
                    <p>Belum punya akun? <Link href="/register"><a>Daftar Disini</a></Link><br />
                    Lupa password? <Link href="/forgetpassword"><a>Reset</a></Link></p>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </BaseLayout>
  )
}

export async function getServerSideProps(context) {
  const cookies = new Cookies(context.req, context.res, {keys: [process.env.COOKIE_SECRET]});
  const token_type = cookies.get('token_type', {signed: true});
  const access_token = cookies.get('access_token', {signed: true});
	const logged_in = cookies.get('is_login', {signed: true});
	let is_login = null;
	if (logged_in != null && logged_in) {
		is_login = true
	} else {
		is_login = false
	}
  return {
    props : {
      is_login
    }
  }
}

export default Login;
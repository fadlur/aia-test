import { Card, Container, Row, Col, CardBody, CardImg, CardTitle, CardText, Breadcrumb, BreadcrumbItem, Form, FormGroup, Label, Input, Button, Alert, Spinner } from "reactstrap";
import BaseLayout from "@/components/layouts/BaseLayout";
import Link from "next/link";
import { useRouter } from 'next/router';
import Cookies from 'cookies';
import { useEffect, useState } from "react";
import Axios from "axios";

const Login = ({is_login}) => {
  const router = useRouter();
  useEffect(() => {
    const loaduser = async () => {
      const url = '/api/v1/user';
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
    
    setValues({...values, ['email']: router.query.email});
  }, []);
  // state
  const [ loadingProses, setLoadingProses ] = useState(false);
  const [ values, setValues ] = useState({
    email: null,
  });
  const [ status, setStatus ] = useState('');
  const [ msg, setMsg ] = useState('');
  // end state
  const handleInputChange = (e) => {
    const {name, value} = e.target
    setValues({...values, [name]: value});
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setLoadingProses(true);
    const querystring = require('querystring');
    const datauser = {
      email: router.query.email,
      password: values.password,
      password_confirmation: values.password_confirmation,
      token: router.query.id
    }
    Axios.post('/api/v1/auth/resetpassword', querystring.stringify(datauser))
      .then(response => {
        setLoadingProses(false);
        if (response.data.status == 'success') {
          setTimeout(() => {
            router.push("/login");
          }, 1000);
          setStatus(response.data.status);
          setMsg(response.data.msg);
        } else {
          setStatus(response.data.status);
          setMsg(response.data.msg);
        }
      })
      .catch(err => {
        setLoadingProses(false);
        setStatus('error');
        setMsg(err.message);
      })
  }
  return (
    <BaseLayout
      title="Reset Password"
      metaDescription="Reset Password">
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
                Reset Password
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
                { status == 'success' &&
                  <Alert color="success">{msg}</Alert>
                }
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" placeholder="your@email.com" onChange={handleInputChange} defaultValue={router.query.email} disabled={true} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="new-password">New Password</Label>
                    <Input type="password" name="password" placeholder="password" onChange={handleInputChange} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="new-password">New Password Confirm</Label>
                    <Input type="password" name="password_confirmation" placeholder="password" onChange={handleInputChange} />
                  </FormGroup>
                  <FormGroup>
                    { !loadingProses &&
                    <Button color="primary" className="btn-block">Reset</Button>										
                    }
                    { loadingProses &&
                    <Button color="primary" className="btn-block" disabled={loadingProses}>
                      <Spinner color="light" size="sm" />
                    </Button>
                    }
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
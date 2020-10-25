import { Card, Container, Row, Col, CardBody, Breadcrumb, BreadcrumbItem, Form, FormGroup, Spinner, Alert, Label, Input, Button } from "reactstrap";
import BaseLayout from "@/components/layouts/BaseLayout";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import Axios from "axios";
import Cookies from 'cookies';

const ForgetPassword = ({is_login}) => {
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
      email: values.email,
    }
    Axios.post('/api/v1/auth/forgetpassword', querystring.stringify(datauser))
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
      title="Lupa Password"
      metaDescription="Lupa password">
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
                Forget Password
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
                    <Input type="email" name="email" placeholder="your@email.com" onChange={handleInputChange} disabled={loadingProses} />
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

export default ForgetPassword;
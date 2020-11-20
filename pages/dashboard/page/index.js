import withAuth from '@/components/hoc/withAuth';
import DashLayout from "@/components/layouts/DashLayout";
import { Container, Row, Table, Col, Card, CardBody, Button, FormGroup, Input, Form, CardHeader, Label, Alert } from 'reactstrap';
import HeaderDashboard from '@/components/layouts/shared/HeaderDashboard';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Axios from 'axios';

const Index = ({itemuser}) => {
  // state
  const [ loadingproses, setLoadingProses ] = useState(false);
  const [ listpage, setListPage ] = useState([]);
  const [ msg, setMsg ] = useState('');
  const [ status, setStatus ] = useState('');
  const [ values, setValues ] = useState({
    caption: '',
    image: null
  })

  const querystring = require('querystring');
  // end state
  // useEffect
  useEffect(() => {
    const loadpage = async () => {
      const urlpage = '/api/v1/blog';
      const [ datapage ] = await Promise.allSettled([
        Axios.get(urlpage),
      ]);
      if (datapage.status == 'fulfilled') {
        setListPage(datapage.value.data.content.data);
      }
    }
    loadpage();
  },[]);
  // end useEffect
  // function
  // end function
  let no = 1;
  const onHandleChange = (e) => {
    const {name, value} = e.target;
    if (name == 'image') {
      setValues({...values, [name]: e.target.files[0]})
    } else {
      setValues({...values, [name]: value});
    }
  }

  const onHandleSubmit = (e) => {
    e.preventDefault();
    setLoadingProses(true);
    const formData = new FormData();
    formData.append('caption', values.caption);
    formData.append('image', values.image);
    const header = { 
      'content-type': 'multipart/form-data',
    };
    // console.log(formData);
    Axios.post('/api/v1/blog/simpan', formData, header)
      .then(response => {
        setLoadingProses(false);
        // console.log(response.data.content);
        if (response.data.status == 'success') {
          listpage.push(response.data.content);
          setStatus(response.data.status);
          setMsg(response.data.msg);
          setTimeout(() => {
            clearmsg();
          }, 2000);
          // reset form
          document.getElementById('formslide').reset();
          formData.delete('caption');
          formData.delete('image');
          setValues({...values, ['caption']: '', ['image']: null});
          // end reset form
        } else {
          setStatus(response.data.status);
          setMsg(response.data.msg);
          setTimeout(() => {
            clearmsg();
          }, 2000);
        }
      })
      .catch(err => {
        setStatus('error');
        setMsg(err.message);
        setLoadingProses(false);
        setTimeout(() => {
          clearmsg();
        }, 2000);
      })
  }
  const clearmsg = () => {
    setMsg('');
    setStatus('');
  }

  const onHandleDelete = (id, index) => {
    setLoadingProses(true);
    Axios.delete(`/api/v1/blog/${id}/delete`)
      .then(response => {
        setLoadingProses(false);
        if (response.data.status == 'success') {
          listpage.splice(index, 1);
        }
        setStatus(response.data.status);
        setMsg(response.data.msg);
        setTimeout(() => {
          clearmsg();
        }, 2000);
      })
      .catch(err => {
        setStatus('error');
        setMsg(err.message);
        setLoadingProses(false);
        setTimeout(() => {
          clearmsg();
        }, 2000);
      })
  }
  return (
    <DashLayout 
      user={itemuser}
      title="Dashboard Page" 
      metaDescription="Dashboard">
      <Container className="py-5 main-wrap">
        <HeaderDashboard title="Page" />
        <Row className="mb-2">
          <Col>
            <Card>
              <CardHeader>
                <Link href={`/dashboard/page/create`}>
                  <a className="btn btn-primary btn-sm float-right">Baru</a>
                </Link>
              </CardHeader>
              <CardBody>
                { status == 'error' &&
                <Alert color="warning">{msg}</Alert>
                }

                { status == 'success' &&
                <Alert color="success">{msg}</Alert>
                }
                <div className="table-responsive">
                  <Table>
                    <thead>
                      <tr>
                        <th>No</th>
                        {/* <th>Image</th> */}
                        <th>Title</th>
                        <th>Content</th>
                        <th>Status</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {listpage.map((page, index) => {
                        return (
                          <tr key={page.id}>
                            <td>
                              {no++}
                            </td>
                            {/* <td width="150px">
                              <img src={page.image} alt="slide" width="100%" />
                            </td> */}
                            <td>
                              {page.title}
                            </td>
                            <td>
                              {page.content_summary}
                            </td>
                            <td>
                              {page.status}
                            </td>
                            <td>
                              <Link href={`/dashboard/page/${page.id}/edit`}>
                                <a className="btn btn-primary btn-sm mb-2 mr-2">Edit</a>
                              </Link>
                              <Button color="danger" size="sm" className="mb-2" onClick={() => onHandleDelete(page.id, index)} disabled={loadingproses}>Delete</Button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </DashLayout>
  )
}

export default withAuth(Index)(['admin', 'kepala']);
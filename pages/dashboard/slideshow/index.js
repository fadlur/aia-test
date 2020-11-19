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
  const [ listslideshow, setListSlideshow ] = useState([]);
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
    const loadslideshow = async () => {
      const urlslideshow = '/api/v1/slideshow';
      const [ dataslideshow ] = await Promise.allSettled([
        Axios.get(urlslideshow),
      ]);
      if (dataslideshow.status == 'fulfilled') {
        setListSlideshow(dataslideshow.value.data.content);
      }
      console.log(dataslideshow);
    }
    loadslideshow();
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
    console.log(formData);
    const header = { 
      'content-type': 'multipart/form-data',
    };
    // console.log(formData);
    Axios.post('/api/v1/slideshow/simpan', formData, header)
      .then(response => {
        setLoadingProses(false);
        // console.log(response.data.content);
        if (response.data.status == 'success') {
          listslideshow.push(response.data.content);
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
    Axios.delete(`/api/v1/slideshow/${id}/delete`)
      .then(response => {
        setLoadingProses(false);
        if (response.data.status == 'success') {
          listslideshow.splice(index, 1);
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
      title="Dashboard Slideshow" 
      metaDescription="Dashboard">
      <Container className="py-5 main-wrap">
        <HeaderDashboard title="Slideshow" />
        <Row className="mb-2">
          <Col>
            <Card>
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
                        <th>Slide</th>
                        <th>Caption</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {listslideshow.map((image, index) => {
                        return (
                          <tr key={image.id}>
                            <td>
                              {no++}
                            </td>
                            <td width="150px">
                              <img src={image.url} alt="slide" width="100%" />
                            </td>
                            <td>
                              {image.caption}
                            </td>
                            <td>
                              <Button color="danger" size="sm" onClick={() => onHandleDelete(image.id, index)} disabled={loadingproses}>Delete</Button>
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
        <Row>
          <Col>
            <Card>
              <CardBody>
                <Form id="formslide" onSubmit={onHandleSubmit}>
                  <FormGroup>
                    <Label>Slide</Label>
                    <Input type="file" name="image" onChange={onHandleChange} />
                  </FormGroup>
                  <FormGroup>
                    <Label>Caption</Label>
                    <Input type="textarea" name="caption" onChange={onHandleChange} rows="5" />
                  </FormGroup>
                  <FormGroup>
                    <Button color="primary" disabled={loadingproses}>Simpan</Button>
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

export default withAuth(Index)(['admin', 'kepala']);
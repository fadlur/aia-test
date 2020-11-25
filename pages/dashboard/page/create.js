import withAuth from '@/components/hoc/withAuth';
import DashLayout from "@/components/layouts/DashLayout";
import { Container, Row, Col, Card, CardBody, Button, FormGroup, Input, Form, Label, Alert } from 'reactstrap';
import HeaderDashboard from '@/components/layouts/shared/HeaderDashboard';
import { useState } from 'react';
import Axios from 'axios';
import { useRouter } from 'next/router';
import EditorDeskripsi from "@/components/blog/EditorDeskripsi";

const Index = ({itemuser}) => {
  const router = useRouter();
  // state
  const [ loadingproses, setLoadingProses ] = useState(false);
  const [ msg, setMsg ] = useState('');
  const [ status, setStatus ] = useState('');
  const [ values, setValues ] = useState({
    title: '',
    type: 'page',
    status: 'publish',
    content: '',
    image: null
  })

  const querystring = require('querystring');
  // end state
  // useEffect
  // useEffect(() => {
  //   const loadslideshow = async () => {
  //     const urlslideshow = '/api/v1/blog';
  //     const [ dataslideshow ] = await Promise.allSettled([
  //       Axios.get(urlslideshow),
  //     ]);
  //     if (dataslideshow.status == 'fulfilled') {
  //       setListSlideshow(dataslideshow.value.data.content);
  //     }
  //   }
  //   loadslideshow();
  // },[]);
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

  const handleEditorChange = (data) => {
    setValues({...values,['content']: data});
  }

  const onHandleSubmit = (e) => {
    e.preventDefault();
    setLoadingProses(true);
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('status', values.status);
    formData.append('type', values.type);
    formData.append('content', values.content);
    // formData.append('image', values.image);
    const header = { 
      'content-type': 'multipart/form-data',
    };
    // console.log(formData);
    Axios.post('/api/v1/blog/simpan', formData, header)
      .then(response => {
        setLoadingProses(false);
        // console.log(response.data.content);
        if (response.data.status == 'success') {
          setStatus(response.data.status);
          setMsg(response.data.msg);
          // reset form
          document.getElementById('formblog').reset();
          formData.delete('title');
          formData.delete('type');
          formData.delete('status');
          formData.delete('content');
          // formData.delete('image');
          setValues({...values, ['title']: ''
                              , ['content']: ''
                              , ['status']: 'publish'
                              , ['type']: 'page'});
          // end reset form         
          setTimeout(() => {
            clearmsg();
            router.push('/dashboard/page');
          }, 2000); 
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

  return (
    <DashLayout 
      user={itemuser}
      title="Dashboard Page" 
      metaDescription="Dashboard">
      <Container className="py-5 main-wrap">
        <HeaderDashboard title="Page" />
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
                <Form id="formblog" onSubmit={onHandleSubmit}>
                  <FormGroup>
                    <Label>Title</Label>
                    <Input type="text" name="title" value={values.title} onChange={onHandleChange} />
                  </FormGroup>
                  <FormGroup>
                    <Label>Content</Label>
                    {/* <Input type="textarea" name="content" value={values.content} onChange={onHandleChange} rows="5" /> */}
                    <EditorDeskripsi getEditorData={handleEditorChange} initialValues={values.content} />
                  </FormGroup>
                  <FormGroup>
                    <Label>Status</Label>
                    <Input type="select" name="status" value={values.status} onChange={onHandleChange}>
                      <option value="publish">Publish</option>
                      <option value="unpublish">Unpublish</option>
                    </Input>
                  </FormGroup>
                  {/* <FormGroup>
                    <Label>Feature Image (optional)</Label>
                    <Input type="file" name="image" onChange={onHandleChange} />
                  </FormGroup> */}
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
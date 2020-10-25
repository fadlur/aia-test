import Axios from "axios";
import { useState, useEffect } from "react";
import withAuth from '@/components/hoc/withAuth';
import DashLayout from "@/components/layouts/DashLayout";
import { Container,Row, Col, Form, FormGroup, Label, Button, Input, Card, CardBody, Alert } from "reactstrap"
import HeaderDashboard from '@/components/layouts/shared/HeaderDashboard';
import { useRouter } from "next/router";
const Edit = ({itemuser}) => {
  const router = useRouter();
  const [ loadingProses, setLoadingProses ] = useState(false);
  const [ itemprovinsi, setItemPronvinsi ] = useState([]);
  const [ itemkota, setItemKota ] = useState([]);
  const [ itemkecamatan, setItemKecamatan ] = useState([]);
  const [ values, setValues ] = useState({
    name: itemuser.name,
    phone: itemuser.phone,
    provinsi: itemuser.provinsi,
    kota: itemuser.kota,
    kecamatan: itemuser.kecamatan,
    kodepos: itemuser.kodepos,
    alamat: itemuser.alamat,
    kelurahan: itemuser.kelurahan,
    subdistrict_id: itemuser.subdistrict_id,
    city_id: itemuser.city_id,
    province_id: itemuser.province_id,
  });

  const [ msg, setMsg ] = useState('');
  const [ status, setStatus ] = useState('');
  const cetakMsg = (message, stat) => {
    setMsg(message);
    setStatus(stat);
  }

  const clearMsg = () => {
    setMsg('');
    setStatus('');
  }

  const [ ongkir, setOngkir ] = useState({
    kecamatan_id: null,
    nama_kecamatan: null,
    kota_id: null,
    nama_kota:null,
    provinsi_id: null,
    nama_provinsi: null
  });

  useEffect(() => {
    const loadprovinsi = async () => {
      try {
        const dataRes = await Axios.get('/api/v1/ongkir/provinsi');
        setItemPronvinsi(dataRes.data.content.itemprovinsi);
      } catch (error) {
      }
    }

    loadprovinsi();
  }, []);

  const handleInputChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  }
  const handleProvinsiChange = (id) => {
    setItemKota([]);
    setItemKecamatan([]);
    setOngkir({...ongkir, ['provinsi_id']: id});
    setLoadingProses(true);
    Axios.get(`/api/v1/ongkir/city?province=${id}`)
    .then(response => {
      setLoadingProses(false);
      cetakMsg(response.data.msg, 'success');
      setTimeout(() => {
        clearMsg();
      }, 2000);
      setItemKota(response.data.content.itemcity);
    })
    .catch(err => {
      setLoadingProses(false);
      setItemKota([]);
      cetakMsg(err.message, 'error');
      setTimeout(() => {
        clearMsg
      }, 2000);
    })
  }

  const handleKotaChange = (id) => {
    setItemKecamatan([]);
    setOngkir({...ongkir, ['kota_id']: id});
    setLoadingProses(true);
    Axios.get(`/api/v1/ongkir/subdistrict?city=${id}`)
    .then(response => {
      setLoadingProses(false);
      cetakMsg(response.data.msg, 'success');
      setTimeout(() => {
        clearMsg();
      }, 2000);
      setItemKecamatan(response.data.content.itemsubdistrict);
    })
    .catch(err => {
      setLoadingProses(false);
      cetakMsg(err.message, 'error');
      setItemKecamatan([]);
    })
  }

  const handleDetailKecamatan = (id) => {
    setLoadingProses(true);
    Axios.get(`/api/v1/ongkir/detailsubdistrict?city=${ongkir.kota_id}&id=${id}`)
    .then(response => {
      setLoadingProses(false);
      let subdistrict = response.data.content.itemsubdistrict;
      setValues({...values, ['city_id']: subdistrict.city_id,
            ['city']: subdistrict.city,
            ['province_id']: subdistrict.province_id,
            ['province']: subdistrict.province,
            ['subdistrict_id']: subdistrict.subdistrict_id,
            ['subdistrict_name']: subdistrict.subdistrict_name,
            ['type']: subdistrict.type});
      cetakMsg(response.data.msg, 'success');
      setTimeout(() => {
        clearMsg();
      }, 2000);
    })
    .catch(err => {
      setLoadingProses(false);
      cetakMsg(err.message, 'error');
      setTimeout(() => {
        clearMsg();
      }, 2000);
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoadingProses(true);
    const data = {
      name: values.name,
      phone: values.phone,
      alamat: values.alamat,
      kelurahan: values.kelurahan,
      negara: values.negara,
      kodepos: values.kodepos,
      city_id: values.city_id,
      city: values.type+' '+values.city,
      province_id: values.province_id,
      province: values.province,
      subdistrict_id: values.subdistrict_id,
      subdistrict_name: values.subdistrict_name,
    };
    // handleFormSubmit(data, true);
    const querystring = require('querystring');
    Axios.patch(`/api/v1/user/update`, querystring.stringify(data))
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
  return (
    <DashLayout 
      user={itemuser}
      title="Dashboard" 
      metaDescription="Dashboard Grosir website">
      <Container className="py-5 main-wrap">
        <HeaderDashboard title="Profil" />
        <Row>
          <Col md="8">
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
                    <Label>Nama</Label>
                    <Input name="name" defaultValue={values.name} onChange={handleInputChange} />
                  </FormGroup>
                  <FormGroup>
                    <Label>No Tlp</Label>
                    <Input name="phone" defaultValue={values.phone} onChange={handleInputChange} />
                  </FormGroup>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label>Provinsi</Label>
                        <Input name="provinsi" type="select" onChange={(e) => handleProvinsiChange(e.target.value)}>
                          <option value="">Pilih Provinsi</option>
                          {itemprovinsi.map((pro, index) => 
                              <option key={index} value={pro.province_id}>{pro.province}</option>
                          )}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label>Kota</Label>
                        <Input name="kota" type="select" onChange={(e) => handleKotaChange(e.target.value)}>
                          <option value="">Pilih Kota</option>
                          { itemkota.map((kota, index) => 
                            <option key={index} value={kota.city_id}>{kota.type} {kota.city_name}</option>
                          )}
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label>Kecamatan</Label>
                        <Input name="kecamatan" type="select" onChange={(e) => handleDetailKecamatan(e.target.value)}>
                          <option value="">Pilih Kecamatan</option>
                          { itemkecamatan.map((kec, index) => 
                            <option key={index} value={kec.subdistrict_id}>{kec.subdistrict_name}</option>
                          )}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label>Kodepos</Label>
                        <Input name="kodepos" type="text" defaultValue={values.kodepos} onChange={handleInputChange} />
                      </FormGroup>
                    </Col>
                  </Row>
                  <FormGroup>
                    <Label>Kelurahan</Label>
                    <Input name="kelurahan" type="text" defaultValue={values.kelurahan} onChange={handleInputChange} />
                  </FormGroup>
                  <FormGroup>
                    <Label>Alamat</Label>
                    <Input name="alamat" type="textarea" defaultValue={values.alamat} onChange={handleInputChange} />
                  </FormGroup>
                  <FormGroup>
                    { loadingProses == true
                      ? <Button color="primary" disabled={loadingProses}>Loading</Button>
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

export default withAuth(Edit)(['admin', 'owner', 'admin-outlet']);
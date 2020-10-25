import Cookies from 'cookies';
import axiosInstance from "@/components/lib/client";
import Axios from 'axios';

export default async (req, res) => {
  const cookies = new Cookies(req, res, {keys: [process.env.COOKIE_SECRET]});
  const token_type = cookies.get('token_type', {signed: true});
  const access_token = cookies.get('access_token', {signed: true});
  const is_login = cookies.get('is_login', {signed: true});
  try {
    const header = { 'Authorization': token_type+' '+access_token};
    const querystring = require('querystring');
    const data = {
      name: req.body.name,
      phone: req.body.phone,
      alamat: req.body.alamat,
      kelurahan: req.body.kelurahan,
      negara: req.body.negara,
      kodepos: req.body.kodepos,
      city_id: req.body.city_id,
      kota: req.body.city,
      province_id: req.body.province_id,
      provinsi: req.body.province,
      subdistrict_id: req.body.subdistrict_id,
      kecamatan: req.body.subdistrict_name,
    };
    console.log(data);
    const axiosRes = await axiosInstance.patch(`/auth/updateprofil`, querystring.stringify(data), { headers: header });
    res.status(200).json(axiosRes.data);
  } catch (error) {
    res.status(error.status || 400).json({message: 'Api error!'});
  }
}
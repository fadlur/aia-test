import Cookies from 'cookies';
import axiosInstance from "@/components/lib/client";

export default async (req, res) => {
  const cookies = new Cookies(req, res, {keys: [process.env.COOKIE_SECRET]});
  const token_type = cookies.get('token_type', {signed: true});
  const access_token = cookies.get('access_token', {signed: true});
  try {
    const header = { 'Authorization': token_type+' '+access_token};
    const querystring = require('querystring');
    const dataperusahaan = {
      nama_perusahaan: req.body.nama_perusahaan,
      nama_pimpinan: req.body.nama_pimpinan,
      jabatan: req.body.jabatan,
      alamat: req.body.alamat,
      no_tlp: req.body.no_tlp,
      bidang_usaha: req.body.bidang_usaha,
    }
    const axiosRes = await axiosInstance.post('/admin/perusahaan', querystring.stringify(dataperusahaan), { headers: header });
    res.status(200).json(axiosRes.data);
    console.log(axiosRes.data);
  } catch (error) {
    res.status(error.status || 400).json({message: 'Api error!'});
    console.log(error);
  }
}
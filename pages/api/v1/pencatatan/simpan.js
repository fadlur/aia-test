import Cookies from 'cookies';
import axiosInstance from "@/components/lib/client";

export default async (req, res) => {
  const cookies = new Cookies(req, res, {keys: [process.env.COOKIE_SECRET]});
  const token_type = cookies.get('token_type', {signed: true});
  const access_token = cookies.get('access_token', {signed: true});
  const is_login = cookies.get('is_login', {signed: true});
  if (is_login) {
    try {
      const header = { 'Authorization': token_type+' '+access_token};
      const data = {
        tanggal_pencatatan: req.body.tanggal_pencatatan,
        no_pencatatan: req.body.no_pencatatan,
        surat_id: req.body.surat_id,
      }
      const querystring = require('querystring');
      const axiosRes = await axiosInstance.post(`/admin/pencatatan`, querystring.stringify(data), { headers: header });
      res.status(200).json(axiosRes.data);
    } catch (error) {
      console.log(error);
      res.status(error.status || 400).json({message: 'Api error!'});
    }
  } else {
    res.status(403).json({message: 'Unauthorized'});
  }
}
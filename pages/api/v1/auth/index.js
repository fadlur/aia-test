import Cookies from 'cookies';
import axiosInstance from "@/components/lib/client";

export default async (req, res) => {
  const cookies = new Cookies(req, res, {keys: [process.env.COOKIE_SECRET]});
  // const cookies = new Cookies(req, res, {keys: ['KSJDNFLKLJLAKSJDLFKJALSKDJFLKJAL']});
  // const cookies = new Cookies(req, res);
  if (req.method == 'POST') {
    // kosongkan kuki
    cookies.set('access_token', '', {signed: true});
    cookies.set('token_type', '', {signed: true});
    cookies.set('is_login', false, {signed: true});
    // end kosongkan kuki
    try {
      const axiosRes = await axiosInstance.post('/auth/login', 
      {email: req.body.email, password: req.body.password});
      //ambil data token
      const data = axiosRes.data;
      // console.log(data);
      //set ke cookie
      cookies.set('access_token', data.access_token, {signed: true});
      cookies.set('token_type', data.token_type, {signed: true});
      cookies.set('is_login', true, {signed: true});
      const respon = {
        status: 'success',
        message: 'Login berhasil'
      }
      res.status(200).json(respon);
    } catch (error) {
      const respon = {
        status: 'error',
        message: 'Cek lagi email dan password'
      }
      res.status(error.status || 400).json(respon);
    }
  } else {
    res.status(200).json({'woy': 'tolong'});
  }
}
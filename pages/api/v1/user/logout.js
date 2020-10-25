import Cookies from 'cookies';
import axiosInstance from "@/components/lib/client";

export default async (req, res) => {
  // console.log('logout error woy');
  try {
    const cookies = new Cookies(req, res, {keys: [process.env.COOKIE_SECRET]});
    const token_type = cookies.get('token_type', {signed: true});
    const access_token = cookies.get('access_token', {signed: true});
    const header = { 'Authorization': token_type+' '+access_token};
    const axiosRes = await axiosInstance.post('/auth/logout', {}, { headers: header });
    cookies.set('access_token', '', {signed: true});
    cookies.set('token_type', '', {signed: true});
    cookies.set('is_login', false, {signed: true});
    // console.log(axiosRes.data);
    res.status(200).json(axiosRes.data);
  } catch (err) {
    // console.log(err);
    res.status(err.status || 400).json({message: err.message});
  }
}
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
      email: req.body.email,
      password: req.body.password,
      key: process.env.API_KEY,
    };
    const axiosRes = await axiosInstance.post(`/register`, querystring.stringify(data), { headers: header });
    res.status(200).json(axiosRes.data);
    console.log(axiosRes.data);
  } catch (error) {
    console.log(error);
    res.status(error.status || 400).json({message: 'Api error!'});
  }
}
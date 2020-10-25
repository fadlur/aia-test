import Cookies from 'cookies';
import axiosInstance from "@/components/lib/client";

export default async (req, res) => {
  const cookies = new Cookies(req, res, {keys: [process.env.COOKIE_SECRET]});
  const apikey = process.env.API_KEY;
  const querystring = require('querystring');
  try {
    const datauser = {
      email: req.body.email,
      key: apikey
    }
    let urlserver = `/forgetpassword`;
    const axiosRes = await axiosInstance.post(urlserver, querystring.stringify(datauser));
    res.status(200).json(axiosRes.data);
  } catch (error) {
    res.status(error.status || 400).json({message: 'Api error!'});
  }  
}
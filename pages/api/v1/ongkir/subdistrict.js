import Cookies from 'cookies';
import axiosInstance from "@/components/lib/client";

export default async (req, res) => {
  const cookies = new Cookies(req, res, {keys: [process.env.COOKIE_SECRET]});
  const token_type = cookies.get('token_type', {signed: true});
  const access_token = cookies.get('access_token', {signed: true});
  try {
    const header = { 'Authorization': token_type+' '+access_token};
    let urlserver = `/admin/loadsubdistrict?city=${req.query.city}`;
    const axiosRes = await axiosInstance.get(urlserver, { headers: header });
    res.status(200).json(axiosRes.data);
  } catch (error) {
    res.status(error.status || 400).json({message: 'Api error!'});
  }  
}
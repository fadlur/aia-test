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
      const querystring = require('querystring');
      const data = {'status': req.body.status};
      const axiosRes = await axiosInstance.patch(`/admin/user/${req.query.id}?role=${req.query.role}`, querystring.stringify(data), { headers: header });
      res.status(200).json(axiosRes.data);
    } catch (error) {
      res.status(error.status || 400).json({message: 'Api error!'});
    }
  } else {
    res.status(403).json({message: 'Unauthorized'});
  }
}
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
        nama_perusahaan: req.body.nama_perusahaan,
        nama_pimpinan: req.body.nama_pimpinan,
        jabatan: req.body.jabatan,
        alamat: req.body.alamat,
        no_tlp: req.body.no_tlp,
        bidang_usaha: req.body.bidang_usaha,
        // end data perusahaan
        // isi surat
        no_surat: req.body.no_surat,
        perihal: req.body.perihal,
        pekerja_pria: req.body.pekerja_pria,
        pekerja_wanita: req.body.pekerja_wanita,
        upah_minimum: req.body.upah_minimum,
        upah_maksimum: req.body.upah_maksimum,
        jangka_waktu_pkwt: req.body.jangka_waktu_pkwt,
        alasan_pkwt: req.body.alasan_pkwt,
        keterangan: req.body.keterangan,
      }
      const querystring = require('querystring');
      const axiosRes = await axiosInstance.post(`/admin/surat`, querystring.stringify(data), { headers: header });
      res.status(200).json(axiosRes.data);
    } catch (error) {
      res.status(error.status || 400).json({message: 'Api error!'});
    }
  } else {
    res.status(403).json({message: 'Unauthorized'});
  }
}
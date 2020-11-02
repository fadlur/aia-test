import Cookies from 'cookies';
import axiosInstance from "@/components/lib/client";
const FormData = require('form-data');
const formidable = require('formidable');
const fs = require('fs'); 
const path = require('path') 

export const config = {
  api: {
    bodyParser: false,
  }
}
export default async (req, res) => { 
  // parse request
  const reqParse = await new Promise(function(resolve, reject) {
    const form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
  // console.log(reqParse.files.image);
  try {
    const cookies = new Cookies(req, res, {keys: [process.env.COOKIE_SECRET]});
    const token_type = cookies.get('token_type', {signed: true});
    const access_token = cookies.get('access_token', {signed: true});
    
    const formData = new FormData();
    let formHeaders = formData.getHeaders();
    const header = { 
      'Authorization': token_type+' '+access_token,
      'content-type': 'multipart/form-data',
      ...formHeaders
    };
    // formData.append('image', fs.createReadStream(reqParse.files.image.path), {filename: reqParse.files.image.name, contentType: 'image/jpeg'});
    formData.append('file', fs.createReadStream(reqParse.files.file.path));
    formData.append('jenis', reqParse.fields.jenis);
    formData.append('title', reqParse.fields.title);
    formData.append('surat_id', reqParse.fields.surat_id);
    formData.append('status', 'pending');
    // if (reqParse.fields.outlet_id != null) {
    //   formData.append('outlet_id', reqParse.fields.outlet_id)
    // }
    const axiosRes = await axiosInstance.post('/admin/lampiran', formData, { headers: header });
    res.status(200).json(axiosRes.data);
  } catch (error) {
    console.log(error);
    res.status(error.status || 400).json({message: 'Api error!'});
  }
  // res.status(200).json(reqParse);
}
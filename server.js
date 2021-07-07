const express = require('express');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();
const bodyParser = require('body-parser');

app.prepare().then(() => {
  const server = express();
  server.use(bodyParser.json()) // for parsing application/json
  server.all('*', (req, res) => {
    return handle(req, res);
  })

  const PORT = process.env.PORT || 3003;

  server.listen(PORT, (err) => {
    if (err) {
      console.log(err);
    }

    console.log(`Ready on Port ${PORT}`);
  })
})
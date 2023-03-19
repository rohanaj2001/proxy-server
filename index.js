const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const httpProxy = require('http-proxy');
const app = express();
const proxy = httpProxy.createProxyServer({});
const morgan = require('morgan');
app.use(morgan('tiny'));

app.get('/', (req, res)=>{
  console.log("requested");
  res.status(200).send({message : "success"});
})

// app.use('/api/v1/admin', (req, res) => {
//   const targetUrl = process.env.TARGET_URL;
  
//   // Proxy the request to the target server
//   proxy.web(req, res, { target: targetUrl });
// });

app.listen(process.env.PORT, () => {
  console.log(`Proxy server listening on port ${process.env.PORT}`);
});

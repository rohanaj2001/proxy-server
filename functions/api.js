const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const serverless = require('serverless-http')
const app = express();
const router = express.Router()

const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer({});
const morgan = require('morgan');
app.use(morgan('tiny'));


router.get('/', (req, res)=>{
  res.status(200).send({message : "success"});
})

router.use('/api/v1/admin', (req, res) => {
  const targetUrl = process.env.TARGET_URL;
  
  // Proxy the request to the target server
  proxy.web(req, res, { target: targetUrl });
});

app.use('/.netlify/functions/api', router)

module.exports.handler =   serverless(app);
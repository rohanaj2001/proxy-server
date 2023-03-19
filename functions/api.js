const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const httpProxy = require('http-proxy');
const app = express();
const router = express.Router()
const proxy = httpProxy.createProxyServer({});
const morgan = require('morgan');
app.use(morgan('tiny'));


const serverless = require('serverless-http')
router.get('/', (req, res)=>{
  res.status(200).send({message : "success"});
})

router.use('/api/v1/admin', (req, res) => {
  const targetUrl = process.env.TARGET_URL;
  
app.use('/.netlify/functions/api', router)
  // Proxy the request to the target server
  proxy.web(req, res, { target: targetUrl });
});



module.exports.handler =   serverless(app);
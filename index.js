const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const httpProxy = require('http-proxy');
const app = express();
const proxy = httpProxy.createProxyServer({});

app.use('/api/v1/admin', (req, res) => {
  const targetUrl = process.env.TARGET_URL || 'http://localhost:5000';
  
  // Proxy the request to the target server
  proxy.web(req, res, { target: targetUrl });
});

app.listen(8080, () => {
  console.log('Proxy server listening on port 8080');
});

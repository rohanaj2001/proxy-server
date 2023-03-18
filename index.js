require('dotenv');
const express = require('express');
const httpProxy = require('http-proxy');
const app = express();
const proxy = httpProxy.createProxyServer({});

app.use('/api/v1/admin', (req, res) => {
  console.log("request successful");
  const targetUrl = process.env.PROXY_URL;

  // Proxy the request to the target server
  proxy.web(req, res, { target: targetUrl });
});

app.listen(8080, () => {
  console.log('Proxy server listening on port 8080');
});

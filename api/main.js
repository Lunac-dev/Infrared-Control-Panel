const express = require('express');
const app = express();
const axios = require('axios');

app.set('trust proxy', 1)

app.get("/remove/:name", async function(req, res) {
  const response = await axios.delete(`${process.env.INFRARED_API_URL}/proxies/${req.params.name}`)
  if (response.status === 200) {
    res.json({status: '200'})
  } else {
    res.json({status: '400'})
  }
})

app.get("/add", async function(req, res) {
  const domainNames = req.header('domainNames').split(',');
  const response = await axios.post(`${process.env.INFRARED_API_URL}/proxies/${req.header('name')}`, { domainNames, proxyTo: req.header('proxyTo') })
  if (response.status === 200) {
    res.json({status: '200'})
  } else {
    res.json({status: '400'})
  }
})

app.get("/proxies", async function(req, res) {
  const proxies = []
  const response = await axios.get(`${process.env.INFRARED_API_URL}/proxies`)
  for (const p in response.data) {
    const proxyjson = await axios.get(`${process.env.INFRARED_API_URL}/proxies/${response.data[p]}`)
    const proxy = proxyjson.data
    proxy.name = response.data[p]
    proxies.push(proxy)
  }
  res.json(proxies)
})

module.exports = {
  path: "/api/",
  handler: app
};
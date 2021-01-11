const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
// const { URL, URLSearchParams } = require('url');
// const btoa = require('btoa');

const BASE_URL = 'https://api.twitter.com';

const token = process.env.TWITTER_BEARER_TOKEN;
const headers = {
  authorization: `Bearer ${token}`,
};

const encodeQuery = (params) => {
  return Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join('&');
};

const sendRequest = async (res, endpoint, params) => {
  const encoded = encodeQuery(params);
  let resp = await fetch(BASE_URL + `${endpoint}?${encoded}`, {
    headers,
  });

  if (resp.errors) {
    return res.status(400).json(resp);
  }

  let data = await resp.json();
  return res.json(data);
};

// v2 recent search - over the last week
router.get('/search', async (req, res) => {
  const params = req.query;
  return sendRequest(res, '/2/tweets/search/recent', params);
});

// cashtag search not available in v2???
router.get('/cashtag', async (req, res) => {
  let params = req.query;
  if (params.query && params.query[0] !== '$')
    params.query = '$' + params.query;
  return sendRequest(res, '/1.1/search/tweets.json', params);
});

// API v1
router.get('/1.1/search', async (req, res) => {
  // console.log('Bearer token: ', token);
  const { query } = req.query;

  let resp = await fetch(BASE_URL + `/1.1/search/tweets.json?q=${query}`, {
    headers,
  });

  let data = await resp.json();
  console.log('Search result: ', data);

  res.json(data);
});

module.exports = router;

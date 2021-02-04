const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const BASE_URL =
  'https://query1.finance.yahoo.com/v7/finance/quote?lang=en-US&region=US&corsDomain=finance.yahoo.com';

const createUrl = (params) => {
  return (
    BASE_URL +
    '&' +
    Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join('&')
  );
};

const fetchQuotes = async (params, res) => {
  const url = createUrl(params);
  // console.log('QUOTE API: ', url);

  const response = await fetch(url);
  if (!response.ok) {
    return res.status(400).json(response);
  }

  const data = await response.json();
  return res.json(data);
};

router.get('/', async (req, res) => {
  const params = req.query;
  return fetchQuotes(params, res);
});

module.exports = router;

#! /usr/bin/env node
'use strict';

const fetch = require('node-fetch');
const btoa = require('btoa');

const consumerKey = process.env.CONSUMER_KEY;
const consumerKeySecret = process.env.CONSUMER_KEY_SECRET;
const encoded = btoa(
  `${encodeURI(consumerKey)}:${encodeURI(consumerKeySecret)}`
);
// console.log('Encoded: ', encoded);

fetch('https://api.twitter.com/oauth2/token', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    Authorization: `Basic ${encoded}`,
  },
  body: 'grant_type=client_credentials',
})
  .then((res) => res.json())
  .then((token) => console.log('Token: ', token.access_token));

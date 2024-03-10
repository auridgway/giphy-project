const express = require('express');
const pool = require('../modules/pool');
const axios = require('axios');
require('dotenv').config();


const router = express.Router();

const GIPHY_API_KEY= process.env.GIPHY_API_KEY;
// console.log('API KEY', GIPHY_API_KEY);
// 
router.get('/:search', (req, res) => {
    axios.get(`http://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${req.params.search}&limit=50`).then((response) => {
        res.send(response.data);
        console.log(req.body);
      }).catch( err => {
        console.log(err);
        res.sendStatus(500);
        console.log(`---------------------------------------`,err);
      });
  });

module.exports = router;
const fs = require('fs');
const axios = require('axios');
const to_json = require('xmljson').to_json;

const fetchStation = async () => {
  const res = await axios.get('http://radiko.jp/v3/station/region/full.xml');

  fs.writeFileSync('./src/data/station.json', JSON.stringify(res.data));
  console.log('finish load largeArea data');
};

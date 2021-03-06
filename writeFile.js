const fs = require('fs');
const axios = require('axios');
const to_json = require('xmljson').to_json;

const fetchStation = async () => {
  const res = await axios.get('http://radiko.jp/v3/station/region/full.xml');

  let stationDataArray = [];

  to_json(res.data, (error, data) => {
    const stationsData = data.region.stations;
    Object.values(stationsData).forEach((stations) => {
      Object.values(stations.station).forEach((station) => {
        stationDataArray.push({ ...stations.$, ...station });
      });
    });
  });

  fs.writeFileSync('./src/data/station.json', JSON.stringify(stationDataArray));
  console.log('finish load station data');
};

fetchStation();

const fs = require('fs');
const axios = require('axios');
const to_json = require('xmljson').to_json;

const fetchStation = async () => {
  const res = await axios.get('http://radiko.jp/v3/station/region/full.xml');

  let stationDataArray = [];

  to_json(res.data, (error, data) => {
    const stationArray = data.region.stations;
    Object.values(stationArray).forEach((stations) => {
      Object.values(stations.station).forEach((station) => {
        stationDataArray.push(station);
      });
    });
  });

  fs.writeFileSync('./src/data/station.json', JSON.stringify(stationDataArray));
  console.log('finish load station data');
};

fetchStation();

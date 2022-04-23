import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { Program, RadikoDayProgram, Radio } from '@/types/radikoProgram';
import stationData from '../../../data/station.json';
const to_json = require('xmljson').to_json;

export default async function radikoProgramApi(
  req: NextApiRequest,
  res: NextApiResponse<Radio[]>
) {
  const radikoResponse = await axios.get(
    `http://radiko.jp/v3/program/station/weekly/LFR.xml`
  );

  let radikoProgramData: Radio[] = [];

  to_json(radikoResponse.data, (erorr: any, data: any) => {
    const radikoDayProgram: RadikoDayProgram = {
      radiko: {
        ...data.radiko,
        stations: {
          station: {
            ...data.radiko.stations.station,
            progs: Object.values(data.radiko.stations.station.progs).map(
              (programs: any) => {
                return {
                  ...programs,
                  prog: Object.values(programs.prog).map((program: any) => {
                    return {
                      ...program,
                      tag: {
                        item: program.tag && Object.values(program.tag.item),
                      },
                    };
                  }),
                };
              }
            ),
          },
        },
      },
    };
    const radioList: Radio[] = radikoDayProgram.radiko.stations.station.progs
      .flatMap((program) => program.prog)
      .map((program: Program) => {
        return {
          title: program.title,
          desc: program.desc,
          genre: program.genre,
          img: program.img,
          info: program.info,
          url: program.url,
          station: {
            id: radikoDayProgram.radiko.stations.station.$.id,
            name: radikoDayProgram.radiko.stations.station.name,
          },
        };
      });
    const filteredRadioList: Radio[] = radioList
      .filter((radio: Radio) => !radio.title.includes('ショウアップナイター'))
      .filter((radio: Radio) => radio.title !== '放送休止');

    const distinctRadioList: Radio[] = Array.from(
      new Map(filteredRadioList.map((radio) => [radio.title, radio])).values()
    );
    radikoProgramData = distinctRadioList;
  });

  res.status(200).json(radikoProgramData);
}

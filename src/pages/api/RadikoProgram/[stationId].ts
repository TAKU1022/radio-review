import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { Program, RadikoDayProgram, Radio } from '@/types/radikoProgram';
const to_json = require('xmljson').to_json;

export default async function radikoProgramApi(
  req: NextApiRequest,
  res: NextApiResponse<Omit<Radio, 'radioId'>[]>
) {
  const stationId = req.query.stationId as string;
  console.log(stationId);
  const radikoResponse = await axios.get(
    `http://radiko.jp/v3/program/station/weekly/${stationId}.xml`
  );

  const radikoProgramData: Omit<Radio, 'radioId'>[] = [];

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
    const radioList: Omit<Radio, 'radioId'>[] =
      radikoDayProgram.radiko.stations.station.progs
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
    const filteredRadioList: Omit<Radio, 'radioId'>[] = radioList
      .filter(
        (radio: Omit<Radio, 'radioId'>) =>
          !radio.title.includes('ショウアップナイター') &&
          !radio.title.includes('Part')
      )
      .filter((radio: Omit<Radio, 'radioId'>) => radio.title !== '放送休止');

    const distinctRadioList: Omit<Radio, 'radioId'>[] = Array.from(
      new Map(filteredRadioList.map((radio) => [radio.title, radio])).values()
    );
    radikoProgramData.push(...distinctRadioList);
  });

  res.status(200).json(radikoProgramData);
}

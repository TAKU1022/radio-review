import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { Program, RadikoWeekProgram, Radio } from '@/types/radikoProgram';
import stationData from '../../../data/station.json';
const to_json = require('xmljson').to_json;

export default async function radikoProgramApi(
  req: NextApiRequest,
  res: NextApiResponse<Omit<Radio, 'radioId'>[]>
) {
  const stationId = req.query.stationId as string;
  const radikoResponse = await axios.get(
    `http://radiko.jp/v3/program/station/weekly/${stationId}.xml`
  );

  const radikoProgramData: Omit<Radio, 'radioId'>[] = [];

  to_json(radikoResponse.data, (erorr: any, data: any) => {
    const radikoDayProgram: RadikoWeekProgram = {
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
    const stationLogo = stationData.filter(
      (station) => station.id === radikoDayProgram.radiko.stations.station.$.id
    )[0].logo[4]._;
    const radioList: Omit<Radio, 'radioId'>[] =
      radikoDayProgram.radiko.stations.station.progs
        .flatMap((program) => program.prog)
        .map((program: Program) => {
          return {
            title: program.title,
            genre: program.genre,
            img: program.img,
            desc: program.desc,
            info: program.info,
            url: program.url,
            pfm: program.pfm,
            station: {
              id: radikoDayProgram.radiko.stations.station.$.id,
              name: radikoDayProgram.radiko.stations.station.name,
              logo: stationLogo,
            },
          };
        });

    const distinctRadioList: Omit<Radio, 'radioId'>[] = Array.from(
      new Map(radioList.map((radio) => [radio.pfm, radio])).values()
    );
    radikoProgramData.push(...distinctRadioList);
  });

  res.status(200).json(radikoProgramData);
}

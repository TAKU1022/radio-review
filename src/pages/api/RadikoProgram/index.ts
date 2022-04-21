import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { RadikoDayProgram } from '@/types/radikoProgram';
const to_json = require('xmljson').to_json;

export default async function radikoProgramApi(
  req: NextApiRequest,
  res: NextApiResponse<RadikoDayProgram | null>
) {
  const radikoResponse = await axios.get(
    'http://radiko.jp/v3/program/today/JP13.xml'
  );

  let radikoProgramData: RadikoDayProgram | null = null;

  to_json(radikoResponse.data, (erorr: any, data: any) => {
    const radikoDayProgram: RadikoDayProgram = {
      radiko: {
        ...data.radiko,
        stations: {
          station: Object.values(data.radiko.stations.station).map(
            (station: any) => {
              return {
                ...station,
                progs: {
                  ...station.progs,
                  prog: Object.values(station.progs.prog).map(
                    (program: any) => {
                      return {
                        ...program,
                        tag: {
                          item: program.tag && Object.values(program.tag.item),
                        },
                      };
                    }
                  ),
                },
              };
            }
          ),
        },
      },
    };
    radikoProgramData = radikoDayProgram;
  });

  res.status(200).json(radikoProgramData);
}

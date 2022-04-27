import type { NextApiRequest, NextApiResponse } from 'next';

export default async function radikoProgramApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).end();
}

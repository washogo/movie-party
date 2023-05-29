import { AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import instance from '../axios';

type Response = unknown;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const response = await instance.get<any, AxiosResponse<Response, any>>(
    `/movie/${id}?api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}&language=ja-JP`
  );
  res.status(200).json(response.data);
}

import { AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import instance from '../axios';

type Response = unknown;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { text } = req.query;
  const encodeText = encodeURI(text as unknown as string);

  const response = await instance.get<any, AxiosResponse<Response, any>>(
    `/search/movie?api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}&language=ja-JP&query=${encodeText}&page=1&include_adult=false`
  );
  res.status(200).json(response.data);
}

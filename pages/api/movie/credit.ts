import { AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import instance from '../axios';

type Response = {
  cast: {
    id: number;
    adult: boolean;
    cast_id: number;
    character: string;
    credit_id: string;
    gender: number;
    known_for_department: string;
    name: string;
    order: number;
    original_name: string;
    popularity: number;
    profile_path: string;
  }[];
  crew: {
    id: number;
    adult: boolean;
    credit_id: string;
    department: string;
    gender: number;
    job: string;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
  }[][];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const response = await instance.get<any, AxiosResponse<Response, any>>(
    `/movie/${id}/credits?api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}&language=ja-JP`
  );
  res.status(200).json(response.data);
}

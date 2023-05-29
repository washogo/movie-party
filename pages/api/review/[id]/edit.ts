import { doc, setDoc } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../firebase/firebase';

type Response = unknown;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, userId, movieTitle, imagePath, evaluation, review } = req.query;

  await setDoc(doc(db, 'reviews', `${id}`), {
    userId: userId,
    movieTitle: decodeURI(movieTitle as string),
    imagePath: imagePath,
    evaluation: evaluation,
    review: decodeURI(review as string),
  });

  return res.status(200).json({});
}

import { deleteDoc, doc } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../firebase/firebase';

type Response = unknown;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  await deleteDoc(doc(db, 'reviews', `${id}`))

  return res.status(200).json({});
}

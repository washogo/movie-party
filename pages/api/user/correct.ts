import { doc, getDoc } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../firebase/firebase';

type Response = unknown;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { uid } = req.query;
  const docRef = doc(db, 'users', `${uid}`);
  const docSnap = await getDoc<Response>(docRef);
  const data = docSnap.data();

  res.status(200).json(data);
}

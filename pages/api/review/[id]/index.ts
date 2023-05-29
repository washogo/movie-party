import { doc, getDoc } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../firebase/firebase';

type Response = unknown;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const docRef = doc(db, 'reviews', `${id}`);

  await getDoc(docRef).then((snapshot) => {
    const data = snapshot.data();
    return res.status(200).json(data);
  });
}

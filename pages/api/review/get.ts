import { collection, getDocs, query, where } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../firebase/firebase';

type Response = unknown;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;
  const q = query(collection(db, 'reviews'), where('userId', '==', userId));

  await getDocs(q).then((snapshot) => {
    const reviewList = snapshot.docs.map((doc) => ({
      id: doc.id,
      userId: doc.data().userId,
      movieTitle: doc.data().movieTitle,
      imagePath: doc.data().imagePath,
      evaluation: doc.data().evaluation,
      review: doc.data().review,
    }));
    return res.status(200).json(reviewList);
  });
}

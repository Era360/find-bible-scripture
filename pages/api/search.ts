// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import firebaseAdmin from 'firebase-admin'
import { getFirestore, FieldValue } from 'firebase-admin/firestore'
let serviceAccount = require('../../service-keys.json')

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount)
})

type Data = {
  text: string
}

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    query: string
  };
}

// initializeApp()

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<Data>
) {
  let userId: string = ""
  try {
    // Get the user's ID token from the Authorization header
    const idToken = req.headers.authorization?.split('Bearer ')[1];
    console.log("User Tokens: ", idToken)

    // Verify the ID token to ensure that the request is coming from an authenticated user
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken as string);
    userId = decodedToken.uid;
    console.log(`User ${userId} is authenticated`)

  } catch (error) {
    console.error(error);
    res.status(401).send({ text: "Unauthorized" })
  }

  // Get the user's credits from the Firestore database
  const db = getFirestore();
  const userRef = db.collection('users').doc(userId);
  const userDoc = await userRef.get()
  const credits = userDoc.data()?.credits;

  // Check if user has any credits left
  if (credits === 0) {
    return res.status(400).json({text: `You have no credits left`});
  } else{
    console.log(`user ${userId} has ${credits} credits.`)
  }

  // Deduct 1 credit from the user's account
  await userRef.update({ credits: FieldValue.increment(-1) });

  console.log("The Query: ", req.body.query)
  res.status(200).send({ text: 'Mark 12:11-13' })
}

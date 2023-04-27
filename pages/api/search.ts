// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import firebaseAdmin from 'firebase-admin'
import { getFirestore, FieldValue } from 'firebase-admin/firestore'
import { Configuration, OpenAIApi } from 'openai'
let serviceAccount = require('../../service-keys.json')


// Firebase Initiatization
if(firebaseAdmin.apps.length === 0){
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount)
  })
}

// OpenAi Initiatization
const configuration = new Configuration({
  apiKey: process.env.MACHA_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);



export type Data = {
  text?: string,
  story?: string,
  scripture?: string,
  scriptureText?: string
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
  /////////////////////////////////////////////////////
  // Firebase
  let userId: string = ""
  let theScripture: string = ""
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
//////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////
// OPENAI
  try {
    console.log("Fetching from openai....")
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Find a scripture in the Bible that matches a description, 
      if its not in the bible just say "not found" dont say anything else, the response should be in format of book : chapter : starting verse - ending verse, 
      Dont say what the scripture says. Here is the description: ${req.body.query}`,
      max_tokens: 20
    });
    theScripture = completion.data.choices[0].text as string
    console.log(completion.data.choices[0].text);
  } catch (error: any) {
    console.log("Failed Fetching from openai....")
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
  //////////////////////////////////////////////////

  try {
    const response = await fetch(`https://bible-api.com/${theScripture}`, {
        method: 'GET'
    })

    const { text } = await response.json()
    await db.collection(`users/${userId}/history`).add({
      story: req.body.query,
      scripture: theScripture,
      scriptureText: text
    });

    return res.status(200).json({
      story: req.body.query,
      scripture: theScripture,
      scriptureText: text
    });

} catch (error) {
    console.error((error as Error).message)
    await db.collection(`users/${userId}/history`).add({
      story: req.body.query,
      scripture: theScripture
    });

    return res.status(400).json({story: req.body.query, scripture: theScripture });
}
  
}

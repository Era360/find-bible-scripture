// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import firebaseAdmin from "firebase-admin";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import OpenAI from "openai";

// Firebase Initiatization
if (firebaseAdmin.apps.length === 0) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(
      JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string)
    ),
  });
}

// OpenAi Initiatization
const configuration = {
  apiKey: process.env.OPENAI_API_KEY,
};
const openai = new OpenAI(configuration);

const verseNotFound = (response: string) => {
  return JSON.parse(response).text === "not found";
};

const parseScripture = (response: string) => {
  return JSON.parse(response).text;
};

export type Data = {
  text?: string;
  story?: string;
  time?: Date;
  scripture?: string;
  scriptureText?: string;
};

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    query: string;
    storyId: string | boolean;
  };
}

// initializeApp()

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    /////////////////////////////////////////////////////
    // Firebase
    let userId: string = "";
    let theScripture: string = "";
    try {
      // Get the user's ID token from the Authorization header
      const idToken = req.headers.authorization?.split("Bearer ")[1];

      // Verify the ID token to ensure that the request is coming from an authenticated user
      const decodedToken = await firebaseAdmin
        .auth()
        .verifyIdToken(idToken as string);
      userId = decodedToken.uid;
      console.log(`User ${userId} is authenticated`);
    } catch (error) {
      console.error(error);
      res.status(401).send({ text: "Unauthorized" });
    }

    // Get the user's credits from the Firestore database
    const db = getFirestore();
    const userRef = db.collection("users").doc(userId);
    const userDoc = await userRef.get();
    const credits = userDoc.data()?.credits;

    // Check if user has any credits left
    if (credits === 0) {
      return res.status(400).json({ text: `You have no credits left` });
    } else {
      console.log(`user ${userId} has ${credits} credits.`);
    }

    //////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////
    // OPENAI
    try {
      console.log("Fetching from openai....");
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        response_format: {
          type: "json_object",
        },
        max_tokens: 50,
        messages: [
          {
            role: "system",
            content: `You are a language model trained to find Bible references based on user descriptions. 
            Your task is to provide a Bible reference that matches the user's description, regardless of the language used. If the description does not match any Bible reference,
            respond with a json object with the key "text" and the value "not found".

            If the description matches a Bible reference, respond with a json object with the key "text" and the value being the Bible reference in a format of book : chapter : starting verse - ending verse
            `,
          },
          {
            role: "user",
            content: req.body.query,
          },
        ],
      });
      theScripture = completion.choices[0].message.content as string;
      console.log(`Response: ${theScripture}`);
      console.log(`Parsed response: ${parseScripture(theScripture)}`);
    } catch (error: any) {
      console.log("Failed Fetching from openai....");
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
      return res.status(500).send({
        text: "3rd party error",
      });
    }
    //////////////////////////////////////////////////

    // Deduct 1 credit from the user's account when OPENAI request is a sucess
    await userRef.update({ credits: FieldValue.increment(-1) });

    try {
      if (verseNotFound(theScripture)) {
        if (req.body.storyId) {
          console.log(
            `updating not found scripture: ${req.body.storyId}, of user: ${userId} ....`
          );
          await db
            .collection(`users/${userId}/history`)
            .doc(req.body.storyId as string)
            .update({
              story: req.body.query,
              time: FieldValue.serverTimestamp(),
              scripture: "not found",
            });
        } else {
          await db.collection(`users/${userId}/history`).add({
            story: req.body.query,
            time: FieldValue.serverTimestamp(),
            scripture: "not found",
          });
        }
        console.log(`Couldn't find scripture: ${theScripture}`);

        return res.status(200).json({
          story: req.body.query,
          time: new Date(),
          scripture: "not found",
        });
      } else {
        console.log(`Getting scripture: ${parseScripture(theScripture)}....`);
        const response = await fetch(
          `https://bible-api.com/${parseScripture(theScripture)}`,
          {
            method: "GET",
          }
        );

        let { text }: { text: string } = await response.json();

        // Taking only 100 bible words
        if (text.split(" ").length > 100) {
          text = text.split(" ").slice(0, 100).join(" ") + "...";
        }

        if (req.body.storyId) {
          console.log(
            `updating scripture: ${req.body.storyId}, of user: ${userId} ....`
          );
          await db
            .collection(`users/${userId}/history`)
            .doc(req.body.storyId as string)
            .update({
              story: req.body.query,
              time: FieldValue.serverTimestamp(),
              scripture: parseScripture(theScripture),
              scriptureText: text,
            });
        } else {
          console.log(
            `adding scripture: ${parseScripture(
              theScripture
            )}, of user: ${userId} ....`
          );
          await db.collection(`users/${userId}/history`).add({
            story: req.body.query,
            time: FieldValue.serverTimestamp(),
            scripture: parseScripture(theScripture),
            scriptureText: text,
          });
        }

        return res.status(200).json({
          story: req.body.query,
          time: new Date(),
          scripture: parseScripture(theScripture),
          scriptureText: text,
        });
      }
    } catch (error) {
      console.error((error as Error).message);
      if (req.body.storyId) {
        await db
          .collection(`users/${userId}/history`)
          .doc(req.body.storyId as string)
          .update({
            story: req.body.query,
            time: FieldValue.serverTimestamp(),
            scripture: parseScripture(theScripture),
          });
      } else {
        await db.collection(`users/${userId}/history`).add({
          story: req.body.query,
          time: FieldValue.serverTimestamp(),
          scripture: parseScripture(theScripture),
        });
      }

      return res.status(400).json({
        story: req.body.query,
        time: new Date(),
        scripture: parseScripture(theScripture),
      });
    }
  } else {
    return res.status(404).json({
      text: "not found",
    });
  }
}

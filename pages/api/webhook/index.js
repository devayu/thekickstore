import Stripe from 'stripe';
import { buffer } from 'micro';
import * as admin from 'firebase-admin';
const serviceAccount = require('../../../firebase_permissions.json');
const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();
const stripe = new Stripe(process.env.STRIPE_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_KEY;
const fulfillOrder = async (session) => {
  const images = JSON.parse(session.metadata.images);
  const names = JSON.parse(session.metadata.names);
  const products = images.map((item, idx) => {
    return {
      name: names[idx],
      img: item,
    };
  });

  return app
    .firestore()
    .collection('users')
    .doc(session.customer_details.email)
    .collection('orders')
    .doc(session.id)
    .set({
      amount: session.amount_total / 100,
      paymentIntent: session.payment_intent,
      products,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => console.log('firebase add success'));
};
export default async (req, res) => {
  if (req.method === 'POST') {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers['stripe-signature'];

    let event;
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      console.log(err.message);
      return res.status(400).send(`Webhook error ${err.message}`);
    }
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      return fulfillOrder(session)
        .then(() => res.status(200))
        .catch((err) => res.status(400).send(`Webhook error ${err.message}`));
    }
  }
};
export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

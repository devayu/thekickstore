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
  fetch(
    `https://api.stripe.com/v1/checkout/sessions/${session.id}/line_items`,
    {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + process.env.STRIPE_SECRET_KEY,
      },
    }
  )
    .then((res) => res.json())
    .then((item) => {
      console.log('item', item);
      item.data?.map(async (order) => {
        return app
          .firestore()
          .collection('users')
          .doc(order.id)
          .collection('orders')
          .doc(order.price.id)
          .set({
            amount: order.amount_total / 100,
            products: [item.data.map((prod) => prod.price.product)],
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
          })
          .then(() => console.log('firebase add success'));
      });
    });
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
// j

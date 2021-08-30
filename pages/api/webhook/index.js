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
  fetch(`https://api.stripe.com/v1/checkout/sessions/${session}/line_items`, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + process.env.STRIPE_SECRET_KEY,
    },
  })
    .then((res) => res.json())
    .then((item) => {
      console.log('item', item);
      return app
        .firestore()
        .collection('users')
        .doc(item.data?.id)
        .collection('orders')
        .doc(item.data?.price.id)
        .set({
          amount: session.amount_total / 100,
          products: [item.data.map((prod) => prod.price.product)],
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => console.log('firebase add success'));
    });
};
// export default async (req,res)=>{
//   if(req.method ==='POST'){
//     const requestBuffer = await buffer(req);
//     const payload = requestBuffer.toString();
//     const sig = req.headers['stripe-signature']

//     let event;
//     try{
//       event = stripe.webhooks.constructEvent(
//         payload,
//         sig,
//         endpointSecret
//       );
//     }catch(err){
//       console.log(err.message);
//       return res.status(400).send(`Webhook error ${err.message}`)
//     }
//     if (event.type === 'checkout.session.completed') {
//       const session = event.data.object;
//     }
// }
// }
export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
export default async function handler(req, res) {
  if (req.method === 'GET')
    return fulfillOrder(
      'cs_test_a1qxgNxUXBjIm8Uz69JzY7oZSfizPBYcKuSX3O85L4IWBvCba9uNbiGAwX'
    )
      .then(() => res.status(200))
      .catch((err) => res.status(400).send(`Webhook error ${err.message}`));
  if (req.method === 'POST') {
    let event;
    try {
      const rawBody = await buffer(req);
      const signature = req.headers['stripe-signature'];
      event = stripe.webhooks.constructEvent(
        rawBody.toString(),
        signature,
        `${process.env.STRIPE_WEBHOOK_KEY}`
      );
    } catch (err) {
      console.log(`err message ${err.message}`);
      res.status(400).send(`Webhook error ${err.message}`);
      return;
    }

    console.log('Success ', event.id);
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      return fulfillOrder(session)
        .then(() => res.status(200))
        .catch((err) => res.status(400).send(`Webhook error ${err.message}`));
    }
    // res.json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method not allowed');
  }
}

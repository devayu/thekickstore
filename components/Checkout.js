import React from 'react';
import Stripe from 'stripe';

export const getServerSideProps = async () => {
  const stripe = new Stripe(process.env.STRIPE_KEY);
  const paymentIntent = await stripe.paymentIntents.create({});
};
const Checkout = () => {
  return <div></div>;
};

export default Checkout;

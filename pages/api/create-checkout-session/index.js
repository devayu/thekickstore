const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
export default async (req, res) => {
  const { items } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    shipping_rates: ['shr_1JU6EmSDCB8aj7Br4BohLCo6'],
    shipping_address_collection: { allowed_countries: ['IN'] },
    line_items: items.map((item) => ({
      price: item.priceID,
      quantity: item.productQuantity,
    })),
    mode: 'payment',
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/cart`,
  });

  res.status(200).json({ id: session.id });
};

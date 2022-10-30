import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'required',
        shipping_options: [
          // Fast shipping rate 
          { shipping_rate: 'shr_1LtXjiIOKuxk2WoouCrUBeRA' },
          // Free shipping rate 
          { shipping_rate:'shr_1LtXj5IOKuxk2WooDwcKlg0k' }
        ],
        line_items: req.body.map((item) => {
          const img = item.image[0].asset._ref;

          // https://cdn.sanity.io/images/hiq12y2b/production/9759ab2e59f1e71927b8c959401fad8d758ad52d-512x384.webp
          
          const newImage = img.replace('image-', 'https://cdn.sanity.io/images/hiq12y2b/production/').replace('-webp', '.webp');

          return {
            price_data: { 
              currency: 'eur',
              product_data: { 
                name: item.name,
                images: [newImage],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled:true,
              minimum: 1,
            },
            quantity: item.quantity
          }
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      }

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);

      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  try {
    const { cartItems } = JSON.parse(event.body);
console.log("cartItems received:", cartItems);

    const line_items = cartItems.map(item => {
      const price = Number(item.salePrice?.replace('$', ''));

      if (isNaN(price)) {
        throw new Error(`Invalid price: ${item.price}`);
      }

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: item.image ? [item.image] : [],
          },
          unit_amount: Math.round(price * 100),
        },
        quantity: item.quantity || 1,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: 'https://www.youtube.com',
      cancel_url: 'https://www.twitch.tv',
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ id: session.id }),
    };

  } catch (error) {
    console.error("Stripe error:", error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

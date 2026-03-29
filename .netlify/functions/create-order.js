const Razorpay = require("razorpay");

exports.handler = async (event) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });

    const { amount } = JSON.parse(event.body);

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR"
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        order: order,
        key: process.env.RAZORPAY_KEY_ID   // 👈 VERY IMPORTANT
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};

const Razorpay = require('razorpay');

exports.handler = async function(event, context) {
  try {
    const { amount } = JSON.parse(event.body);

    const razorpay = new Razorpay({
      key_id: "rzp_live_SX41eTosHlMBgR",        // ← Replace with your Key ID
      key_secret: "863KpU8lCqCA10zodbHVzeAg" // ← Replace with your Key Secret
    });

    const order = await razorpay.orders.create({
      amount: amount,   // in paise (₹100 = 10000 paise)
      currency: "INR",
      payment_capture: 1
    });

    return { statusCode: 200, body: JSON.stringify(order) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};

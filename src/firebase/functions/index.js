const functions = require("firebase-functions");
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: "YOUR_KEY_ID",
  key_secret: "YOUR_KEY_SECRET",
});

exports.createOrder = functions.https.onCall(async (data, context) => {
  const { amount, bookingId } = data;
  const order = await razorpay.orders.create({
    amount: amount * 100,
    currency: "INR",
    receipt: `receipt_${bookingId}`,
  });
  return order;
});

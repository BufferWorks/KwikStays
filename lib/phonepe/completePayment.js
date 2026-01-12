const axios = require("axios");

const complete_payment = async (
  accessToken,
  merchantOrderId,
  amount,
  mobileNumber,
  redirectUrl,
  callbackUrl
) => {
  try {
    console.log("final merchantorderid", merchantOrderId);

    const paymentResponse = await axios.post(
      `${process.env.CREATE_PAYMENT_URL}${process.env.CREATE_PAYMENT_ENDPOINT}`,
      {
        merchantOrderId: merchantOrderId,
        amount: amount,
        expireAfter: 1200,
        metaInfo: {
          udf1: `mobileNumber:${mobileNumber}`,
          udf2: `merchantOrderId:${merchantOrderId}`,
          udf3: `amount:${amount}`,
          udf4: `redirectUrl:${redirectUrl}`,
          udf5: `callbackUrl:${callbackUrl}`,
        },
        paymentFlow: {
          type: "PG_CHECKOUT",
          message: "Payment message used for collect requests",
          merchantUrls: {
            redirectUrl: redirectUrl,
          },
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `O-Bearer ${accessToken}`,
        },
      }
    );

    const redirectUrlFinal = paymentResponse.data.redirectUrl;

    return {
      status: paymentResponse.status,
      orderId: paymentResponse.orderId,
      redirectUrl: redirectUrlFinal,
      merchantOrderId: merchantOrderId,
    };
  } catch (error) {
    console.error(
      "Error in complete_payment:",
      error.response?.data || error.message
    );
    throw error;
  }
};

module.exports = complete_payment;

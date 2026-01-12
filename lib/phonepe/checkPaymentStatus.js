const axios = require("axios");
const generateAccessToken = require("./AccessTokenGenerator");

const checkPaymentStatus = async (merchantOrderId) => {
  const tokenResult = await generateAccessToken();
  if (!tokenResult.success) {
    throw new Error(tokenResult.error);
  }
  const accessToken = tokenResult.accessToken;

  const response = await axios.get(
    `${process.env.CHECK_PAYMENT_URL}${process.env.CHECK_PAYMENT_ENDPOINT_1}/${merchantOrderId}${process.env.CHECK_PAYMENT_ENDPOINT_2}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `O-Bearer ${accessToken}`,
      },
    }
  );
  console.log("response from checkpaymentstatus", response.data);
  const status = response.data.state; // like COMPLETED or FAILED
  const transactionId =
    response.data.paymentDetails?.[0]?.transactionId ||
    response.data.data?.paymentDetails?.[0]?.transactionId;

  return {
    state: status,
    transactionId,
    gatewayResponse: response.data,
  };
};

module.exports = checkPaymentStatus;

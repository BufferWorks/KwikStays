import { createPhonePeOrder } from "./phonepe";

export async function initiatePhonePePayment({
  merchantOrderId,
  amount,
  mobile,
  redirectUrl,
  callbackUrl,
}) {
  if (!merchantOrderId || !amount || !mobile) {
    throw new Error("Missing payment parameters");
  }

  const payload = {
    merchantOrderId,
    amount: amount * 100,
    mobile,
    redirectUrl,
    callbackUrl,
  };

  const response = await createPhonePeOrder(payload);

  if (!response?.success) {
    throw new Error("PhonePe order creation failed");
  }

  return {
    redirectUrl: response.redirectUrl,
    merchantOrderId,
  };
}

import complete_payment from "@/lib/phonepe/completePayment";
import generateAccessToken from "@/lib/phonepe/AccessTokenGenerator";
import { CloudCog } from "lucide-react";

export async function createPhonePeOrder({
  merchantOrderId,
  amount,
  mobile,
  redirectUrl,
  callbackUrl,
}) {
  try {
    const tokenResult = await generateAccessToken();

    if (!tokenResult.success) {
      throw new Error(tokenResult.error);
    }
    const accessToken = tokenResult.accessToken;

    const paymentResponse = await complete_payment(
      accessToken,
      merchantOrderId,
      amount,
      mobile,
      redirectUrl,
      callbackUrl
    );

    return {
      success: true,
      redirectUrl: paymentResponse.redirectUrl,
      merchantOrderId: paymentResponse.merchantOrderId,
    };
  } catch (error) {
    console.error(
      "Error processing payment:",
      error.response?.data || error.message
    );
    return {
      success: false,
      message: "Failed to process payment",
      error: error.response?.data || error.message,
    };
  }
}

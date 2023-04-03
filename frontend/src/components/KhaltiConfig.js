import axios from "axios";
import { payOrder } from "../actions/orderActions"; // Import payOrder action
import myKey from "./KhaltiKey";

const successPaymentHandler = (dispatch, orderId, order, paymentResult) => {
  console.log("Payload in successPaymentHandler: ", paymentResult); // Add a console log here
  console.log("idx: ", paymentResult.idx); // Add a console log for idx
  console.log("token: ", paymentResult.token); // Add a console log for token

  dispatch(
    payOrder(orderId, {
      paymentMethod: order.paymentMethod,
      referenceId: paymentResult.idx,
      paymentId: paymentResult.token,
      amount: paymentResult.amount, // Add this line
    })
  );
};

const KhaltiConfig = (dispatch, orderId, order) => {
  return {
    // ...other config properties
    publicKey: myKey.publicTestKey,
    productIdentity: "123454321",
    productName: "Mimikostudio",
    productUrl: "http://localhost:3000/",
    eventHandler: {
      onSuccess(payload) {
        // hit merchant api for initiating verfication
        console.log("Payment Sucessful!");
        console.log(payload);
        successPaymentHandler(dispatch, orderId, order, payload);
      },
      // onError handler is optional
      onError(error) {
        // handle errors
        console.log(error);
      },
      onClose() {
        console.log("widget is closing");
      },
    },
    paymentPreference: [
      "KHALTI",
      "EBANKING",
      "MOBILE_BANKING",
      "CONNECT_IPS",
      "SCT",
    ],
  };
};

export default KhaltiConfig;

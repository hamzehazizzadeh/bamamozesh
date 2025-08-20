const Kavenegar = require("kavenegar");

require("dotenv").config({ path: "./config.env" });

const { KAVENEGAR_API_KEY, KAVENEGAR_SENDER } = process.env;

const api = Kavenegar.KavenegarApi({
  apikey: KAVENEGAR_API_KEY,
});

exports.sendSMS = (receptor, message, isBulk, sender = KAVENEGAR_SENDER) => {
  let msg = `${message}\n\nسامانه آموزش جامع اصناف بم`;

  if (isBulk) msg += "\nلغو 11";

  api.Send({
    sender,
    message: msg,
    receptor,
  });
};

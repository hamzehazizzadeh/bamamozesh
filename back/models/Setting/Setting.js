const mongoose = require("mongoose");

const { Schema } = mongoose;
const { String } = Schema.Types;

const mongoSchema = new Schema(
  {
    paymentGateway: {
      zarinpal: {
        baseUrl: { type: String, default: "" },
        merchantId: { type: String, default: "" },
        callbackUrl: { type: String, default: "" },
        description: { type: String, default: "" },
        isActive: { type: Boolean, default: false, require: true },
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Setting", mongoSchema);

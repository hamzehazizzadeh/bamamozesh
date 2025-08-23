const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { errorMessage } = require("../../utils");
const { userRoleItems, genderTypeItems } = require("../../utils/enum");

const { Schema } = mongoose;
const { String, Boolean } = Schema.Types;

const mongoSchema = new Schema(
  {
    avatar: {
      type: String,
      default: null,
      maxlength: 255,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },
    fatherName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },
    unionName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },
    businessCategory: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },
    workAddress: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1024,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },
    gender: {
      type: String,
      enum: genderTypeItems,
      required: true,
    },
    nationalNumber: {
      type: String,
      required: true,
      unique: true,
      minlength: 10,
      maxlength: 10,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      minlength: 11,
      maxlength: 11,
    },
    role: {
      type: String,
      enum: userRoleItems,
      default: userRoleItems[1],
      required: true,
    },
    permissions: {
      type: [String],
      default: [],
    },
    isConfirm: {
      type: Boolean,
      default: true,
      require: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 255,
    },
  },
  {
    timestamps: true,
  }
);

mongoSchema.pre("save", function (next) {
  let user = this;

  if (!user.isModified("password")) return next();

  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) return next(err);

    user.password = hash;
    next();
  });
});

mongoSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    if (error.keyValue.nationalNumber)
      errorMessage(
        `کاربری با کد ملی ${error.keyValue.nationalNumber} قبلا ثبت نام کرده است`,
        422
      );
    else if (error.keyValue.phoneNumber)
      errorMessage(
        `کاربری با شماره موبایل ${error.keyValue.phoneNumber} قبلا ثبت نام کرده است`,
        422
      );
    else next();
  } else {
    next();
  }
});

module.exports = mongoose.model("User", mongoSchema);

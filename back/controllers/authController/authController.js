const bcrypt = require("bcryptjs");

const User = require("../../models/User/User");

const {
  errorMessage,
  resMessage,
  generateToken,
  generateRandomNumber,
} = require("../../utils");
const {
  registerUserValidation,
  forgotPasswordValidation,
  loginUserValidation,
} = require("../../utils/validation/validation");
const { sendSMS } = require("../../utils/sms");

exports.handleRegister = async (req, res, next) => {
  try {
    await registerUserValidation.validate(req.body);

    const {
      firstName,
      lastName,
      fatherName,
      unionName,
      businessCategory,
      workAddress,
      email,
      gender,
      nationalNumber,
      phoneNumber,
      password,
    } = req.body;

    const user = await User.create({
      firstName,
      lastName,
      fatherName,
      unionName,
      businessCategory,
      workAddress,
      email,
      gender,
      nationalNumber,
      phoneNumber,
      password,
    });

    const accessToken = generateToken(user);

    resMessage(res, 200, "حساب کاربری با موفقیت ایجاد شد", {
      accessToken,
    });
  } catch (err) {
    next(err);
  }
};

exports.handleLogin = async (req, res, next) => {
  const { phoneNumber, password } = req.body;

  try {
    await loginUserValidation.validate(req.body);

    const user = await User.findOne({ phoneNumber });
    if (!user) errorMessage("شماره موبایل یا کلمه عبور اشتباه است", 422);

    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) errorMessage("شماره موبایل یا کلمه عبور اشتباه است", 422);

    if (!user.isConfirm) errorMessage("حساب کاربری شما غیر فعال است", 422);

    const accessToken = generateToken(user);

    resMessage(res, 200, "ورود به حساب کاربری با موفقیت انجام شد", {
      accessToken,
    });
  } catch (err) {
    next(err);
  }
};

exports.handleForgotPassword = async (req, res, next) => {
  try {
    await forgotPasswordValidation.validate(req.body);

    const { nationalNumber, phoneNumber } = req.body;

    const user = await User.findOne({ nationalNumber, phoneNumber });

    if (!user) errorMessage("کاربری با این مشخصات یافت نشد", 404);

    const newPassword = generateRandomNumber(10_000_000, 90_000_000);

    user.password = newPassword;
    await user.save();

    sendSMS(phoneNumber, `کلمه عبور جدید:\n${newPassword}`);

    resMessage(res, 200, "کلمه عبور جدید به شماره موبایل شما ارسال شد");
  } catch (err) {
    next(err);
  }
};

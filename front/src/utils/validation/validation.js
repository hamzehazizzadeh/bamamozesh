import * as Yup from "yup";
import { verifyIranianNationalId } from "@persian-tools/persian-tools";

import { genderTypeItems, userRoleItems } from "../enum";

// Link
const linkRegex =
  /^(?!.*(?:https?:\/\/|www\.|(?:\b[a-zA-Z0-9\u0600-\u06FF-]+(?:\.[a-zA-Z\u0600-\u06FF]{2,})+\b))).*$/s;

// Phone Number
const phoneNumberRegex = /^09\d{9}$/;

export const isValidPhoneNumber = (phoneNumber) => {
  return phoneNumberRegex.test(phoneNumber);
};

// Email
const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const isValidEmail = (email) => {
  return emailRegex.test(email);
};

// Text
const persianRegex = /^[\u0600-\u06FF\u200C\u200B\s]+$/;
const englishRegex = /^[A-Za-z\s]+$/;

// Validation
const phoneNumber = Yup.string()
  .required("شماره موبایل الزامی است")
  .min(11, "شماره موبایل نمی تواند کمتر از 11 کاراکتر باشد")
  .max(11, "شماره موبایل نمی تواند بیشتر از 11 کاراکتر باشد")
  .matches(phoneNumberRegex, "شماره موبایل وارد شده معتبر نیست");
const password = Yup.string()
  .required("کلمه عبور الزامی است")
  .min(6, "کلمه عبور نمی تواند کمتر از 6 کاراکتر باشد")
  .max(255, "کلمه عبور نمی تواند بیشتر از 255 کاراکتر باشد");
const newPassword = Yup.string()
  .required("کلمه عبور جدید الزامی است")
  .min(6, "کلمه عبور جدید نمی تواند کمتر از 6 کاراکتر باشد")
  .max(255, "کلمه عبور جدید نمی تواند بیشتر از 255 کاراکتر باشد");
const confirmPassword = Yup.string()
  .required("تکرار کلمه عبور الزامی است")
  .oneOf(
    [Yup.ref("password"), null],
    "کلمه عبور و تکرار کلمه عبور یکسان نیستند"
  );
const firstName = Yup.string()
  .required("نام الزامی است")
  .max(255, "نام نمی تواند بیشتر از 255 کاراکتر باشد")
  .matches(persianRegex, "نام باید حروف فارسی باشد")
  .trim();
const lastName = Yup.string()
  .required("نام خانوادگی الزامی است")
  .max(255, "نام خانوادگی نمی تواند بیشتر از 255 کاراکتر باشد")
  .matches(persianRegex, "نام خانوادگی باید حروف فارسی باشد")
  .trim();
const fatherName = Yup.string()
  .required("نام پدر الزامی است")
  .max(255, "نام پدر نمی تواند بیشتر از 255 کاراکتر باشد")
  .matches(persianRegex, "نام پدر باید حروف فارسی باشد")
  .trim();
const unionName = Yup.string()
  .required("اسم اتحادیه الزامی است")
  .max(255, "اسم اتحادیه نمی تواند بیشتر از 255 کاراکتر باشد")
  .matches(persianRegex, "اسم اتحادیه باید حروف فارسی باشد")
  .trim();
const businessCategory = Yup.string()
  .required("رسته صنفی الزامی است")
  .max(255, "رسته صنفی نمی تواند بیشتر از 255 کاراکتر باشد")
  .matches(persianRegex, "رسته صنفی باید حروف فارسی باشد")
  .trim();
const workAddress = Yup.string()
  .required("آدرس محل کار الزامی است")
  .max(1024, "آدرس محل کار نمی تواند بیشتر از 1024 کاراکتر باشد")
  .trim();
const gender = Yup.string()
  .required("جنسیت الزامی است")
  .oneOf(genderTypeItems, "جنسیت مجاز نیست");
const email = Yup.string()
  .required("پست الکترونیک الزامی است")
  .email("پست الکترونیک وارد شده معتبر نیست")
  .trim();
const nationalNumber = Yup.string()
  .required("کد ملی الزامی است")
  .min(10, "کدملی نمی تواند کمتر از 10 کاراکتر باشد")
  .max(10, "کدملی نمی تواند بیشتر از 10 کاراکتر باشد")
  .test("is-valid-national-code", "کد ملی وارد شده معتبر نیست", (value) =>
    verifyIranianNationalId(value || "")
  );
const avatar = Yup.string()
  .max(255, "نام فایل تصویر پروفایل نمی تواند بیشتر از 255 کاراکتر باشد")
  .nullable();
const role = Yup.string()
  .required("نقش الزامی است")
  .oneOf(userRoleItems, "نقش مجاز نیست");
const verifyCode = Yup.string()
  .required("کد تایید الزامی است")
  .min(6, "کد تایید نمی تواند کمتر از 6 کاراکتر باشد")
  .max(6, "کد تایید نمی تواند بیشتر از 6 کاراکتر باشد");
const permissions = Yup.string()
  .required("سطح دسترسی الزامی است")
  .min(16, "سطح دسترسی نمی تواند کمتر از 16 کاراکتر باشد")
  .max(16, "سطح دسترسی نمی تواند بیشتر از 16 کاراکتر باشد");
const description = Yup.string().max(
  4096,
  "توضیحات نمی تواند بیشتر از 4096 کاراکتر باشد"
);
const paymentGatewayIsActive = Yup.boolean().required(
  "وضعیت درگاه پرداخت الزامی است"
);
const paymentGatewayBaseUrl = Yup.string().when(
  "isActive",
  (isActive, schema) => {
    return isActive[0]
      ? schema
          .required("آدرس وب سرویس‌ الزامی است")
          .url("آدرس وب سرویس‌ معتبر وارد کنید")
      : schema;
  }
);
const paymentGatewayCallbackUrl = Yup.string().when(
  "isActive",
  (isActive, schema) =>
    isActive[0]
      ? schema
          .required("آدرس بازگشت مشتری الزامی است")
          .url("آدرس بازگشت مشتری معتبر وارد کنید")
      : schema
);
const merchantId = Yup.string().when("isActive", (isActive, schema) =>
  isActive[0]
    ? schema
        .required("کد درگاه پرداخت الزامی است")
        .min(15, "کد درگاه پرداخت نمی‌تواند کمتر از 15 کاراکتر باشد")
    : schema
);
const zarinpal = Yup.object().shape({
  isActive: paymentGatewayIsActive,
  baseUrl: paymentGatewayBaseUrl,
  merchantId,
  callbackUrl: paymentGatewayCallbackUrl,
  description,
});
const paymentGateway = Yup.object().shape({
  zarinpal,
});

// Login User
export const loginUserValidation = Yup.object({
  phoneNumber,
  password,
});

// Register User
export const registerUserValidation = Yup.object({
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
  confirmPassword,
});

// Create User
export const confirmRegisterValidation = Yup.object({
  verifyCode,
});

// Forgot Password
export const forgotPasswordValidation = Yup.object({
  nationalNumber,
  phoneNumber,
});

// Edit User
export const editUserValidation = Yup.object({
  avatar,
  firstName,
  lastName,
  fatherName,
  unionName,
  businessCategory,
  workAddress,
  email,
  gender,
});

// Change Password
export const changePasswordValidation = Yup.object({
  password,
  newPassword,
  confirmPassword: Yup.string()
    .required("تکرار کلمه عبور جدید الزامی است")
    .oneOf(
      [Yup.ref("newPassword"), null],
      "کلمه عبور جدید و تکرار کلمه عبور جدید یکسان نیستند"
    ),
});

// Create User For Admin
export const createUserForAdminValidation = Yup.object().shape({
  avatar,
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
  role,
  permissions,
  password,
  confirmPassword,
});

// Edit User For Admin
export const editUserForAdminValidation = Yup.object().shape({
  avatar,
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
  permissions,
});

// Change User Password
export const changeUserPasswordValidation = Yup.object().shape({
  password,
  confirmPassword,
});

// Edit Setting
export const editSettingValidation = Yup.object().shape({
  paymentGateway,
});

const jwt = require("jsonwebtoken");
const moment = require("moment-jalaali");
const { isNumber } = require("lodash");

const { adminPermissions } = require("./enum");

moment.loadPersian({ usePersianDigits: false });

//* Start Math
exports.generateRandomNumber = (sum = 1000, mult = 9000) => {
  return Math.floor(sum + Math.random() * mult);
};
//* End Math

//* Start Response Message
exports.errorMessage = (message, statusCode, data) => {
  const error = new Error(message);
  error.statusCode = statusCode || 422;
  if (data) {
    error.data = data;
  }
  throw error;
};

exports.resMessage = (res, status, message, result) => {
  res.status(status).json({
    resultMessage: message,
    resultCode: status,
    result: result,
  });
};

exports.resMessageWithPagination = (
  pageNumber,
  numberOfItem,
  itemsCount,
  result
) => {
  return {
    currentPage: pageNumber,
    allPagesCount: Math.ceil(numberOfItem / itemsCount),
    nextPage: pageNumber + 1,
    previousPage: pageNumber - 1,
    hasNextPage: itemsCount * pageNumber < numberOfItem,
    hasPreviousPage: pageNumber > 1,
    ...result,
  };
};
//* End Response Message

//* Start Swagger
exports.swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Bam Amozesh API with Swagger",
      version: "1.0.0",
      description:
        "This is a CRUD API application made with Express and documented with Swagger",
    },
  },
  apis: [
    "./routes/authRoutes/authRoutes.js",
    "./routes/adminRoutes/adminRoutes.js",
    "./routes/studentRoutes/studentRoutes.js",
    "./routes/userRoutes/userRoutes.js",
    "./routes/publicRoutes/publicRoutes.js",
  ],
};
//* End Swagger

//* Start Date
exports.convertDateFormat = (date, format = "jD jMM jYYYY", locale = "fa") => {
  return moment(date).locale(locale).format(format);
};
//* End Date

//* Start Token
exports.generateToken = (user) => {
  return jwt.sign(
    {
      uid: user._id.toString(),
      nationalNumber: user.nationalNumber,
      phoneNumber: user.phoneNumber,
      role: user.role,
      permissions: user.permissions,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};
//* End Token

//* Start Number
exports.numberSeparate = (number) => {
  if (isNumber(number) || number)
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
//* Start Number

//* Start Permission
exports.getPermissionRegexCondition = (permissionKey) => {
  const permissionKeys = Object.keys(adminPermissions);
  const index = permissionKeys.indexOf(permissionKey);

  if (index === -1) this.errorMessage("کلید سطح دسترسی نامعتبر است");

  return { permissions: new RegExp(`^.{${index}}1`) };
};
exports.convertPermission = (permissions) =>
  permissions.reduce((acc, key) => {
    acc[key] = true;
    return acc;
  }, {});
//* End Permission

//* Start Join
exports.joinValues = (values, separator = " | ") => {
  return values?.join(separator);
};
//* End Join

//* Start Doc
exports.isMatchedDoc = (first, second) =>
  first?._id?.toString() === second?._id?.toString();
//* End Doc

//* Start Mongo Select
exports.mongoSelect = {
  userForAdmin: "-password",
  timeStamp: "-createdAt -updatedAt -_id -__v",
  setting: "terms",
  baseUser: "avatar firstName lastName email phoneNumber",
};
//* End Mongo Select

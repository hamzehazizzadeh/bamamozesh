const jwt = require("jsonwebtoken");

const User = require("../models/User/User");

const { errorMessage, convertPermission } = require("../utils");
const { userRoleItems } = require("../utils/enum");

exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    throw errorMessage("توکن اعتبارسنجی ارسالی نامعتبر است", 401);
  }
};

const getUser = async (uid) => {
  const user = await User.findById(uid).select(
    "nationalNumber phoneNumber role isConfirm permissions"
  );

  if (!user) throw errorMessage("کاربر یافت نشد", 401);
  if (!user.isConfirm) throw errorMessage("حساب کاربری شما غیر فعال است", 422);

  return user;
};

const checkRoles = (user, roles) => {
  if (!roles.includes(user.role))
    throw errorMessage("شما مجوز کافی برای این درخواست ندارید", 403);
};

exports.authenticated = (roles) => {
  return async (req, res, next) => {
    try {
      const authHeader = req.get("Authorization");
      if (!authHeader)
        throw errorMessage("لطفا توکن اعتبارسنجی را ارسال کنید", 401);

      const token = authHeader.split(" ")[1];
      const decodedToken = this.verifyToken(token);

      const user = await getUser(decodedToken.uid);
      checkRoles(user, roles);

      const userDetails = {
        id: user._id.toString(),
        nationalNumber: user.nationalNumber,
        phoneNumber: user.phoneNumber,
        role: user.role,
        isAdmin: user.role === userRoleItems[0],
        isStudent: user.role === userRoleItems[1],
        permissions: convertPermission(user.permissions || []),
      };

      req.user = userDetails;

      next();
    } catch (err) {
      next(err);
    }
  };
};

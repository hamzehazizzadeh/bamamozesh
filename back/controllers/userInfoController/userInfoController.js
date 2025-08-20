const bcrypt = require("bcryptjs");

const User = require("../../models/User/User");

const { resMessage, errorMessage } = require("../../utils");
const {
  editUserValidation,
  changePasswordValidation,
  createUserForAdminValidation,
  editUserForAdminValidation,
} = require("../../utils/validation/validation");

exports.handleEditUserInfo = async (req, res, next) => {
  try {
    await editUserValidation.validate(req.body);

    const user = await User.findById(req.user.id);

    if (!user) {
      errorMessage("کاربری یافت نشد", 404);
    }

    const {
      avatar,
      firstName,
      lastName,
      fatherName,
      unionName,
      businessCategory,
      workAddress,
      email,
      gender,
    } = req.body;

    user.avatar = avatar;
    user.firstName = firstName;
    user.lastName = lastName;
    user.fatherName = fatherName;
    user.unionName = unionName;
    user.businessCategory = businessCategory;
    user.workAddress = workAddress;
    user.email = email;
    user.gender = gender;

    await user.save();

    resMessage(res, 200, "اطلاعات با موفقیت ویرایش شد");
  } catch (err) {
    next(err);
  }
};

exports.handleGetUserInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select(
      "-password -isConfirm -updatedAt -permissions"
    );

    if (!user) {
      errorMessage("کاربری یافت نشد", 404);
    }

    resMessage(res, 200, "اطلاعات با موفقیت واکشی شد", user);
  } catch (err) {
    next(err);
  }
};

exports.handleChangePassword = async (req, res, next) => {
  try {
    await changePasswordValidation.validate(req.body);

    const { password, newPassword } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      errorMessage("کاربر یافت نشد", 404);
    }

    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      errorMessage("کلمه عبور اشتباه است", 422);
    }

    user.password = newPassword;
    await user.save();

    resMessage(res, 200, "کلمه عبور با موفقیت تغییر کرد");
  } catch (err) {
    next(err);
  }
};

exports.handleEditUserInfoForAdmin = async (req, res, next) => {
  try {
    await editUserForAdminValidation.validate(req.body);

    const user = await User.findById(req.params.id);

    if (!user) errorMessage("کاربری یافت نشد", 404);

    const {
      avatar,
      firstName,
      lastName,
      fatherName,
      unionName,
      businessCategory,
      workAddress,
      email,
      gender,
      permissions,
      nationalNumber,
      phoneNumber,
    } = req.body;

    user.avatar = avatar;
    user.firstName = firstName;
    user.lastName = lastName;
    user.fatherName = fatherName;
    user.unionName = unionName;
    user.businessCategory = businessCategory;
    user.workAddress = workAddress;
    user.email = email;
    user.gender = gender;
    user.permissions = permissions;
    user.nationalNumber = nationalNumber;
    user.phoneNumber = phoneNumber;

    await user.save();

    resMessage(res, 200, "اطلاعات با موفقیت ویرایش شد");
  } catch (err) {
    next(err);
  }
};

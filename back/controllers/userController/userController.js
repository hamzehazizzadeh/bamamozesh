const User = require("../../models/User/User");

const {
  resMessage,
  errorMessage,
  resMessageWithPagination,
} = require("../../utils");
const {
  changeUserPasswordForAdminValidation,
  createUserForAdminValidation,
} = require("../../utils/validation/validation");

exports.handleGetUsersForAdmin = async (req, res, next) => {
  const pageNumber = +req.query.pageNumber || 1;
  const itemsCount = +req.query.itemsCount || 50;
  const filter = req.query.filter || "";
  const role = req.query.role || "";

  const { id: uid } = req.user;

  try {
    const conditions = {
      ...(role && { role }),
      ...(filter && {
        $or: [
          { firstName: { $regex: filter, $options: "i" } },
          { lastName: { $regex: filter, $options: "i" } },
          { fatherName: { $regex: filter, $options: "i" } },
          { unionName: { $regex: filter, $options: "i" } },
          { businessCategory: { $regex: filter, $options: "i" } },
          { workAddress: { $regex: filter, $options: "i" } },
          { email: { $regex: filter, $options: "i" } },
          { nationalNumber: { $regex: filter, $options: "i" } },
          { phoneNumber: { $regex: filter, $options: "i" } },
        ],
      }),
      _id: { $not: { $eq: uid } },
    };

    const numberOfUser = await User.find(conditions).countDocuments();

    const users = await User.find(conditions)
      .select("-password")
      .skip((pageNumber - 1) * itemsCount)
      .limit(itemsCount)
      .sort({
        createdAt: "desc",
      });

    resMessage(
      res,
      200,
      `اطلاعات با موفقیت واکشی شد`,
      resMessageWithPagination(pageNumber, numberOfUser, itemsCount, {
        users,
      })
    );
  } catch (err) {
    next(err);
  }
};

exports.handleUserConfirmForAdmin = async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id);

    if (!user) {
      errorMessage("کاربری یافت نشد", 404);
    }

    user.isConfirm = !user.isConfirm;
    await user.save();

    resMessage(
      res,
      200,
      `کاربر با موفقیت ${user.isConfirm ? "غیر فعال" : "فعال"} شد`
    );
  } catch (err) {
    next(err);
  }
};

exports.handleDeleteUserForAdmin = async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await User.findByIdAndRemove(id);

    if (!user) errorMessage("کاربر یافت نشد", 404);

    resMessage(res, 200, `${user.firstName} ${user.lastName} با موفقیت حذف شد`);
  } catch (err) {
    next(err);
  }
};

exports.handleChangeUserPasswordForAdmin = async (req, res, next) => {
  try {
    await changeUserPasswordForAdminValidation.validate(req.body);

    const id = req.params.id;

    const { password } = req.body;

    const user = await User.findById(id);

    if (!user) errorMessage("کاربر یافت نشد", 404);

    user.password = password;
    await user.save();

    resMessage(
      res,
      200,
      `کلمه عبور ${user.firstName} ${user.lastName} با موفقیت تغییر کرد`
    );
  } catch (err) {
    next(err);
  }
};

exports.handleCreateUserForAdmin = async (req, res, next) => {
  try {
    await createUserForAdminValidation.validate(req.body);

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
      nationalNumber,
      phoneNumber,
      role,
      permissions,
      password,
    } = req.body;

    const user = await User.create({
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
      password,
      role,
      permissions,
    });

    resMessage(res, 200, `کاربر ${firstName} ${lastName} با موفقیت ایجاد شد`, {
      user,
    });
  } catch (err) {
    next(err);
  }
};

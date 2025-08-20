const Setting = require("../../models/Setting/Setting");

const { resMessage, errorMessage } = require("../../utils");
const { editSettingValidation } = require("../../utils/validation/validation");

exports.handleGetSetting = async (req, res, next) => {
  try {
    let setting = await Setting.findOne();

    resMessage(res, 200, `اطلاعات با موفقیت واکشی شد`, { setting });
  } catch (err) {
    next(err);
  }
};

exports.handleEditSetting = async (req, res, next) => {
  try {
    await editSettingValidation.validate(req.body);

    let setting = await Setting.findOne();

    if (!setting) errorMessage("تنظیمات یافت نشد", 404);

    const { paymentGateway } = req.body;

    setting.paymentGateway = paymentGateway;

    await setting.save();

    resMessage(res, 200, "تنظیمات با موفقیت ویرایش شد");
  } catch (err) {
    next(err);
  }
};

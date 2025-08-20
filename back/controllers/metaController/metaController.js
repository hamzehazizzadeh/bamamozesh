const Setting = require("../../models/Setting/Setting");

const { resMessage, mongoSelect } = require("../../utils");

exports.handleGetMeta = async (req, res, next) => {
  try {
    let result = {};

    result.setting = await Setting.findOne().select(mongoSelect.setting);

    resMessage(res, 200, `اطلاعات با موفقیت واکشی شد`, result);
  } catch (err) {
    next(err);
  }
};

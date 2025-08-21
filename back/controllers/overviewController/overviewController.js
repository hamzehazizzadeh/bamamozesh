const { resMessage } = require("../../utils");

exports.handleGetOverview = async (req, res, next) => {
  try {
    resMessage(res, 200, `اطلاعات با موفقیت واکشی شد`, {});
  } catch (err) {
    next(err);
  }
};

const { resMessage } = require("../../utils");

exports.handleGetOverviewForAdmin = async (req, res, next) => {
  try {
    resMessage(res, 200, `اطلاعات با موفقیت واکشی شد`, {});
  } catch (err) {
    next(err);
  }
};

exports.handleGetOverviewForStudent = async (req, res, next) => {
  try {
    resMessage(res, 200, `اطلاعات با موفقیت واکشی شد`, {});
  } catch (err) {
    next(err);
  }
};

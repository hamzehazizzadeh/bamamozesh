const { resMessage } = require("../../utils");

exports.handleUploadDocument = async (req, res, next) => {
  try {
    const file = req.file
      ? `/${req.file?.destination}${req.file?.filename}`
      : null;

    resMessage(res, 200, `فایل با موفقیت آپلود شد`, file);
  } catch (err) {
    next(err);
  }
};

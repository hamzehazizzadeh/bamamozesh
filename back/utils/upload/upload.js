const fs = require("fs");
const path = require("path");
const multer = require("multer");

const { convertUploadTypeToFolder, uploadTypeItems } = require("../enum");
const { errorMessage } = require("..");

// ensure upload directory exists
const uploadDirectory = path.resolve(
  path.join(__dirname, "..", "..", "uploads")
);
fs.existsSync(uploadDirectory) || fs.mkdirSync(uploadDirectory);

// ensure sub upload directories exists
for (let i = 0; i < uploadTypeItems.length; i++) {
  const folder = convertUploadTypeToFolder(uploadTypeItems[i]);
  const subDirectory = path.resolve(
    path.join(__dirname, "..", "..", "uploads", folder)
  );
  fs.existsSync(subDirectory) || fs.mkdirSync(subDirectory);
}

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destination = req.query.destination || "";
    cb(null, `uploads/${convertUploadTypeToFolder(destination)}`);
  },
  filename: (req, file, cb) => {
    const filename = `${req.user.id}-${req.user.role}-${Date.now()}-${
      file.originalname
    }`;
    cb(null, filename);
  },
});

const maxSize = 3;

// Create the multer instance with enhanced security options
const upload = multer({
  storage: storage,
  limits: {
    fileSize: maxSize * 1024 * 1024,
    files: 1,
  },
  fileFilter: (req, file, cb) => {
    const allowedFileTypes = /\.(jpg|jpeg|png|gif|docx|xlsx|csv|pdf|mp4|avi)$/;

    if (!file.originalname.match(allowedFileTypes)) {
      return cb(new Error("پسوند فایل مورد نظر مجاز نمی باشد"), false);
    }
    cb(null, true);
  },
});
const multerError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      errorMessage(`حجم فایل نمی تواند بیشتر از ${maxSize} مگابایت باشد`, 422);
    } else if (err.code === "LIMIT_UNEXPECTED_FILE") {
      errorMessage("تعداد فایل‌های مجاز نمی تواند بیشتر از 1 باشد", 422);
    } else {
      errorMessage("خطا در آپلود فایل", 422);
    }
  } else if (err) {
    errorMessage(err.message || "خطا در آپلود فایل", 422);
  }
  next();
};

module.exports = { upload, multerError };

const multer = require('multer');
const path = require('path');
const fs = require("fs");

const companyStorage = multer.diskStorage({
  destination: function (req, file, cb) {
      const uploadDir = path.join(__dirname, "../uploads/company");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
    cb(null, "./uploads/company");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, "logo" + "-" + uniqueSuffix + "." + file.mimetype.split("/")[1]
    );
  }
});

let company = multer({ storage: companyStorage });

module.exports = {
    company
}
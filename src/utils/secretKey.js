const crypto = require("crypto");
exports.secretKey = crypto.randomBytes(32).toString("hex");

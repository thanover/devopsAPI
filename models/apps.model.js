const mongoose = require("mongoose");

const appsSchema = new mongoose.Schema({
  appId: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  appName: {
    type: String,
    required: true,
  },
  appLongName: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("apps", appsSchema);

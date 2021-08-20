const mongoose = require("mongoose");
const Datadogstack = require("../models/datadogstack.model");

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
  datadogStack_id: {
    type: mongoose.Types.ObjectId,
  },
});

appsSchema.pre("save", async function (next) {
  console.log("pre saving an app", this);
  if (!this.datadogStack_id) {
    console.log("No datadogstack found. One will be created....");
    const datadogstack = new Datadogstack({
      app: this._id,
    });
    try {
      const newDatadogstack = await datadogstack.save();
      if (!newDatadogstack) throw Error("unable to create the Datadogstack");
      this.datadogStack_id = newDatadogstack._id;
    } catch (err) {
      next(err);
    }
  }

  next();
});

module.exports = mongoose.model("apps", appsSchema);

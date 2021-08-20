const mongoose = require("mongoose");

const dashboardSchema = new mongoose.Schema({
  data: mongoose.Schema.Types.Mixed,
});

const datadogstackSchema = new mongoose.Schema({
  app: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  stackProps: mongoose.Schema.Types.Mixed,
  resources: {
    dit: {
      monitors: [],
      dashboard: { data: mongoose.Schema.Types.Mixed },
      slos: [],
    },
    sit: {
      monitors: [],
      dashboard: mongoose.Schema.Types.Mixed,
      slos: [],
    },
    sit2: {
      monitors: [],
      dashboard: mongoose.Schema.Types.Mixed,
      slos: [],
    },
    prf: {
      monitors: [],
      dashboard: mongoose.Schema.Types.Mixed,
      slos: [],
    },
    uat: {
      monitors: [],
      dashboard: mongoose.Schema.Types.Mixed,
      slos: [],
    },
    prd: {
      monitors: [],
      dashboard: mongoose.Schema.Types.Mixed,
      slos: [],
    },
  },
  deployments: [
    new mongoose.Schema({
      date: {
        type: Date,
        required: true,
      },
      env: {
        type: String,
        requred: true,
      },
    }),
  ],
});

module.exports = mongoose.model("datadogstack", datadogstackSchema);

const express = require("express");
const router = express.Router();
const Datadogstack = require("../models/datadogstack.model");

//getting all apps
router.get("/", async (req, res) => {
  try {
    const apps = await Datadogstack.find({}, { _id: 1 });
    res.json(apps);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

//getting one app
router.get("/:id", getDatadogstack, (req, res) => {
  res.json(res.datadogstack);
});

//creating an app
router.post("/", async (req, res) => {
  console.log(`recieved request: ${req}`);
  const datadogstack = new Datadogstack({
    appId: req.body.appId,
    stackProps: req.body.stackProps,
  });

  try {
    const newDatadogstack = await datadogstack.save();
    res.status(201).json(newDatadogstack);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//updating an app
router.patch("/:id", getDatadogstack, async (req, res) => {
  if (req.body.appId != null) {
    res.app.appId = req.body.appId;
  }
  if (req.body.productId != null) {
    res.app.productId = req.body.productId;
  }
  if (req.body.appName != null) {
    res.app.appName = req.body.appName;
  }
  res.app.updatedDate = Date.now();

  try {
    const updatedApp = await res.app.save();
    res.json(updatedApp);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//deleting an app
router.delete("/:id", getDatadogstack, async (req, res) => {
  const tempApp = res.app;
  try {
    await res.app.remove();
    res.json({ message: `Deleted App ${tempApp.appId}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getDatadogstack(req, res, next) {
  let datadogstack = undefined;
  try {
    datadogstack = await Datadogstack.findById(req.params.id);

    if (datadogstack === null) {
      return res
        .status(404)
        .json({ message: `Cannot find datadogstack with id ${req.params.id}` });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.datadogstack = datadogstack;
  next();
}

async function getDatadogstackByAppId(req, res, next) {
  let datadogstack = undefined;
  try {
    datadogstack = await App.find({ $text: { $search: req.params.appId } });
    console.log(datadogstack);

    if (datadogstack === null) {
      return res.status(404).json({
        message: `Cannot find datadogstack with appId: ${req.params.appId}`,
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.datadogstack = datadogstack;
  // next();
}

module.exports = router;

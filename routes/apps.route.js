const express = require("express");
const router = express.Router();
const App = require("../models/apps.model");

//getting all apps
router.get("/", async (req, res) => {
  try {
    const apps = await App.find({}, { appLongName: 1 });
    res.json(apps);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

//getting one app
router.get("/:id", getApp, (req, res) => {
  res.json(res.app);
});

router.get("/appSearch/:string", getAppByLongName, (req, res) => {
  res.json(res.app);
});

//creating an app
router.post("/", async (req, res) => {
  const app = new App({
    appId: req.body.appId,
    productId: req.body.productId,
    appName: req.body.appName,
    appLongName: `${req.body.productId.toUpperCase()} - ${req.body.appId.toUpperCase()} - ${
      req.body.appName
    }`,
  });

  try {
    const newApp = await app.save();
    res.status(201).json(newApp);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//updating an app
router.patch("/:id", getApp, async (req, res) => {
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
router.delete("/:id", getApp, async (req, res) => {
  const tempApp = res.app;
  try {
    await res.app.remove();
    res.json({ message: `Deleted App ${tempApp.appId}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getApp(req, res, next) {
  let app = undefined;
  try {
    app = await App.findById(req.params.id);

    if (app === null) {
      return res
        .status(404)
        .json({ message: `Cannot find app with id ${req.params.id}` });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.app = app;
  next();
}

async function getAppByLongName(req, res, next) {
  let app = undefined;
  try {
    app = await App.find({ $text: { $search: req.params.string } });
    console.log(app);

    if (app === null) {
      return res
        .status(404)
        .json({ message: `Cannot find app with id ${req.params.id}` });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.app = app;
  // next();
}

module.exports = router;

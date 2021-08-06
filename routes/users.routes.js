const express = require("express");
const router = express.Router();
const User = require("../models/users.model");

//getting all apps
router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

//getting one app
router.get("/:id", getUser, (req, res) => {
  res.json(res.user);
});

//creating an app
router.post("/", async (req, res) => {
  const user = new User({
    name: req.body.name,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//updating an app
router.patch("/:id", getUser, async (req, res) => {
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
router.delete("/:id", getUser, async (req, res) => {
  const tempApp = res.app;
  try {
    await res.app.remove();
    res.json({ message: `Deleted App ${tempApp.appId}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getUser(req, res, next) {
  let user = undefined;
  try {
    user = await User.findById(req.params.id);

    if (user === null) {
      return res
        .status(404)
        .json({ message: `Cannot find user with id ${req.params.id}` });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.user = user;
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

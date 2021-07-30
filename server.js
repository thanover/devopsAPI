require("dotenv").config();
const express = require("express");
const app = express();

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => {
  console.log(error);
});
db.once("open", () => console.log("Connected to the Database"));

app.use(express.json());

const appsRouter = require("./routes/apps.route");
app.use("/apps", appsRouter);

app.listen(3000, () => console.log("Server Started"));

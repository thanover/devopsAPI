require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

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
app.use(cors());

const appsRouter = require("./routes/apps.routes");
app.use("/apps", appsRouter);

const usersRouter = require("./routes/users.routes");
app.use("/users", usersRouter);

app.use("/", (req, res) => {
  res.send(`hello`);
});

app.listen(3001, () => console.log("Server Started"));

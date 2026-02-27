require("dotenv").config();
const cors = require("cors");
const express = require("express");
const User = require("./users/model");
const Sport = require("./sports/model");
const userRouter = require("./users/routes");
const sportRouter = require("./sports/routes");
const commonRouter = require("./common/routes");

const app = express();
app.use(
  cors({
    origin: "*", // na testy – później ograniczysz
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  }),
);

const port = process.env.PORT || 5001;

app.use(express.json());

app.use(userRouter);
app.use(sportRouter);
app.use(commonRouter);

// =====================================================

const SyncTables = () => {
  User.sync();
  Sport.sync();
};

app.listen(port, () => {
  SyncTables();
  console.log(`Server is listening on ${port}`);
});

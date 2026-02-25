require("dotenv").config();
const cors = require("cors");
const express = require("express");

const User = require("./users/model");
const userRouter = require("./users/routes");

const app = express();

const port = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());

app.use(userRouter);

// =====================================================

const SyncTables = () => {
  User.sync();
};

app.listen(port, () => {
  SyncTables();
  console.log(`Server is listening on ${port}`);
});

require("dotenv").config();
const cors = require("cors");
const express = require("express");
const User = require("./users/model");
const Sport = require("./sports/model");
const userRouter = require("./users/routes");
const sportRouter = require("./sports/routes");
const commonRouter = require("./common/routes");

const app = express();
// ── CORS – wersja oficjalnie polecana przez Vercel ────────────────────────
app.use(
  cors({
    origin: "*", // ← na testy pozwól na wszystko (localhost + frontend Vercel)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }),
);

// Ręczna obsługa OPTIONS (czasami Vercel tego wymaga dodatkowo)
app.options("*", cors());

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

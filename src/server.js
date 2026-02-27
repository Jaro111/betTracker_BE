require("dotenv").config();
const cors = require("cors");
const express = require("express");
const User = require("./users/model");
const Sport = require("./sports/model");
const userRouter = require("./users/routes");
const sportRouter = require("./sports/routes");
const commonRouter = require("./common/routes");
const port = process.env.PORT || 5001;

const app = express();
// Poprawna konfiguracja CORS – działa na Railway/Vercel

const allowedOrigins = [
  "http://localhost:5173",
  "https://twoja-domena-vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

app.options("*", cors());

// Middleware do JSON
app.use(express.json());

// Trasy
app.use(userRouter);
app.use(sportRouter);
app.use(commonRouter);

// Sync tabel – tylko lokalnie lub raz przy starcie (nie w produkcji!)
const SyncTables = () => {
  User.sync();
  Sport.sync();
};

app.listen(port, () => {
  // resetTables();
  SyncTables();
  console.log(`Server listen on ${port}`);
});
// Testowy endpoint do sprawdzenia
app.get("/data", (req, res) => {
  res.json({ message: "Backend na Vercel DZIAŁA! CORS OK" });
});

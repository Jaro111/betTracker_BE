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

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
// Ręczna obsługa preflight (Railway lubi to mieć dodatkowo)

app.use((req, res, next) => {
  console.log("Ręczny middleware CORS – request:", req.method, req.url);
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS, PATCH",
  );
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    console.log("Preflight OPTIONS – wysyłanie 204");
    return res.sendStatus(204);
  }
  next();
});

// Middleware do JSON
app.use(express.json());

// Trasy
app.use(userRouter);
app.use(sportRouter);
app.use(commonRouter);

// Testowy endpoint do sprawdzenia
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend na Vercel DZIAŁA! CORS OK" });
});

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
app.get("/api/public-test", (req, res) => {
  console.log("Public test request przyszedł");
  res.json({ message: "CORS działa – public endpoint OK" });
});

require("dotenv").config();
const cors = require("cors");
const express = require("express");
const User = require("./users/model");
const Sport = require("./sports/model");
const userRouter = require("./users/routes");
const sportRouter = require("./sports/routes");
const commonRouter = require("./common/routes");

const app = express();

// ── CORS – włącz jako pierwsze, konfiguracja oficjalna Vercel ────────────────
const cors = require("cors");

// Poprawna konfiguracja CORS – działa na Railway/Vercel
app.use(
  cors({
    origin: "*", // testowo wszystko – potem ograniczysz do domeny frontendu
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }),
);

// Ręczna obsługa OPTIONS – jeśli middleware cors nie wystarcza
app.options("*", (req, res) => {
  res.sendStatus(204);
});

// Ręczna obsługa OPTIONS (Railway lubi to mieć)
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS, PATCH",
  );
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(204);
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

if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 5001;
  app.listen(port, () => {
    SyncTables();
    console.log(`Lokalnie: http://localhost:${port}`);
  });
}

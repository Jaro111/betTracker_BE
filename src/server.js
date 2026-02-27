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
console.log("START: Backend wystartował – CORS włączony jako pierwsze");
app.use(
  cors({
    origin: "*", // na testy – potem zamień na konkretną domenę frontendu
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 204,
  }),
);

// Ręczna obsługa preflight (Railway lubi to mieć dodatkowo)
console.log("CORS middleware załadowany – nagłówki powinny być wysyłane");
// Middleware do JSON
app.use(express.json());

// Trasy
app.use(userRouter);
app.use(sportRouter);
app.use(commonRouter);
console.log(
  "User router załadowany – jeśli tu dojdzie, to authCheck powinien mieć CORS",
);

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

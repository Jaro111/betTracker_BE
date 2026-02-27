require("dotenv").config();
const cors = require("cors");
const express = require("express");
const User = require("./users/model");
const Sport = require("./sports/model");
const userRouter = require("./users/routes");
const sportRouter = require("./sports/routes");
const commonRouter = require("./common/routes");

const app = express();
// Poprawna konfiguracja CORS – działa na Railway/Vercel
app.use(cors());

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

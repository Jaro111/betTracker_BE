// require("dotenv").config();
// const cors = require("cors");
// const express = require("express");
// const User = require("./users/model");
// const Sport = require("./sports/model");
// const userRouter = require("./users/routes");
// const sportRouter = require("./sports/routes");
// const commonRouter = require("./common/routes");
// const PORT = Number(process.env.PORT) || 8080;

// const app = express();
// // Poprawna konfiguracja CORS – działa na Railway/Vercel

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   }),
// );

// // Middleware do JSON
// app.use(express.json());

// // Trasy
// app.use(userRouter);
// app.use(sportRouter);
// app.use(commonRouter);

// // Sync tabel – tylko lokalnie lub raz przy starcie (nie w produkcji!)
// const SyncTables = () => {
//   User.sync();
//   Sport.sync();
// };
// // Testowy endpoint do sprawdzenia
// app.get("/data", (req, res) => {
//   res.json({ message: "Backend na Vercel DZIAŁA! CORS OK" });
// });

// app.listen(PORT, "0.0.0.0", () => {
//   console.log(`Server running on port ${PORT}`);
// });

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = Number(process.env.PORT) || 5000;

// Middleware
app.use(
  cors({
    origin: true, // pozwala na każdy frontend, możesz zmienić na konkretny URL
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());

// Testowy endpoint
app.get("/data", (req, res) => {
  res.json({ message: "Backend na Railway DZIAŁA! ✅" });
});

// Start server – zawsze ostatnie
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

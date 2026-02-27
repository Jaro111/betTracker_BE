require("dotenv").config();
const cors = require("cors");
const express = require("express");
const User = require("./users/model");
const Sport = require("./sports/model");
const userRouter = require("./users/routes");
const sportRouter = require("./sports/routes");
const commonRouter = require("./common/routes");

const app = express();

const port = process.env.PORT || 5001;

app.use(express.json());
app.use(
  cors({
    origin: function (origin, callback) {
      // Lista dozwolonych originów – dodawaj nowe w miarę potrzeby
      const allowedOrigins = [
        "http://localhost:5173", // Vite lokalnie
        "http://localhost:3000", // ewentualnie CRA
        "https://bet-tracker-be.vercel.app", // Twój frontend na Vercel (zmień nazwę)
        "*", // NA TESTY – potem usuń!
      ];

      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        allowedOrigins.includes("*")
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true, // jeśli używasz ciasteczek / auth
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }),
);

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

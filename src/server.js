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
    origin: [
      "http://localhost:5173", // Vite lokalnie (Twój frontend)
      "http://localhost:3000", // ewentualnie Create React App
      "*", // NA TESTY – pozwala na wszystko (usuń później!)
      // po wdrożeniu frontendu dodaj: 'https://twoja-frontend.vercel.app'
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // jeśli używasz tokenów/ciasteczek
    preflightContinue: false,
    optionsSuccessStatus: 204,
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

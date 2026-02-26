const { Router } = require("express");
const sportRouter = Router();

const { addSport, getSports } = require("./controllers.js");

const { tokenCheck } = require("../middleware/auth.js");

sportRouter.post("/sport/addSport", addSport);

sportRouter.get("/sport/getSports", tokenCheck, getSports);

module.exports = sportRouter;

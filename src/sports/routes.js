const { Router } = require("express");
const sportRouter = Router();

const { addSport } = require("./controllers.js");
const Sport = require("./model.js");

sportRouter.post("/sport/addSport", addSport);

module.exports = sportRouter;

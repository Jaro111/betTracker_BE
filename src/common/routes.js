const { Router } = require("express");

const commonRouter = Router();

const { getOdds } = require("./functions");

commonRouter.post("/fetchOdds", getOdds);

module.exports = commonRouter;

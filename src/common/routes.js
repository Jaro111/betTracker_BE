const { Router } = require("express");

const commonRouter = Router();

const { getOdds } = require("./functions");
const { creditCheckFunc } = require("./creditCheckFunc");

commonRouter.post("/fetchOdds", getOdds);
commonRouter.get("/creditCheck", creditCheckFunc);

module.exports = commonRouter;

const { Router } = require("express");

const userRouter = Router();

const { hashPass, comparePass, tokenCheck } = require("../middleware/auth");

const { signupuUser, getUsers, login } = require("./controllers");

// signUp
userRouter.post("/users/signUp", hashPass, signupuUser);

// comparePass
userRouter.post("/users/logIn", comparePass, login);

// // addUsers
// userRouter.post("/users/signUp", signupuUser);

// // getUsers
// userRouter.get("/users/getUsers", tokenCheck, getUsers);

// token check
userRouter.get("/users/authCheck", tokenCheck, login);

module.exports = userRouter;

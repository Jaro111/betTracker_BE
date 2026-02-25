const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../users/model");

const saltRounds = parseInt(process.env.SALT_ROUNDS);

const hashPass = async (req, res, next) => {
  try {
    //
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    // hashed password
    //
    req.body.password = hashedPassword;
    // swap the value 'helloworls in req.body.password to the value of hashedPassword
    next();
  } catch (error) {
    res.status(501).json({ message: error.message, error: error });
  }
};

const comparePass = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    const myPassword = user.dataValues.password;

    const checkPassword = await bcrypt.compare(req.body.password, myPassword);

    if (!checkPassword) {
      res.status(401).json({ message: "Wrong password" });
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(501).json({ message: error.message, error: error });
  }
};

const tokenCheck = async (req, res, next) => {
  try {
    // 1. Check req headers- does authorization exist

    if (!req.header("Authorization")) {
      throw new Error("No token pass");
    }
    // 2. get jwt from headers

    const token = req.header("Authorization").replace("Bearer ", "");

    // In Authorization there is a space after the bearer
    // 3.decode token using secret

    const decodedToken = await jwt.verify(token, process.env.SECRET);
    // // 4.get user using id
    const user = await User.findOne({ where: { id: decodedToken.id } });

    // // 5. id !user send 401 res

    if (!user) {
      res.status(401).json({ message: "not authorized" });
      return;
    }
    // // 6.pass user data to login func
    req.authCheck = user;

    next();
  } catch (error) {
    res.status(501).json({ message: error.message, error: error });
  }
};

module.exports = {
  hashPass: hashPass,
  comparePass: comparePass,
  tokenCheck: tokenCheck,
};

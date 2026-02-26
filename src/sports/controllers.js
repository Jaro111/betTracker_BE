const Sport = require("./model");

// ------------------------- ADD BOOK -------------------------
const addSport = async (req, res) => {
  try {
    const sport = await Sport.create({
      country: req.body.country,
      sport: req.body.sport,
      name: req.body.name,
      key: req.body.key,
    });
    res.status(201).json({ message: `${sport.name} was added`, sport: sport });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

// getUsers
const getSports = async (req, res) => {
  try {
    if (!req.authCheck) {
      res.status(401).json({ message: "Sorry You are not authorized" });
      return;
    }
    const sports = await Sport.findAll();
    res.status(200).json({ message: `Sports uploaded`, sports: sports });
    req.user = users;
    //
  } catch (error) {
    res.status(501).json({ message: error.message, error: error });
  }
};

module.exports = {
  addSport: addSport,
  getSports: getSports,
};

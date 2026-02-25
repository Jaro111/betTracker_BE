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

module.exports = {
  addSport: addSport,
};

const API_KEY = process.env.ODDS_API_KEY;

const creditCheckFunc = async (req, res) => {
  try {
    const url = `https://api.the-odds-api.com/v4/sports?apiKey=${API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
      // analogicznie jak wyżej
      if (response.status === 401) throw new Error("Nieprawidłowy klucz API");
      if (response.status === 429) throw new Error("Quota wyczerpana");
      throw new Error(`HTTP ${response.status}`);
    }
    const credits = Object.fromEntries(response.headers.entries());

    res.status(201).json({
      message: `user created`,
      credits: credits,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

module.exports = { creditCheckFunc: creditCheckFunc };

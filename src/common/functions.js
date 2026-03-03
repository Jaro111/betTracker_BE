const API_KEY = process.env.ODDS_API_KEY;
// const SPORT = "basketball_nba";
// const REGIONS = "uk";
// const MARKETS = "h2h,h2h_lay";

const fetchOdds = async (SPORT, REGIONS, MARKETS) => {
  const now = new Date();
  const fromDate = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      0,
      0,
      0,
    ),
  );
  const from = fromDate.toISOString().replace(/\.\d{3}Z$/, "Z");

  const toDate = new Date(fromDate);
  toDate.setUTCDate(toDate.getUTCDate() + 21);
  const to = toDate.toISOString().replace(/\.\d{3}Z$/, "Z");

  const params = new URLSearchParams({
    apiKey: API_KEY,
    regions: REGIONS,
    markets: MARKETS,
    oddsFormat: "decimal",
    dateFormat: "iso",
    commenceTimeFrom: from,
    commenceTimeTo: to,
  });

  const url = `https://api.the-odds-api.com/v4/sports/${SPORT}/odds?${params}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Błąd ${response.status}`);
  }

  return response.json();
};

const flattenAndSortOpportunities = (events) => {
  const flatRows = [];

  events.forEach((event) => {
    const matchName = `${event.home_team} v ${event.away_team}`;
    const dateTime = event.commence_time.slice(0, 16).replace("T", " ");

    // Zbieramy lay z giełd
    const exchanges = [];

    // Betfair
    const betfair = event.bookmakers?.find((b) => b.key === "betfair_ex_uk");
    if (betfair) {
      const layM = betfair.markets?.find((m) => m.key === "h2h_lay");
      if (layM) {
        const map = {};
        layM.outcomes.forEach((o) => {
          if (o.price) map[o.name] = o.price;
        });
        if (Object.keys(map).length > 0) {
          exchanges.push({ name: "Betfair", layMap: map });
        }
      }
    }

    // Smarkets
    const smarkets = event.bookmakers?.find((b) => b.key === "smarkets");
    if (smarkets) {
      const layM = smarkets.markets?.find((m) => m.key === "h2h_lay");
      if (layM) {
        const map = {};
        layM.outcomes.forEach((o) => {
          if (o.price) map[o.name] = o.price;
        });
        if (Object.keys(map).length > 0) {
          exchanges.push({ name: "Smarkets", layMap: map });
        }
      }
    }

    if (exchanges.length === 0) return;

    // Dla każdego bukmachera i outcome tworzymy osobne wiersze
    event.bookmakers.forEach((book) => {
      if (book.key === "betfair_ex_uk" || book.key === "smarkets") return;

      const h2h = book.markets?.find((m) => m.key === "h2h");
      if (!h2h) return;

      h2h.outcomes.forEach((outcome) => {
        const bet = outcome.name;
        const back = outcome.price;

        exchanges.forEach((ex) => {
          const lay = ex.layMap[bet];
          if (typeof lay !== "number") return;

          const spread = back - lay;

          flatRows.push({
            match: matchName,
            dateTime: dateTime,
            bet: bet,
            bookmaker: book.title || book.key,
            back: Number(back.toFixed(2)),
            lay: Number(lay.toFixed(2)),
            spread: Number(spread.toFixed(3)),
            exchange: ex.name,
          });
        });
      });
    });
  });

  // Sortujemy całą tablicę po spreadzie malejąco (od największego dodatniego do ujemnych)
  flatRows.sort((a, b) => b.spread - a.spread);

  return flatRows;
};

const getOdds = async (req, res) => {
  try {
    const events = await fetchOdds(
      req.body.sport,
      req.body.regions,
      req.body.markets,
    );
    const flatOpportunities = flattenAndSortOpportunities(events);

    const excluded = new Set(["Betfair", "Smarkets"]); // ← tu wpisz co chcesz pominąć

    const uniqueBookmakers = Array.from(
      new Set(flatOpportunities.map((item) => item.bookmaker)),
      (bk) => (!excluded.has(bk) ? bk : undefined),
    ).filter(Boolean);

    // const fs = require("fs");
    // fs.writeFileSync(
    //   "flat_okazje.json",
    //   JSON.stringify(
    //     { flatOpportunities: flatOpportunities, bookmakers: uniqueBookmakers },
    //     null,
    //     2,
    //   ),
    //   "utf8",
    // );

    res.status(201).json({
      message: `Uploaded`,
      flatOpportunities: flatOpportunities,
      uniqueBookmakers: uniqueBookmakers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

module.exports = {
  getOdds: getOdds,
};

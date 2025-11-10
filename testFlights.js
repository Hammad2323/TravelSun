import fetch from "node-fetch";

const from = "LHR";     // London Heathrow
const to = "DXB";       // Dubai
const date = "2025-11-05";

const url = `https://flights-scraper-real-time.p.rapidapi.com/flights/search-return?originSkyId=${from}&destinationSkyId=${to}&departureDate=${date}&adults=1&currency=GBP`;

const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "a2a4be4152msh93fc6261af0e85cp1c7240jsn14980e80088d",  // replace with your real key
    "x-rapidapi-host": "flights-scraper-real-time.p.rapidapi.com",
  },
};

fetch(url, options)
  .then((res) => res.json())
  .then((data) => console.log(JSON.stringify(data, null, 2)))
  .catch((err) => console.error("❌ Error:", err));

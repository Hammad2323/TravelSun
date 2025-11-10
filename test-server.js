import express from "express";
import dotenv from "dotenv";
import { handler as getFlights } from "./netlify/functions/getFlights.js";

dotenv.config();
const app = express();

app.get("/getFlights", async (req, res) => {
  const event = { queryStringParameters: req.query };
  try {
    const result = await getFlights(event);
    res.status(result.statusCode).set(result.headers).send(result.body);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

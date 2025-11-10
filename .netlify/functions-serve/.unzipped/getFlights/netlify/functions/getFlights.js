var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var getFlights_exports = {};
__export(getFlights_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(getFlights_exports);
var import_node_fetch = __toESM(require("node-fetch"), 1);
const handler = async (event) => {
  try {
    const { from, to, date } = event.queryStringParameters;
    if (!from || !to || !date) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing parameters: from, to, or date" })
      };
    }
    const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || "a2a4be4152msh93fc6261af0e85cp1c7240jsn14980e80088d";
    const url = `https://flights-scraper-real-time.p.rapidapi.com/flights/search-return?originSkyId=${from}&destinationSkyId=${to}&departureDate=${date}&adults=1&currency=USD`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": RAPIDAPI_KEY,
        "x-rapidapi-host": "flights-scraper-real-time.p.rapidapi.com"
      }
    };
    console.log("Fetching flights:", url);
    const response = await (0, import_node_fetch.default)(url, options);
    if (!response.ok) {
      const errText = await response.text();
      console.error("API error:", errText);
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: "Failed to fetch flights", details: errText })
      };
    }
    const result = await response.json();
    console.log("\u2705 Flights API Response Received");
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(result)
    };
  } catch (error) {
    console.error("\u274C Error fetching flights:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});

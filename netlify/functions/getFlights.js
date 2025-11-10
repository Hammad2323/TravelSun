import fetch from "node-fetch";

export const handler = async (event) => {
  try {
    const { from, to, date } = event.queryStringParameters;

    if (!from || !to || !date) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required parameters" }),
      };
    }

    const clientId = process.env.AMADEUS_API_KEY;
    const clientSecret = process.env.AMADEUS_API_SECRET;

    if (!clientId || !clientSecret) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Missing Amadeus credentials" }),
      };
    }

    const tokenRes = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
      }),
    });

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      throw new Error("Failed to get Amadeus access token");
    }

    const url = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${from}&destinationLocationCode=${to}&departureDate=${date}&adults=1&currencyCode=GBP&max=10`;

    const flightRes = await fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const data = await flightRes.json();

    if (!data || !data.data) {
      throw new Error("No flight data received");
    }

    const airlineNames = {
      EY: "Etihad Airways",
      EK: "Emirates",
      QR: "Qatar Airways",
      PK: "Pakistan International Airlines",
      TK: "Turkish Airlines",
      BA: "British Airways",
      SV: "Saudia",
      GF: "Gulf Air",
      LH: "Lufthansa",
      KL: "KLM Royal Dutch Airlines",
      AI: "Air India",
      SQ: "Singapore Airlines",
      CX: "Cathay Pacific",
      VS: "Virgin Atlantic",
      WY: "Oman Air",
      KU: "Kuwait Airways",
      UX: "Air Europa",
    };

    const formatTime = (iso) => {
      if (!iso) return "--:--";
      const d = new Date(iso);
      if (isNaN(d.getTime())) return "--:--";
      return d.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    };

    const flights = data.data.map((offer) => {
      const itinerary = offer.itineraries?.[0];
      const segments = itinerary?.segments || [];
      const firstSeg = segments[0];
      const lastSeg = segments[segments.length - 1];

      const airlineCode = firstSeg?.carrierCode || "??";
      const airline = `${airlineNames[airlineCode] || "Unknown Airline"} (${airlineCode})`;

      const departureTime = formatTime(firstSeg?.departure?.at);
      const arrivalTime = formatTime(lastSeg?.arrival?.at);

      return {
        airline,
        from: firstSeg?.departure?.iataCode || from,
        to: lastSeg?.arrival?.iataCode || to,
        departureTime,
        arrivalTime,
        duration: itinerary?.duration?.replace("PT", "").toLowerCase() || "N/A",
        stops: segments.length > 1 ? `${segments.length - 1} stop(s)` : "Direct",
        price: `£${offer?.price?.grandTotal || "N/A"}`,
      };
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, count: flights.length, flights }),
    };
  } catch (error) {
    console.error("❌ getFlights function error:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error", details: error.message }),
    };
  }
};

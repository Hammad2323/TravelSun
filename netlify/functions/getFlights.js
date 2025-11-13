import fetch from "node-fetch";

export const handler = async (event) => {
  try {
    const { from, to, date, returnDate } = event.queryStringParameters;

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

    const tokenRes = await fetch(
      "https://test.api.amadeus.com/v1/security/oauth2/token",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "client_credentials",
          client_id: clientId,
          client_secret: clientSecret,
        }),
      }
    );

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      throw new Error("Failed to get Amadeus access token");
    }

    let url = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${from}&destinationLocationCode=${to}&departureDate=${date}&adults=1&currencyCode=GBP&max=10`;

    if (returnDate) {
      url += `&returnDate=${returnDate}`;
    }

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
      const outbound = offer.itineraries?.[0];
      const inbound = offer.itineraries?.[1];

      
      const segments = outbound?.segments || [];
      const firstSeg = segments[0];
      const lastSeg = segments[segments.length - 1];

      const departureTime = formatTime(firstSeg?.departure?.at);
      const arrivalTime = formatTime(lastSeg?.arrival?.at);

      const stops = segments.length > 1 ? `${segments.length - 1} stop(s)` : "Direct";

      
      const allOutboundCodes = [...new Set(segments.map((seg) => seg.carrierCode))];
      const airline = allOutboundCodes
        .map((code) => `${airlineNames[code] || "Unknown Airline"} (${code})`)
        .join(" + ");

  
      let returnDepartureTime, returnArrivalTime, returnDuration, returnStops, returnAirline;
      if (inbound) {
        const inboundSegments = inbound.segments;
        const inboundFirst = inboundSegments[0];
        const inboundLast = inboundSegments[inboundSegments.length - 1];

        returnDepartureTime = formatTime(inboundFirst?.departure?.at);
        returnArrivalTime = formatTime(inboundLast?.arrival?.at);
        returnDuration = inbound.duration?.replace("PT", "").toLowerCase();
        returnStops =
          inboundSegments.length > 1 ? `${inboundSegments.length - 1} stop(s)` : "Direct";

        const returnCodes = [...new Set(inboundSegments.map((seg) => seg.carrierCode))];
        returnAirline = returnCodes
          .map((code) => `${airlineNames[code] || "Unknown Airline"} (${code})`)
          .join(" + ");
      }

      return {
        airline,
        from: firstSeg?.departure?.iataCode || from,
        to: lastSeg?.arrival?.iataCode || to,
        departureTime,
        arrivalTime,
        duration: outbound?.duration?.replace("PT", "").toLowerCase() || "N/A",
        stops,
        price: `£${offer?.price?.grandTotal || "N/A"}`,
        returnDepartureTime,
        returnArrivalTime,
        returnDuration,
        returnStops,
        returnAirline, 
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

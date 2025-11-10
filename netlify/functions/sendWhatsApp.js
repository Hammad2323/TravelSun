export async function handler(event) {
  const body = JSON.parse(event.body);

  const response = await fetch(
    `https://graph.facebook.com/v17.0/${process.env.PHONE_NUMBER_ID}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: process.env.ADMIN_PHONE,
        type: "text",
        text: { body: `New flight booking received:\n${body.details}` },
      }),
    }
  );

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true }),
  };
}

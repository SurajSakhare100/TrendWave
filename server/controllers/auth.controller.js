const client_id=process.env.GOOGLE_CLIENT_ID;
const client_secret=process.env.GOOGLE_CLIENT_SECRET;
const redirect_uri=process.env.REDIRECT_URI;
export const googleLogin = async () => {
  const { code } = req.body;

  try {
    // Exchange the authorization code for an access token
    const response = await axios.post("https://oauth2.googleapis.com/token", {
      code,
      client_id,
      client_secret,
      redirect_uri,
      grant_type: "authorization_code",
    });

    // Send the response back to the frontend
    res.json(response.data);
  } catch (error) {
    console.error("Error exchanging authorization code:", error);
    res.status(500).json({ error: "Failed to exchange authorization code" });
  }
};

const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 80;

app.use(express.json());

app.post("/submit", async (req, res) => {
  const { Name, Email, VerificationCode } = req.body;

  if (!Name || !Email || !VerificationCode) {
    return res
      .status(400)
      .json({ error: "Name, Email, and VerificationCode are required." });
  }

  try {
    const response = await axios.post(
      "https://stock-verify.squareweb.app/verify",
      {
        name: Name,
        email: Email,
        VerificationCode: VerificationCode,
      }
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error posting to external API:", error.message);
    res.status(500).json({ error: "Failed to verify the stock." });
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

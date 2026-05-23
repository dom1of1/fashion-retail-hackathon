const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Allow large base64 image payloads

const REPLICATE_API_URL = 'https://api.replicate.com/v1/predictions';
const POLL_INTERVAL = 1000;
const MAX_POLLS = 300; // 5 minutes max (to account for cold starts)

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

app.post('/api/try-on', async (req, res) => {
  const { userImage, clothImage, category } = req.body;
  const token = process.env.VITE_REPLICATE_API_TOKEN;

  if (!token || token === 'your_token_here') {
    return res.status(500).json({ error: 'Replicate API token not configured in .env file.' });
  }

  if (!userImage || !clothImage) {
    return res.status(400).json({ error: 'Missing userImage or clothImage.' });
  }

  const headers = {
    Authorization: `Token ${token}`,
    'Content-Type': 'application/json',
  };

  try {
    // 1. Start Prediction
    const response = await axios.post(
      REPLICATE_API_URL,
      {
        version: '0513734a452173b8173e907e3a59d19a36266e55b48528559432bd21c7d7e985', // IDM-VTON
        input: {
          human_img: userImage,
          garm_img: clothImage,
          garment_des: 'clothing item',
          category: category || 'upper_body',
          crop: true,
        },
      },
      { headers }
    );

    const predictionId = response.data.id;
    console.log(`[Replicate] Started prediction: ${predictionId}`);

    // 2. Poll for Result
    for (let i = 0; i < MAX_POLLS; i++) {
      await sleep(POLL_INTERVAL);

      let poll;
      try {
        poll = await axios.get(`${REPLICATE_API_URL}/${predictionId}`, { headers });
      } catch (err) {
        console.error(`[Replicate] Polling error: ${err.message}`);
        continue;
      }

      const { status, output, error } = poll.data;

      // Log progress every 10 seconds to avoid spamming the console
      if (i % 10 === 0) {
        console.log(`[Replicate] Prediction ${predictionId} status: ${status} (${i}s elapsed)`);
      }

      if (status === 'succeeded') {
        const resultUrl = Array.isArray(output) ? output[0] : output;
        console.log(`[Replicate] Prediction succeeded: ${predictionId}`);
        return res.json({ resultUrl });
      }

      if (status === 'failed') {
        console.error(`[Replicate] Prediction failed: ${error}`);
        return res.status(500).json({ error: error || 'Try-on failed.' });
      }
      
      // Still processing, loop again
    }

    return res.status(504).json({ error: 'Try-on timed out. Please try again.' });

  } catch (err) {
    console.error('[Replicate] Initial request failed:', err.response?.data || err.message);
    const errorMessage = err.response?.data?.detail || 'Failed to communicate with Replicate API.';
    return res.status(err.response?.status || 500).json({ error: errorMessage });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});

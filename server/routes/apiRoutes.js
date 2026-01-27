// server/routes/apiRoutes.js
const express = require('express');
const router = express.Router();
const OpenAI = require('openai'); // Use the standard OpenAI library
const Flow = require('../models/Flow');

// Initialize OpenAI but point it to OpenRouter
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:5173", // Helps OpenRouter identify your app
    "X-Title": "My React Flow App",
  }
});

// --- POST /api/run-flow ---
router.post('/run-flow', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "upstage/solar-pro-3:free", // The free model you requested
      messages: [
        { role: "user", content: prompt }
      ],
    });

    // Extract the answer
    const aiResponse = completion.choices[0].message.content;

    res.json({ result: aiResponse });

  } catch (error) {
    console.error("AI API Error:", error);
    // Return the actual error message for easier debugging
    res.status(500).json({ error: error.message || "Failed to fetch AI response" });
  }
});

// --- POST /api/save-flow ---
router.post('/save-flow', async (req, res) => {
  const { prompt, result } = req.body;

  if (!prompt || !result) {
    return res.status(400).json({ error: "Prompt and Result are required" });
  }

  try {
    const flow = await Flow.create({
      prompt,
      result,
    });
    
    res.status(201).json({ 
      success: true, 
      id: flow._id,
      message: "Saved successfully" 
    });
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ error: "Failed to save to database" });
  }
});

module.exports = router;
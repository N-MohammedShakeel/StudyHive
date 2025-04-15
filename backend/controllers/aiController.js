// backend/controllers/aiController.js
const axios = require("axios");

const AI_API_URL = "http://localhost:1234/v1"; // LM Studio local server
const MODEL_NAME = "meta-llama/Llama-2-7b-chat-hf"; // LLaMA 2 model

const summarizeContent = async (req, res) => {
  const { content } = req.body;
  try {
    const response = await axios.post(`${AI_API_URL}/completions`, {
      model: MODEL_NAME,
      prompt: `Summarize the following content:\n\n${content}\n\nSummary:`,
      max_tokens: 2000,
      temperature: 0.7,
      stop: ["\n\n", "<|endoftext|>"], // Prevents gibberish output
    });
    const text = response.data.choices[0].text.trim();
    res.json({ summary: text });
  } catch (error) {
    console.error(
      "Summarize Content Error:",
      error.response ? error.response.data : error.message
    );
    res
      .status(500)
      .json({ message: "Error generating summary", error: error.message });
  }
};

const generateStudyPlan = async (req, res) => {
  const { interests, duration } = req.body;
  try {
    const prompt = `Generate a personalized study plan for a student interested in ${interests.join(
      ", "
    )} over ${duration} days. Provide a daily schedule with topics and brief descriptions.\n\nStudy Plan:`;
    const response = await axios.post(`${AI_API_URL}/completions`, {
      model: MODEL_NAME,
      prompt,
      max_tokens: 5000,
      temperature: 0.7,
      stop: ["\n\n", "<|endoftext|>"],
    });
    const text = response.data.choices[0].text.trim();
    res.json({ plan: text });
  } catch (error) {
    console.error(
      "Generate Study Plan Error:",
      error.response ? error.response.data : error.message
    );
    res
      .status(500)
      .json({ message: "Error generating study plan", error: error.message });
  }
};

const explainTopic = async (req, res) => {
  const { topic } = req.body;
  try {
    const response = await axios.post(`${AI_API_URL}/completions`, {
      model: MODEL_NAME,
      prompt: `Explain the topic "${topic}" in simple terms, suitable for a student.\n\nExplanation:`,
      max_tokens: 3000,
      temperature: 0.7,
      stop: ["\n\n", "<|endoftext|>"],
    });
    const text = response.data.choices[0].text.trim();
    res.json({ explanation: text });
  } catch (error) {
    console.error(
      "Explain Topic Error:",
      error.response ? error.response.data : error.message
    );
    res
      .status(500)
      .json({ message: "Error explaining topic", error: error.message });
  }
};

module.exports = { summarizeContent, generateStudyPlan, explainTopic };

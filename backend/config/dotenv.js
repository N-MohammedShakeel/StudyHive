// backend/config/dotenv.js
require("dotenv").config();

const requiredEnv = [
  "MONGO_URI",
  "FRONTEND_URL",
  "JWT_SECRET",
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
];
requiredEnv.forEach((varName) => {
  if (!process.env[varName]) {
    throw new Error(`Environment variable ${varName} is missing`);
  }
});

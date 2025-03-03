// backend/config/googleDrive.js
const { google } = require("googleapis");
const { OAuth2 } = google.auth;

const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:5000/api/auth/google/callback" // Same as auth redirect
);

const drive = google.drive({ version: "v3", auth: oauth2Client });

module.exports = { oauth2Client, drive };

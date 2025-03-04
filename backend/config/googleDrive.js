// backend/config/googleDrive.js
const { google } = require("googleapis");
const { JWT } = google.auth;

const jwtClient = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, "\n"),
  scopes: ["https://www.googleapis.com/auth/drive"],
});

const drive = google.drive({ version: "v3", auth: jwtClient });

const STUDYHIVE_FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;

module.exports = { drive, STUDYHIVE_FOLDER_ID };

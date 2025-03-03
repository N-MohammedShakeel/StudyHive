// backend/controllers/fileController.js
const File = require("../models/File");
const { drive, oauth2Client } = require("../config/googleDrive");
const stream = require("stream");

const getFiles = async (req, res) => {
  const { groupId } = req.params;
  try {
    const files = await File.find({ groupId });
    res.json(files);
  } catch (error) {
    console.error("Get Files Error:", error);
    res
      .status(500)
      .json({ message: "Error fetching files", error: error.message });
  }
};

const uploadFile = async (req, res) => {
  const { groupId, fileName, fileData, accessToken } = req.body; // Assume fileData is base64
  try {
    const userId = req.user.id;
    oauth2Client.setCredentials({ access_token: accessToken });

    const bufferStream = new stream.PassThrough();
    bufferStream.end(Buffer.from(fileData, "base64"));

    const fileMetadata = {
      name: fileName,
      parents: ["root"], // Store in root for simplicity; can create group folders later
    };
    const media = {
      mimeType: "application/octet-stream",
      body: bufferStream,
    };

    const driveResponse = await drive.files.create({
      resource: fileMetadata,
      media,
      fields: "id, webViewLink",
    });

    const file = new File({
      groupId,
      userId,
      name: fileName,
      driveFileId: driveResponse.data.id,
      url: driveResponse.data.webViewLink,
    });
    await file.save();

    res.status(201).json(file);
  } catch (error) {
    console.error("Upload File Error:", error);
    res
      .status(500)
      .json({ message: "Error uploading file", error: error.message });
  }
};

const deleteFile = async (req, res) => {
  const { fileId } = req.params;
  const { accessToken } = req.body;
  try {
    const userId = req.user.id;
    const file = await File.findOne({ _id: fileId, userId });
    if (!file)
      return res
        .status(403)
        .json({ message: "You can only delete your own files" });

    oauth2Client.setCredentials({ access_token: accessToken });
    await drive.files.delete({ fileId: file.driveFileId });

    await File.deleteOne({ _id: fileId });
    res.json({ message: "File deleted successfully", fileId });
  } catch (error) {
    console.error("Delete File Error:", error);
    res
      .status(500)
      .json({ message: "Error deleting file", error: error.message });
  }
};

module.exports = { getFiles, uploadFile, deleteFile };

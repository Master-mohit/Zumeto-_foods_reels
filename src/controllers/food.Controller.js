const foodModel = require("../models/food.model");
const storageService = require("../services/service");
const { v4: uuid } = require("uuid");

async function createFood(req, res) {
    try {
        console.log("Food partner:", req.foodPartner);
        console.log("Body:", req.body);
        console.log("File:", req.file);

        // Debug keys
        console.log("Initializing ImageKit keys:", {
            publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY ? "Exists" : "Missing",
            urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
        });

        // Upload file to ImageKit
        const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid());

        // Get uploaded file URL
        console.log(fileUploadResult);
        

       

    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).send("Failed to create food item");
    }
}

module.exports = { createFood };

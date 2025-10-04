const express = require('express');
const foodController = require("../controllers/food.Controller");
const authfoodmiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

const multer = require("multer");
const upload = multer({
      storage: multer.memoryStorage(),
})


router.post('/', authfoodmiddleware.authFoodPartnerMiddleware, upload.single("video"), foodController.createFood)

module.exports = router;

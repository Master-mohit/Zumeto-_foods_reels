const express = require('express');
const foodController = require("../controllers/food.Controller");
const authfoodmiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

router.post('/', authfoodmiddleware.authFoodPartnerMiddleware, foodController.createFood)

module.exports = router;

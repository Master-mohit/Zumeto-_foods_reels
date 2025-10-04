const foodpartnerModel = require("../models/foodPatner.model");
const jwt = require("jsonwebtoken");

async function authFoodPartnerMiddleware(req, res, next){
    const token = req.cookies?.token;

    if(!token){
       return res.status(401).json({
            message : "Please login first."
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const foodPartner = await foodpartnerModel.findById(decoded.id);
        req.foodPartner = foodPartner;
        next()

    } catch (error) {
        res.status(401).json({
            message: "Invalid token"
        })
    }

}

module.exports = {
    authFoodPartnerMiddleware
}
const mongoose = require('mongoose');

const FoodPartnerSchema = new mongoose.Schema({
   name: {
    type: String,
    require: true
   }, 
   email: {
    type: String,
    require: true,
    unique: true
   },
   password: {
    type: String,
    require: true
   }
})

const foodPartnerModel = mongoose.model("foodpartner", FoodPartnerSchema)
module.exports = foodPartnerModel;
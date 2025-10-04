const userModel = require('../models/user.model');
const foodPartnerModel = require('../models/foodPatner.model')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { json } = require('express');




async function registerUser(req, res) {
    const {fullName, email, password} = req.body;

   const isUserAlreadyExist = await userModel.findOne({
        email
    })

    if(isUserAlreadyExist){
        return res.status(400).json({
            message: "User already exists"
        })
    }
    const hashPassward = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        fullName,
        email,
        password: hashPassward
    })

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET)

    res.cookie("token", token)
    res.status(200).json({
        message: "User registerd successfully",
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    })
}


async function logdinUser(req, res){
   const {email, password} = req.body

   const user = await userModel.findOne({
    email
   })

   if(!user){
   return res.status(400).json({
        message: "invalid email and password"
    })
   }

   const passwordMatched = await bcrypt.compare(password, user.password);

   if(!passwordMatched){
    return res.status(400).json({
        message: "invalid email and password"
    })
   }

   const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET)
 
   res.cookie("token", token);
    res.status(201).json({
        message: "User logdin",
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    })
}


function logoutUser(req, res){
     res.clearCookie("token");
     res.status(201).json({
        message: "User logout successfully"
     });
}



async function registerfoodpartner(req, res){
     const{name, email, password} = req.body

     const IsAccontAlreadyExist = await foodPartnerModel.findOne({
        email
     })

     if(IsAccontAlreadyExist){
       return res.status(400).json({
            message: "Account Already Exist"
        })
     }

     const hasedpassword = await bcrypt.hash(password, 10);

     const foodPartner = await foodPartnerModel.create({
         name,
         email,
         password: hasedpassword
     })

     const token = jwt.sign({
        id: foodPartner._id,
     }, process.env.JWT_SECRET);

     res.cookie("token", token)

     res.status(201).json({
        message: "Food Partner registered successfully",
        foodPartner: {
           _id : foodPartner._id,
           email: foodPartner.email,
            name: foodPartner.name
        }
     })
}


async function foodPartnerLogdin(req, res){
   const{email, password} = req.body

   const foodpartnerLoginuser = await foodPartnerModel.findOne({
      email
   })

   if(!foodpartnerLoginuser){
    res.status(400).json({
       message: "Invalid email and password please try again"
    })
   }

   const hashedpassword = await bcrypt.compare(password, foodpartnerLoginuser.password)

   if(!hashedpassword){
    res.status(400).json({
        message: "Invalid email and password please try again"
    })
   }

   const token = jwt.sign({
      id: foodpartnerLoginuser._id
   }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(400).json({
       message: "FoodPartner logdin successfully",
        foodpartnerLoginuser: {
            _id: foodpartnerLoginuser._id,
            email: foodpartnerLoginuser.email,
            name: foodpartnerLoginuser.name
        }
    })

}


function foodPartnerLogout(req, res){
    res.clearCookie("token");
     res.status(201).json({
        message: "FoodPartner logout successfully"
     });
}










module.exports = {
  registerUser,
  logdinUser,
  logoutUser,
  registerfoodpartner,
  foodPartnerLogdin,
  foodPartnerLogout


}   

const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

//Generate Token

const generateToken = (id) => {
return jwt.sign({id}, process.env.JWT_SECRET,{
    expiresIn : '10d'
})
}


const registerUser = asyncHandler(
    async (req,res) =>{
        const {name,email,password} = req.body
        //Validations
        // if(!name || !email || !password){
        //     return res.status(400).json({msg:"Please Include All Fields"})
        // }
    
         if(!name || !email || !password){
           res.status(400)
           throw new Error('Please Include All Fields!')
        } 
       const  userExists = await User.findOne({
           email : email
       })

       //Find if user exits

       if(userExists){
           res.status(400)
           throw new Error ('User Already Exists')
       }

       //Hash Password

       const salt = await bcrypt.genSalt(10)
       const hashedPassword = await bcrypt.hash(password, salt)

       //Create User

       const user = await User.create({
           name,
           email,
           password : hashedPassword
       })

       if(user){
           res.status(201).json({
               _id : user.id,
               name : user.name,
               email : user.email,
               token : generateToken(user._id)
           })
       } else {
           res.status(400)
           throw new error ('Invalid user data')
       }
        
    }
)

const loginUser = asyncHandler(
   async (req,res) =>{
       
        const {email,password} = req.body
        const user = await User.findOne({email})

        //Check User & Password

        if(user && (await bcrypt.compare(
            password, user.password
        ))) {
            res.status(200).json({
                _id: user._id,
                name : user.name,
                email : user.email,
                token : generateToken(user._id)
            })
        } else {
            res.status(401)
            throw new Error ('Invalid Credentials')
        }
    } 
)

//@desc Get Current User
//@ route /api/users/me
//@ access Private

const getMe = asyncHandler(async(req,res)=>{
    
    const user = {
    id : req.user._id,
    email: req.user.email,
    name : req.user.name,
    }

    res.status(200).json(user)

})





module.exports = { 
    registerUser,
    loginUser,
    getMe
 }
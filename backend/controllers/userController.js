const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')

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
               email : user.email
           })
       } else {
           res.status(400)
           throw new error ('Invalid user data')
       }
        
    }
)

const loginUser = asyncHandler(
    (req,res) =>{
        res.send('Login Route')
    } 
)


module.exports = { 
    registerUser,
    loginUser
 }
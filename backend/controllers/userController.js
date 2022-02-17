

const registerUser = (req,res) =>{
    const {name,email,password} = req.body
    //Validations
    // if(!name || !email || !password){
    //     return res.status(400).json({msg:"Please Include All Fields"})
    // }

     if(!name || !email || !password){
       res.status(400)
       throw new Error('Please Include All Fields!')
    } 
    console.log(`Your name is ${name} `);
    
}

const loginUser = (req,res) =>{
    res.send('Login Route')
} 


module.exports = { 
    registerUser,
    loginUser
 }
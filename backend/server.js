const express = require('express')
const { errorHandler } = require('./middleware/errorMiddleware')
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 5000 
const app = express()

//Setup Middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//Use Error Middleware
app.use(errorHandler)



//Default Route
app.get('/',(req,res)=>{
    res.status(201).json({message : 'Welcome to Eskills'})
})


//User Router
app.use('/api/users',require('./routes/userRoutes'))

app.listen(PORT,()=>{
    console.log(`Server is running at PORT: ${PORT}`);
})
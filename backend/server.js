const express = require('express')
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 8000 
const app = express()

app.get('/',(req,res)=>{
    res.status(201).json({message : 'Welcome to Eskills'})
})


app.use('/api/users',require('./routes/userRoutes'))

app.listen(PORT,()=>{
    console.log(`Server is running at PORT: ${PORT}`);
})

const express = require('express')
const app = express()
require('dotenv').config()
const connectDB = require('./server/config') 
const cookieParser = require('cookie-parser')
const path = require('path')

//PORT NUMBER 
const PORT = process.env.PORT || 7070 

//CONNECTING DATABASE
 connectDB()

//MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({extended : true})) 
app.use(express.static('public'))
app.use(cookieParser())



app.set('view engine','ejs')


//User routes
app.use('/',require('./routes/routes')) 

// 404
app.get('*',(req,res)=>{
    res.status(404).send(" Page not found => 404 ")
})

app.listen(process.env.PORT,()=>{
console.log(`Server started on http://localhost:${PORT}`) 
})
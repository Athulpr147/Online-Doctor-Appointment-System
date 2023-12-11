const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const generateOTP = require('otp-generator')
const nodemailer = require('nodemailer')
const Mailgen = require('mailgen')
app.use(cookieParser())
app.use(bodyParser.json())

const Users = require('../models/users')
const OTP = require('../models/otp')
const Appointment = require('../models/appointments')

// Home Page
exports.bookingPage = async (req,res)=>{
    try {
        const userToken = req.cookies.userToken
        let userEmail
        jwt.verify(userToken,'1234',(error,decoded)=>{
            if(decoded){
                userEmail = decoded.email
            }else{
                userEmail = 'Unknown'
            }
        })
        const appointments = await Appointment.find({email : userEmail})
        console.log(appointments)
        res.render('bookslot',{appointments})
        console.log('oops')
    } catch (error) {
        console.log(error)
    }
} 

// Login Page
exports.login = async (req,res)=>{
    try {
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private')
        res.render('login')
    } catch (error) {
        
    }
}

// Login post method
exports.login_post = async (req,res)=>{
    try {
       const email = req.body.email
       const password = req.body.password
       const user = await Users.findOne({email : email})
       if(!user){
        res.status(404).send({
            sucess : false,
            message : 'User not found'
        })
        return
       }
       const comparePassword = await bcrypt.compare(password , user.password)
       if(!comparePassword){
        res.send({
            sucess : false ,
            message : 'Password not matching'
        })
        return
       }
       const userData = {
        name : user.name,
        email : user.email,
       }
       const userToken = jwt.sign(userData ,'1234',{expiresIn : '100m'})
       res.clearCookie('userToken')
       res.cookie('userToken',userToken,{httpOnly : true})
       res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private')
       res.send({
        sucess : true,
        message : 'Login  sucess'
       })

    } catch (error) {
        console.log(error)
        res.send({
            sucess : false,
            message : 'Server error'
        })
    }
}

//  Register page
exports.signup = async (req,res)=>{
    try {
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private')
        res.render('register')

    } catch (error) {
        
    }
}

// Register post method
exports.signup_post = async (req,res)=>{
    try {
       const name = req.body.name
       const email = req.body.email
       const password = req.body.password
       const isUserExist = await Users.findOne({email})
        if(isUserExist){
            const message = 'User already exist'
            res.send({sucess : false , message : message})
            return
        }
        const hashedPassword = await bcrypt.hash(password ,10)
        const newUser = new Users({
            name,
            email,
            password : hashedPassword
        })
        await newUser.save()
        const userData = {
            name : name,
            email : email,
           }
           const userToken = jwt.sign(userData , '1234' ,{expiresIn : '100m'})
           res.clearCookie('userToken')
           res.cookie('userToken',userToken,{httpOnly : true})
           res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private')
        res.send({
            sucess : true,
            message : 'New Account created'
        }) 
        
    } catch (error) {
        res.send({
            sucess : false,
            message : 'Server error'
        })
        console.log(error) 
    }
}

//Checking is user is logined or not
exports.isUserLoginedOrNot = async (req,res)=>{
    try {
        console.log('checking user')
        const userToken = req.cookies.userToken
        jwt.verify(userToken,'1234',(error,decoded)=>{
            if(decoded){
                res.send({
                    logined : true,
                    userName : decoded.name
                })
                
                return
            }else{
                res.send({
                    logined : false
                })
            }
        })
    } catch (error) {
        console.log(error)
    }
}

//Set otp vai gmail
exports.sendOtp = async(req,res)=>{
    try {
        console.log('otp section')
        const email = req.body.email
        const name = req.body.name
        //Generate OTP
        const otp = generateOTP.generate(4, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets:false ,
             specialChars: false ,
             alphabets: false})

           const isOtpExist = await OTP.findOne({email : email})
           if(isOtpExist) await OTP.findByIdAndDelete(isOtpExist._id)
           const newOTP = new OTP({
                    email,
                    otp     })
        await newOTP.save()
         // sending otp to email
         const sendOTP = {
            service : 'gmail',
            auth : {
               user : process.env.GMAIL,                              
               pass : process.env.GMAIL_APP_PASSWORD  
            }
         }

         const transporter = nodemailer.createTransport(sendOTP) 

         const mailGenerator = new Mailgen({                          
            theme : "default",                                        
            product : {                                               
               name : "Mailgen",                                      
               link : 'http://mailgen.js/'                            
            }                                                         
         })  

         const responds = {                                           
            body : {                                                  
               name :  name,                                   
               intro : "Book Appointment",                   
               table : {                                              
                  data : [                                            
                     {                                                
                        item :     "Appointment for Dr. Manik Dalvi",          
                     description : "OTP to comfirm your slot",     
                     OTP : otp                                     
                     }                                                
                  ]                                                   
               },                                                     
               outro : "This OTP will expires in 10 min"                
            }                                                         
         }  
         const mail = mailGenerator.generate(responds)
         const message = {                                            
            from : 'Dr. Manik Dalvi',                                 
               name : name,                                    
               to : email,                                     
               subject : "OTP Verification",                          
               html : mail                                            
         }
         transporter.sendMail(message)  // OTP sended
         res.send({
            sucess : true
         })

    } catch (error) {
        console.log(error)
        res.send({
            sucess : false
        })
    }
}

//vERIFY OTP 
exports.checkOTP = async (req,res)=>{
    try {
        const email = req.body.email
        const otp = req.body.otp
        const verify = await OTP.findOne({email : email})
        if(otp === verify.otp){
            res.send({
                sucess : true,
            })
        }else{
            res.send({
            sucess : false,
            message : 'Invalid OTP'
            })
        }
    } catch (error) {
        res.send({
            sucess : false,
            message : 'Server error'
        })
    }
}

//Add Appointment
exports.addAppointment = async (req,res)=>{
    try {
        const { name , email , appointmentType , date , timeSlot } = req.body
        const userToken = req.cookies.userToken
        let userEmail
        jwt.verify(userToken,'1234',(error,decoded)=>{
            if(decoded){
                userEmail = decoded.email
            }else{
                userEmail = 'Unknown'
            }
        })

        const newAppointment = new Appointment({
            name,
            aEmail : email , 
            email : userEmail,
            appointmentType ,
            date ,
            timeSlot
        })
        await newAppointment.save()
        res.send({
            sucess : true,
            date ,
            timeSlot
        })

    } catch (error) {
        res.send({
            sucess : false,
            message : 'Server error'
        })    
    }
}

//Logout 
exports.logout = async (req,res)=>{
    try {
        res.clearCookie('userToken')
        res.redirect('/')
    } catch (error) {
        console.log(error)
    }
}

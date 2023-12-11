const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Appointment = new Schema({
    name : {
        type : String,
        default : 'Unknown'
    },
    email : {
        type : String ,
        default : 'Unknown'
    },
    aEmail : {
        type : String ,
        default : 'Unknown'
    },
    appointmentType :{
        type : String ,
        default : 'Unknown'
    },
    date : {
        type : String ,
        default : 'Unknown'
    },
    timeSlot :{
        type : String,
        default : 'Unknown'
    }
})

module.exports = mongoose.model('Appointment',Appointment)
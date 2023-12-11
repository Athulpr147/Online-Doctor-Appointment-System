const mongoose = require('mongoose')
mongoose.set('strictQuery',false)

const connectDB = async()=>{
    try {
        await mongoose.connect('mongodb+srv://athulpr147social:g3yE6N2mIRZWPPEW@odas.3gim2n3.mongodb.net/ODAS')
        console.log('Database connected')
    } catch (error) {
        console.log('Database not connected =>',error)
    }
}
 
module.exports = connectDB
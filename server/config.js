const mongoose = require('mongoose')
mongoose.set('strictQuery',false)

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MongoDB_URI)
        console.log('Database connected')
    } catch (error) {
        console.log('Database not connected =>',error)
    }
}
 
module.exports = connectDB
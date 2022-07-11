const mongoose = require('mongoose');

const USER = process.env.MONGO_USER
const PWD = process.env.MONGO_PASS
const URI = process.env.DATABASE_URI
const PORT = process.env.DATABASE_PORT
const COLLECTION = process.env.MONGODB_COLLECTION

const mongoURL = (USER === 'localhost' || USER === 'undefined' ) 
  ? `mongodb://${URI}:${PORT}/${COLLECTION}`
  : `mongodb://${USER}:${encodeURIComponent(PWD)}@${URI}:${PORT}/${COLLECTION}?authSource=admin`

console.log(mongoURL);

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      family: 4 // Use IPv4, skip trying IPv6
    });
  } catch (err) {
    console.error(err);
  }
}


module.exports = connectDB
const mongoose = require('mongoose');
const pool = require('./postgresql');

async function connectDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/monggodb_xmart', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Koneksi MongoDB berhasil');
  } catch (error) {
    console.error('Koneksi MongoDB gagal:', error);
  }
  
  try {
    await pool.connect();
    console.log('Koneksi PostgreSQL berhasil');
  } catch (error) {
    console.error('Koneksi PostgreSQL gagal:', error);
  }

}

module.exports = connectDB;

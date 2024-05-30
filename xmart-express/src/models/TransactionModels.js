const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    transaction_id: {
        type: Number,
        unique: true, 
        sparse: true, 
    },
    customer_id: {
        type: Number,
        required: true
    },
    rfid: {
        type: Number,
        required: true
    },
    product_price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    transaction_datetime: {
        type: Date,
        default: Date.now
      }
});

const Transaction = mongoose.model('transaction', transactionSchema);

module.exports = Transaction;
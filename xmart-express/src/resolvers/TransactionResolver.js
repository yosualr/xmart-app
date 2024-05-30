const Transaction = require('../models/TransactionModels');
const pool = require('../../postgresql');
const redis = require('../../redis');

class TransactionResolver {
  async saveTransaction(args) {
    try {
      const { customer_id, rfid, product_price, quantity } = args;

      // Generate temporary transaction_id for Redis
      const tempTransactionId = `temp:${Date.now()}:${Math.random().toString(36).substring(7)}`;

      // Get current date and time
      const transactionDatetime = new Date();

      // Format date and time string in ISO format
      const formattedTransactionDatetime = transactionDatetime.toISOString();

      // Simpan transaksi ke Redis
      const redisKey = `transaction:${tempTransactionId}`;
      const redisValue = JSON.stringify({
        customer_id,
        rfid,
        product_price,
        quantity,
        transaction_datetime: formattedTransactionDatetime,
      });
      await redis.set(redisKey, redisValue);
      console.log('Transaction saved to Redis with key:', redisKey);

      // Simpan transaksi ke MongoDB
      let transaction = new Transaction({
        customer_id,
        rfid,
        product_price,
        quantity,
        transaction_datetime: formattedTransactionDatetime
      });

      const savedTransaction = await transaction.save();
      console.log('Transaction saved to MongoDB:', savedTransaction);

      // Simpan transaksi ke PostgreSQL
      // Dapatkan nilai customer_wallet dari basis data
        const queryGetCustomerWallet = `
        SELECT customer_wallet 
        FROM customer
        WHERE customer_id = $1
      `;
      const resultCustomer = await pool.query(queryGetCustomerWallet, [customer_id]);
      if (resultCustomer.rows.length === 0) {
        throw new Error('Pelanggan tidak ditemukan.');
      }
      const currentCustomerWallet = resultCustomer.rows[0].customer_wallet;
      const totalTransactionPrice = product_price * quantity;

       // Periksa apakah customer_wallet mencukupi
      if (currentCustomerWallet < totalTransactionPrice) {
        throw new Error('Saldo pelanggan tidak mencukupi.');
      }

      const newCustomerWallet = currentCustomerWallet - totalTransactionPrice;
      const queryUpdateCustomerWallet = `
      UPDATE customer 
      SET customer_wallet = $1 
      WHERE customer_id = $2
      `;
      await pool.query(queryUpdateCustomerWallet, [newCustomerWallet, customer_id]);

      const query = `
        INSERT INTO transaction (customer_id, rfid, product_price, quantity, transaction_datetime)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING transaction_id;
      `;
      const values = [
        savedTransaction.customer_id,
        savedTransaction.rfid,
        savedTransaction.product_price,
        savedTransaction.quantity,
        formattedTransactionDatetime, // Gunakan formattedTransactionDatetime
      ];

      const result = await pool.query(query, values);
      const transactionId = result.rows[0].transaction_id;
      console.log('Transaction saved to PostgreSQL with transaction_id:', transactionId);

      // Perbarui transaksi di MongoDB dengan transaction_id
      savedTransaction.transaction_id = transactionId;
      await savedTransaction.save();
      console.log('Transaction updated in MongoDB with transaction_id:', savedTransaction);

      // Perbarui Redis dengan transaction_id
      const updatedRedisValue = JSON.stringify({
        transaction_id: transactionId,
        customer_id: savedTransaction.customer_id,
        rfid: savedTransaction.rfid,
        product_price: savedTransaction.product_price,
        quantity: savedTransaction.quantity,
        transaction_datetime: formattedTransactionDatetime, // Gunakan formattedTransactionDatetime
      });
      await redis.set(`transaction:${transactionId}`, updatedRedisValue);
      console.log('Transaction updated in Redis with key:', `transaction:${transactionId}`);

      // Hapus temporary Redis key
      await redis.del(redisKey);

      // Hapus data cart jika ada yang sesuai dengan customer_id dan rfid
      const cartKeys = await redis.keys("cart:*");
      for (const cartKey of cartKeys) {
        const cartData = await redis.get(cartKey);
        const cartItem = JSON.parse(cartData);
        if (cartItem.customer_id === customer_id && cartItem.rfid === rfid) {
          await redis.del(cartKey);
          console.log('Cart item deleted from Redis:', cartKey);
        }
      }


      return {
        transaction_id: transactionId,
        ...savedTransaction.toObject(),
        transaction_datetime: formattedTransactionDatetime, // Gunakan formattedTransactionDatetime
      };
    } catch (error) {
      console.error('Error saving transaction:', error);
      throw new Error('Gagal menyimpan transaksi: ' + error.message);
    }
  }

  async getAllTransactions() {
    try {
      const transactions = await Transaction.find();
      const formattedTransactions = transactions.map(transaction => ({
        ...transaction.toObject(),
        transaction_datetime: new Date(transaction.transaction_datetime).toISOString(),
      }));

      return formattedTransactions;
    } catch (error) {
      console.error('Error getting all transactions:', error);
      throw new Error('Gagal mendapatkan semua transaksi: ' + error.message);
    }
  }

  async addCart(args) {
    try {
      const tempCartId = `${Date.now()}`;
      const { customer_id, rfid, product_price, quantity } = args;
      const redisKey = `${tempCartId}`;
      const cartItem = {
        customer_id,
        rfid,
        product_price,
        quantity,
      };

      // Simpan cart item ke Redis
      await redis.set(`cart:${redisKey}`, JSON.stringify(cartItem));

      return cartItem;
    } catch (error) {
      console.error('Error saving cart item to Redis:', error);
      throw new Error('Gagal menyimpan item ke Redis: ' + error.message);
    }
  }

  async getCart(redisKey) {
    try {
      const cartItem = await redis.get(`cart:${redisKey}`);
      return JSON.parse(cartItem);
    } catch (error) {
      console.error('Error retrieving cart item from Redis:', error);
      throw new Error('Gagal mengambil item dari Redis: ' + error.message);
    }
  }
}

module.exports = new TransactionResolver();

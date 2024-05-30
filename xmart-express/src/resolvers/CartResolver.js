const redis = require('../../redis');

class CartResolver {
  async addCart(args) {
    try {
      const { customer_id, rfid, product_price, quantity } = args;
      const cartItem = {
        customer_id,
        rfid,
        product_price,
        quantity,
      };

      // Simpan cart item ke Redis
      await redis.set(`cart:${customer_id}:${rfid}`, JSON.stringify(cartItem));

      return cartItem;
    } catch (error) {
      console.error('Error saving cart item to Redis:', error);
      throw new Error('Gagal menyimpan item ke Redis: ' + error.message);
    }
  }

  async getCart(customerId, rfid) {
    try {
      const cartItem = await redis.get(`cart:${customerId}:${rfid}`);
      return JSON.parse(cartItem);
    } catch (error) {
      console.error('Error retrieving cart item from Redis:', error);
      throw new Error('Gagal mengambil item dari Redis: ' + error.message);
    }
  }
}

module.exports = new CartResolver();

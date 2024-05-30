const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema } = require('graphql');
const connectDB = require('./server');  
const cors = require("cors");
const redis = require('./redis');
const { RootQuery, Mutation } = require('./src/schemas/TransactionSchema');
const { TransactionResolver } = require('./src/resolvers/TransactionResolver');
const { RootQuery: TransactionRootQuery, Mutation: TransactionMutation } = require('./src/schemas/TransactionSchema');


const app = express();
app.use(cors());


// Koneksi ke MongoDB
connectDB().then(() => {
  // Definisikan skema GraphQL
  // const schema = new GraphQLSchema({
  //   query: RootQuery,
  //   mutation: Mutation,
  // });

  const transactionSchema = new GraphQLSchema({
    query: TransactionRootQuery,
    mutation: TransactionMutation,
  });
  

// Tambahkan middleware GraphQL ke Express
app.use('/graphql/transaction', graphqlHTTP({
  schema: transactionSchema,
  graphiql: true, // Aktifkan GraphiQL untuk testing
}));


app.get('/api/redis-transactions', async (req, res) => {
  try {
    const keys = await redis.keys('transaction:*');
    const transactions = await Promise.all(keys.map(async (key) => {
      const data = await redis.get(key);
      return JSON.parse(data);
    }));
    res.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions from Redis:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/redis-carts', async (req, res) => {
  try {
    const keys = await redis.keys('cart:*');
    const carts = await Promise.all(keys.map(async (key) => {
      const data = await redis.get(key);
      return JSON.parse(data);
    }));
    res.json(carts);
  } catch (error) {
    console.error('Error fetching cart from Redis:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

 app.delete('/api/redis-carts', async (req, res) => {
  try {
    const keys = await redis.keys('cart:*');
    if (keys.length === 0) {
      return res.status(404).json({ message: 'No cart data found' });
    }
    const deletePromises = keys.map(key => redis.del(key));
    await Promise.all(deletePromises);
    res.status(200).json({ message: 'All cart data deleted successfully' });
  } catch (error) {
    console.error('Error deleting cart data from Redis:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Port untuk server
const PORT = process.env.PORT || 8070;

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server GraphQL berjalan di http://localhost:${PORT}/graphql`);
});
}).catch(error => {
  console.error('Gagal menghubungkan ke MongoDB:', error);
});
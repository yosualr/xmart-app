const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
} = require('graphql');
const TransactionType = require('../objectType/TransactionType');
const TransactionResolver = require('../resolvers/TransactionResolver');
const CartType = require('../objectType/CartType');
const CartResolver = require('../resolvers/CartResolver');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'Root Query Type',
  fields: {
    getTransaction: {
      type: TransactionType,
      args: {
        transactionId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        // Logika untuk mengambil transaksi berdasarkan ID
      },
    },
    getAllTransactions: {
      type: new GraphQLList(TransactionType),
      resolve(parent, args) {
        return TransactionResolver.getAllTransactions();
      },
    },
    getCart: {
      type: CartType,
      args: {
        redisKey: { type: new GraphQLNonNull(GraphQLInt) }, // Ganti dengan tipe yang sesuai
        
      },
      resolve(parent, args) {
        return TransactionResolver.getCart(args.redisKey); // Tambahkan resolver untuk pengambilan data dari Redis
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation Type',
  fields: {
    saveTransaction: {
      type: TransactionType,
      args: {
        transaction_id: { type: GraphQLID },
        customer_id: { type: new GraphQLNonNull(GraphQLInt) },
        rfid: { type: new GraphQLNonNull(GraphQLInt) },
        product_price: { type: new GraphQLNonNull(GraphQLInt) },
        quantity: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        console.log('Saving transaction to MongoDB...'); // Tambahkan log
        return TransactionResolver.saveTransaction(args);
      },
    },
    addCart: {
      type: CartType,
      args: {
        customer_id: { type: new GraphQLNonNull(GraphQLInt) },
        rfid: { type: new GraphQLNonNull(GraphQLInt) },
        product_price: { type: new GraphQLNonNull(GraphQLInt) },
        quantity: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        return TransactionResolver.addCart(args); // Tambahkan resolver untuk menyimpan data ke Redis
      },
    },
  },
});

module.exports = { RootQuery, Mutation };

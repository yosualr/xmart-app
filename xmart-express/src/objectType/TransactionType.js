const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLNonNull,
    GraphQLID,
  } = require('graphql');
  
  const TransactionType = new GraphQLObjectType({
    name: 'Transaction',
    description: 'Representasi dari entitas Transaksi',
    fields: () => ({
      transaction_id: { type: GraphQLID },
      customer_id: { type: new GraphQLNonNull(GraphQLInt) },
      rfid: { type: new GraphQLNonNull(GraphQLInt) },
      product_price: { type: new GraphQLNonNull(GraphQLInt) },
      quantity: { type: new GraphQLNonNull(GraphQLInt) },
      transaction_datetime: { type: new GraphQLNonNull(GraphQLString) },
    }),
  });
  
  module.exports = TransactionType;
  
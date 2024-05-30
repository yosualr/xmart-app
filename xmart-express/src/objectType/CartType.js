const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLID,
    GraphQLString,
  } = require('graphql');
  
  const CartType = new GraphQLObjectType({
    name: 'Cart',
    fields: () => ({
      transaction_id: { type: GraphQLID },
      customer_id: { type: GraphQLInt },
      rfid: { type: GraphQLInt },
      product_price: { type: GraphQLInt },
      quantity: { type: GraphQLInt },
    }),
  });
  
  module.exports = CartType;
  
import { useQuery, gql } from '@apollo/client';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useEffect, useState } from 'react';


const GET_TRANSACTIONS = gql`
  query GetAllTransactions {
    getAllTransactions {
      transaction_id
      customer_id
      rfid
      product_price
      quantity
      transaction_datetime
    }
  }
`;

const TableMongoTransactions = () => {
  const {loading, error, data} = useQuery(GET_TRANSACTIONS);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (data) {
      console.log('Data received from GraphQL:', data);
      setTransactions(data.getAllTransactions);
    } else {
      console.log('No data received');
    }
  }, [data]);
  
  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error('GraphQL error:', error);
    return <p>Error: {error.message}</p>;
  }
  

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Transaction ID</TableCell>
            <TableCell>Customer ID</TableCell>
            <TableCell>Product ID</TableCell>
            <TableCell>Product Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Total Price</TableCell>
            <TableCell>Date Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.transaction_id}>
              <TableCell>{transaction.transaction_id}</TableCell>
              <TableCell>{transaction.customer_id}</TableCell>
              <TableCell>{transaction.rfid}</TableCell>
              <TableCell>{transaction.product_price}</TableCell>
              <TableCell>{transaction.quantity}</TableCell>
              <TableCell>{transaction.quantity * transaction.product_price}</TableCell>
              <TableCell>{new Date(transaction.transaction_datetime).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableMongoTransactions;

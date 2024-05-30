import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";


const TableRedisTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    useEffect(() => {
        const fetchTransactions = async () => {
          try {
            const response = await fetch('http://localhost:8070/api/redis-transactions');
            const data = await response.json();
            setTransactions(data);
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };
    
        fetchTransactions();
      }, []);
    
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error}</p>;
    
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
    )
}

export default TableRedisTransactions;
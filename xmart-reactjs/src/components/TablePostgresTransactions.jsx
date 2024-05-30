import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';

const TablePostgresTransactions = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/transactions/list');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
          {data.map((row) => (
            <TableRow key={row.transactionId}>
              <TableCell>{row.transactionId}</TableCell>
              <TableCell>{row.customerId}</TableCell>
              <TableCell>{row.rfid}</TableCell>
              <TableCell>{row.productPrice}</TableCell>
              <TableCell>{row.quantity}</TableCell>
              <TableCell>{row.quantity * row.productPrice}</TableCell>
              <TableCell>{row.transactionDatetime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TablePostgresTransactions;

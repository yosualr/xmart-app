import {  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";


const TableCart = () => {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    useEffect(() => {
        const fetchCarts = async () => {
          try {
            const response = await fetch('http://localhost:8070/api/redis-carts');
            const data = await response.json();
            setCarts(data);
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };
    
        fetchCarts();
      }, []);
    
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error}</p>;
    
      return (
        <TableContainer component={Paper}>
             <Typography component="h1" variant="h5" color="text.secondary" sx={
          { fontWeight: 'bold', mt: '5vh', mb:'2vh', alignSelf: 'flex-start'  }
          }> List Cart </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product ID</TableCell>
                <TableCell>Product Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Total Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {carts.map((cart, index) => (
                <TableRow key={index}>
                <TableCell>{cart.rfid}</TableCell>
                <TableCell>{cart.product_price}</TableCell>
                <TableCell>{cart.quantity}</TableCell>
                <TableCell>{cart.quantity * cart.product_price}</TableCell>
                </TableRow>
            ))}
            </TableBody>
          </Table>
        </TableContainer>
    )
}

export default TableCart;
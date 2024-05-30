import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect } from 'react';
import axios from 'axios';
import { Typography } from '@mui/material';

const columns = [
  { id: 'rfid', label: 'Product ID', minWidth: 50 },
  { id: 'productName', label: 'Product Name', minWidth: 50 },
  { id: 'productPrice', label: 'Product Price', minWidth: 50 },

];


export default function TableProducts() {
  const [listProducts, setlistProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/products/list`);
        setlistProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  console.log(listProducts);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Paper sx={{ width: '100%', marginBottom: 2 }}> 
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow> 
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sx={{background:'#808080', fontWeight: 'bold', color:'#FFFFFF'}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {listProducts
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.orderId}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}  sx={{ fontWeight: 'bold' }}>
                          {column.id === 'state' ? (
                            <Typography
                              variant="body2"
                            >
                              {value}
                            </Typography>
                          ) : (
                            column.format && typeof value === 'number'
                              ? column.format(value)
                              : value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
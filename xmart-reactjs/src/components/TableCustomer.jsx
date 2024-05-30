
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import ModalDetailCustomer from './ModalDetailCustomer';

const columns = [
  { id: 'customerId', label: 'Customer ID', minWidth: 50 },
  { id: 'customerName', label: 'Customer Name', minWidth: 50 },
  { id: 'action', label: 'Action', minWidth: 50, align: 'center' },
];

export default function TableCustomers() {
  const [listCustomer, setListCustomer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/customers/list`);
        setListCustomer(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOpenModal = (customerId) => {
    setSelectedCustomerId(customerId);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedCustomerId(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
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
                    sx={{ background: '#808080', fontWeight: 'bold', color: '#FFFFFF' }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {listCustomer.map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.customerId}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align} sx={{ fontWeight: 'bold' }}>
                        {column.id === 'action' ? (
                          <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button
                              onClick={() => handleOpenModal(row.customerId)}
                              sx={{ backgroundColor: 'white', color: '#808080', border: '2px solid #808080', textTransform: 'capitalize', margin: '0.5em' }}
                            >
                              Detail
                            </Button>
                          </div>
                        ) : (
                          value
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {selectedCustomerId && (
        <ModalDetailCustomer
          customerId={selectedCustomerId}
          open={openModal}
          handleClose={handleCloseModal}
        />
      )}
    </>
  );
}

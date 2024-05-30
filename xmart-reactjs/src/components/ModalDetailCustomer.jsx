import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { useState, useEffect } from 'react';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#71797E',
    border: '2px solid #FFFFFF',
    boxShadow: 24,
    p: 4,
    color: 'white',
    borderRadius: '4px',
  };

const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
};

export default function ModalDetailCustomer({ customerId, open, handleClose }) {
  const [dataCustomer, setDataCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomerDetail = async () => {
      if (customerId) {
        try {
          const response = await axios.get(`http://localhost:8080/customers/${customerId}`);
          setDataCustomer(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching customer detail:", error);
          setError(error.message);
          setLoading(false);
        }
      }
    };

    fetchCustomerDetail();
  }, [customerId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
      <div style={headerStyle}>
        <PeopleAltIcon />
        <IconButton onClick={handleClose} sx={{ color: 'white' }}>
            <CloseIcon />
        </IconButton>
        </div>
            <Typography id="modal-modal-title" variant="h5" component="h1" sx={{mt: 1}}>
              {dataCustomer.customerName}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 5 }}>
              Customer ID : {dataCustomer.customerId}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Wallet : {dataCustomer.customerWallet}
            </Typography>        
      </Box>
    </Modal>
  );
}

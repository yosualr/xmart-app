// Dashboard.jsx
import { Box, Button, Typography } from "@mui/material";
import Footer from "../components/Footer";
import QrScannerComponent from "../components/QrScannerComponent";
import { useEffect, useState } from "react";
import ModalDetailBuyProduct from "../components/ModalDetailBuyProduct";
import TableCart from "../components/TableCart";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const [qrResult, setQrResult] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [productId, setProductId] = useState(null);
  const [hasCarts, setHasCarts] = useState(false);

  const customerData = JSON.parse(localStorage.getItem('customerData'));
  if (customerData) {
    console.log('Customer Data:', customerData);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('rfid'),
      password: data.get('customer_id'),
      qrResult,
    });
  };

  const handleScan = (result) => {
    setQrResult(result);
    console.log('QR Code Result:', result);

    if(result){
      const parsedResult = JSON.parse(result.data);
      setProductId(parsedResult.rfid);
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setProductId(null);
  };

  useEffect(() => {
    const checkCarts = async () => {
      try {
        const response = await fetch('http://localhost:8070/api/redis-carts');
        const data = await response.json();
        setHasCarts(data.length > 0);
      } catch (error) {
        console.error("Error fetching carts:", error);
      }
    };

    checkCarts();
  }, []);

  const handleCheckout = () => {
    navigate('/checkout');
  };
  return (
    <>
      <Box
        sx={{
          marginTop:'5vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
      <Typography component="h1" variant="h5" color="text.secondary" sx={
          { fontWeight: 'bold', mt: '5vh', mb:'2vh'  }
          }>
         Scan Products Here
      </Typography>  

       <Typography component="h2" variant="h6" sx={{ mt: 1, mb: 3, color: 'text.secondary' }}>
            Dont forget to increasing the brightness !!
        </Typography>   
        
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1,  maxWidth:'50vw', maxHeight:'50vh', mb:30 }}>
            <QrScannerComponent onScan={handleScan} />
          </Box>
      </Box>
      
      {hasCarts && (
        <Box sx={{ marginTop: '5vh', maxWidth: '80vw', margin: '0 auto' }}>
          <TableCart />
          <Button 
            fullWidth
            variant="contained" 
            color="primary" 
            sx={{ mt: 2 }} 
            onClick={handleCheckout}
          >
            Checkout Cart
          </Button>        
        </Box>
      )}
      <Box 
      sx={{
        marginTop:'25vh',
      }}>
      <Footer />
      </Box>
      {productId && (
        <ModalDetailBuyProduct productId={productId} open={modalOpen} handleClose={handleCloseModal} />
      )}
    </>
  );
}

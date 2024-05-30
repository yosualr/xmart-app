import { Box, Button, Typography } from "@mui/material";
import TableCart from "../components/TableCart";
import Footer from "../components/Footer";
import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SAVE_TRANSACTION_MUTATION = gql`
    mutation SaveTransaction($customer_id: Int!, $rfid: Int!, $product_price: Int!,  $quantity: Int!){
        saveTransaction(customer_id: $customer_id, rfid: $rfid, product_price: $product_price, quantity: $quantity) {
            customer_id
            rfid
            product_price
            quantity
    }
}
`;

export default function Checkout() {
  const customerData = JSON.parse(localStorage.getItem('customerData'));
  if (customerData) {
    console.log('Customer Data:', customerData);
  }    
    
  const navigate = useNavigate();
    const [carts, setCarts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dataCustomer, setDataCustomer] = useState(null);

    const customerId = customerData.customerId;

  
    const [saveTransaction] = useMutation(SAVE_TRANSACTION_MUTATION);

    useEffect(()=>{
        const fetchCarts = async () => {
            try{
                const response = await fetch('http://localhost:8070/api/redis-carts');
                const data = await response.json();
                setCarts(data);
            }catch (err){
                setError(err.message);
            }finally {
                setLoading(false);
            }
        };

        fetchCarts();
    }, []);

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
    
    const handleCheckout = async () => {
        try{
            for(const cart of carts){
                await saveTransaction({
                    variables:{
                        customer_id : customerData.customerId,
                        rfid: cart.rfid, 
                        product_price: cart.product_price,
                        quantity: cart.quantity
                    }
                });
            }
            alert('Checkout successful');
            navigate("/transactions");
        }catch (error){
            console.error('Error during checkout:', error);
            alert('Checkout failed: ' + error.message);
        }
    }
    const handleDeleteAll = async () => {
      try {
        const response = await axios.get('http://localhost:8070/api/redis-carts');
        const data = response.data;
  
        if (data && data.length > 0) {
          await axios.delete('http://localhost:8070/api/redis-carts');
        }
        navigate('/');
      } catch (error) {
        console.error('Error during logout:', error);
      }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

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
        <Typography component="h1" variant="h4" color="text.secondary" sx={
          { fontWeight: 'bold', mt: '5vh', mb:'2vh'  }
          }> Checkout </Typography>

        <Typography component="h1" variant="h5" color="text.secondary" sx={
          { mt: '5vh', mb:'2vh', alignSelf: 'flex-start'  }
          }>Nama : {dataCustomer.customerName}</Typography>

        <Typography component="h1" variant="h5" color="text.secondary" sx={
          {  mb:'2vh', alignSelf: 'flex-start'  }
          }>Wallet : {dataCustomer.customerWallet}</Typography>

        <TableCart />
        </Box>

        <Box
            sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            mt: 2,
            mb: 2,
            mr: 2
            }}
        >
        <Button 
            variant="contained" 
            color="primary" 
            sx={{ m: 2  }} 
            onClick={handleCheckout}
          >
            Checkout
        </Button>
        <Button 
            variant="contained" 
            color="error" 
            onClick={handleDeleteAll}
            sx={{ m: 2  }} 
          >
            Delete All Data
        </Button>
        </Box>
        <Footer />

        </>
    )
}
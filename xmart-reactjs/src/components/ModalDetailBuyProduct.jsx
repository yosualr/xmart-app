import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { useState, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

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


const ADD_CART_MUTATION = gql`
    mutation AddCart($customer_id:Int!, $rfid:Int!, $product_price:Int!, $quantity:Int!){
        addCart(customer_id:$customer_id, rfid:$rfid, product_price:$product_price, quantity:$quantity ){
            customer_id
            rfid
            product_price
            quantity
        }
    }
`;

export default function ModalDetailBuyProduct({ productId, open, handleClose }) {
    const navigate = useNavigate();
    const customerData = JSON.parse(localStorage.getItem('customerData'));
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [dataCart, setDataCart] = useState({
        customer_id: customerData?.customerId || '',
        rfid: '',
        product_price: '',
        quantity: '',
    });

    const [addCart] = useMutation(ADD_CART_MUTATION);


    useEffect(() => {
        const fetchProductDetail = async () => {
            if (productId) {
                try {
                    const response = await axios.get(`http://localhost:8080/products/${productId}`);
                    const product = response.data;
                    setDataCart({
                        ...dataCart,
                        rfid: product.rfid,
                        product_price: product.productPrice,
                    });
                    setLoading(false);
                } catch (error) {
                    alert('Data Product tidak ada');
                    console.error("Error fetching product detail:", error);
                    setError(error.message);
                    setLoading(false);
                }
            }
        };

        fetchProductDetail();
    }, [productId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDataCart((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
   
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try{
            const {customer_id, rfid, product_price, quantity} = dataCart;
            const response = await addCart({
                variables:{
                    customer_id: parseInt(customer_id, 10),
                    rfid: parseInt(rfid, 10),
                    product_price: parseInt(product_price, 10),
                    quantity: parseInt(quantity, 10),
                },
            })
            alert('Data Cart berhasil ditambahkan');
            console.log('Product added to cart successfully:', response.data);
            navigate("/ ")
            handleClose();
            window.location.reload();
        }catch(error){
            console.error('Error adding product to cart:', error);
            setError(error.message);
        }
    };

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
            <form onSubmit={handleFormSubmit}>
            <Typography id="modal-modal-title" variant="h5" component="h1" sx={{ mt: 1 }}>
                Add Product
            </Typography>
            <TextField
                fullWidth
                margin="normal"
                label="Customer ID"
                name="customer_id"
                value={dataCart.customer_id}
                onChange={handleInputChange}
                disabled
                sx={{ mt: 2, mb: 2 }}
            />
            <TextField
                fullWidth
                margin="normal"
                label="Product ID"
                name="rfid"
                value={dataCart.rfid}
                onChange={handleInputChange}
                disabled
                sx={{ mb: 2 }}
            />
            <TextField
                fullWidth
                margin="normal"
                label="Product Price"
                name="product_price"
                value={dataCart.product_price}
                onChange={handleInputChange}
                disabled
                sx={{ mb: 2 }}
            />
             <TextField
                fullWidth
                margin="normal"
                label="Quantity"
                name="quantity"
                value={dataCart.quantity}
                onChange={handleInputChange}
                type="number"
                sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Add to Cart
            </Button>
            </form>
        </Box>
        </Modal>
    );
}

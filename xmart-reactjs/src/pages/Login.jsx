import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import QrScannerComponent from '../components/QrScannerComponent';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.tujuhsembilan.com/">
        Padepokan 79
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignIn() {
  const [qrResult, setQrResult] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
      qrResult,
    });
  };

  const handleScan = async (result) => {
    try {
      setQrResult(result);
      const parsedData = JSON.parse(result.data);
      console.log('QR Code Result:', result);
      console.log('QR Code Parsed Data:', parsedData);

      const response = await axios.post('http://localhost:8080/customers/login', parsedData);
      console.log('Login Response:', response.data);

       if (response.data.customerWallet !== undefined) {
        localStorage.setItem('customerData', JSON.stringify(response.data));
        alert(`Login berhasil! Selamat Datang, ${response.data.customerName}`);
        navigate('/'); 
      } else {
        alert('Data tidak valid.'); 
      }
    } catch (error) {
      console.error('Error parsing QR code or sending data to API:', error);
      alert('Terjadi kesalahan saat memproses QR code atau mengirim data ke API.');
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold' }}>
            XMART ONLINE SHOP
          </Typography>
          <Typography component="h2" variant="h6" sx={{ mt: 1, mb: 3, color: 'text.secondary' }}>
            Buy anything you want
          </Typography>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <QrScannerComponent onScan={handleScan} />
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

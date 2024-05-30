// ListCustomer.jsx
import { Box, Typography } from "@mui/material";
import Footer from "../components/Footer";
import TabsTransaction from "../components/TabsTransaction";

export default function Transactions() {
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
          { fontWeight: 'bold', mt: '5vh', mb:'2vh', alignSelf: 'flex-start'  }
          }>Data Transactions</Typography>
        <TabsTransaction/>
      </Box>
      <Footer />
    </>
  );
}

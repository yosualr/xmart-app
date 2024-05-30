import ReactDOM from 'react-dom';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './ApolloClient';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Layout from './layout/Layout';
import ListCustomers from './pages/ListCustomers';
import Transactions from './pages/Transactions';
import ListProducts from './pages/ListProducts';
import Checkout from './pages/Checkout';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<ProtectedRoutes />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

function ProtectedRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/list-products" element={<ListProducts />} />
        <Route path="/list-customers" element={<ListCustomers />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path='/checkout' element={<Checkout/> } />
      </Routes>
    </Layout>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
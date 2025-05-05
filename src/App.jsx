import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import SaleEntry from './pages/SaleEntry';
import ManageProducts from './pages/ManageProducts';

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/sale-entry" element={<SaleEntry />} />
            <Route path="/manage-products" element={<ManageProducts />} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
}
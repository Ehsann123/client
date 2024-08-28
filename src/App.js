import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/login';
import ProductList from './components/productList';
import ProductForm from './components/productForm';
import ProductSearch from './components/productSearch';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-product" element={<ProductForm />} />
          <Route path="/edit-product/:id" element={<ProductForm />} />
          <Route path="/search" element={<ProductSearch />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
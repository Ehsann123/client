import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, TextField, Button } from '@material-ui/core';

function ProductForm() {
  const [product, setProduct] = useState({ name: '', description: '', price: '', category: '' });
  const [image, setImage] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(product).forEach(key => formData.append(key, product[key]));
    if (image) formData.append('image', image);

    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/products/${id}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/products', formData);
      }
      navigate.push('/');
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        {id ? 'Edit Product' : 'Add Product'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          name="name"
          label="Product Name"
          value={product.name}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          name="description"
          label="Description"
          multiline
          rows={4}
          value={product.description}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          name="price"
          label="Price"
          type="number"
          value={product.price}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          name="category"
          label="Category"
          value={product.category}
          onChange={handleChange}
        />
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="raised-button-file"
          type="file"
          onChange={handleImageChange}
        />
        <label htmlFor="raised-button-file">
          <Button variant="contained" component="span">
            Upload Image
          </Button>
        </label>
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
          Save Product
        </Button>
      </form>
    </Container>
  );
}

export default ProductForm;
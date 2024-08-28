import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Grid, Card, CardContent, CardActions, Button } from '@material-ui/core';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {product.name}
                </Typography>
                <Typography color="textSecondary">
                  ${product.price}
                </Typography>
                <Typography variant="body2" component="p">
                  {product.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" component={Link} to={`/edit-product/${product._id}`}>
                  Edit
                </Button>
                <Button size="small" onClick={() => handleDelete(product._id)}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ProductList;
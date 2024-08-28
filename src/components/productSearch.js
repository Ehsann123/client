import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Grid, Card, CardContent, CardActions } from '@material-ui/core';

function ProductSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/api/products?search=${searchTerm}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Search Products
      </Typography>
      <form onSubmit={handleSearch}>
        <TextField
          fullWidth
          margin="normal"
          label="Search products"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Search
        </Button>
      </form>
      <Grid container spacing={3} style={{ marginTop: '20px' }}>
        {searchResults.map((product) => (
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
                <Button size="small" href={`/edit-product/${product._id}`}>
                  Edit
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ProductSearch;
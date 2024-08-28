import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          E-commerce App
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Products
        </Button>
        <Button color="inherit" component={Link} to="/add-product">
          Add Product
        </Button>
        <Button color="inherit" component={Link} to="/search">
          Search
        </Button>
        <Button color="inherit" component={Link} to="/login">
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
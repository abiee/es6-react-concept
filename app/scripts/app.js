import React from 'react';
import ProductData from './ProductData';
import CartAPI from './utils/CartAPI';
import FluxCartApp from './components/FluxCartApp';

// Load mock product data into localStorage
ProductData.init();

// Load mock API call
CartAPI.getProductData();

React.render(
  React.createElement(FluxCartApp, null),
  document.getElementById('main')
);

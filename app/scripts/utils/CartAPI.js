import FluxCartActions from '../actions/FluxCartActions';

export default {
  getProductData: () => {
    'use strict';
    var data = JSON.parse(localStorage.getItem('product'));
    FluxCartActions.receiveProduct(data);
  }
};

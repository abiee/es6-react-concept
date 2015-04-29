import React from 'react';
import CartStore from '../stores/CartStore';
import ProductStore from '../stores/ProductStore';
import FluxProduct from './FluxProduct';
import FluxCart from './FluxCart';

// Method to retrive state from stores
function getCartState() {
  'use strict';

  return {
    product: ProductStore.getProduct(),
    selectedProduct: ProductStore.getSelected(),
    cartItems: CartStore.getCartItems(),
    cartCount: CartStore.getCartCount(),
    cartTotal: CartStore.getCartTotal(),
    cartVisible: CartStore.getCartVisible()
  };
}

// Define main controller view
var FluxCartApp = React.createClass({
  // Set initial state from stores
  getInitialState: function() {
    'use strict';

    return getCartState();
  },

  // Add change listeners to stores
  componentDidMount: function() {
    'use strict';

    ProductStore.addChangeListener(this._onChange);
    CartStore.addChangeListener(this._onChange);
  },

  // Remove change lsteners to stores
  componentWillUnmount: function() {
    'use strict';

    ProductStore.removeChangeListener(this._onChange);
    CartStore.removeChangeListener(this._onChange);
  },

  // Render our child components, passing state via props
  render: function() {
    'use strict';

    return (
      <div className="flux-cart-app">
        <FluxCart products={this.state.cartItems} count={this.state.cartCount} total={this.state.cartTotal} visible={this.state.cartVisible} />
        <FluxProduct product={this.state.product} cartitems={this.state.cartItems} selected={this.state.selectedProduct} />
      </div>
    );
  },

  // Method to setState baed upon Store changes
  _onChange: function() {
    this.setState(getCartState());
  }
});

export default FluxCartApp;

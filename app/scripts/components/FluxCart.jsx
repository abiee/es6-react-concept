import React from 'react';
import FluxCartActions from '../actions/FluxCartActions';

// Flux cart view
var FluxCart = React.createClass({
  closeCart: function() {
    'use strict';
    FluxCartActions.updateCartVisible(false);
  },

  openCart: function() {
    'use strict';
    FluxCartActions.updateCartVisible(true);
  },

  removeFromCart: function(sku) {
    'use strict';
    FluxCartActions.removeFromCart(sku);
    FluxCartActions.updateCartVisible(false);
  },

  render: function() {
    'use strict';

    var products = this.props.products;

    return (
      <div className={"flux-cart " + (this.props.visible ? 'active' : '')}>
        <div className="mini-cart">
          <button className="close-cart" onClick={this.closeCart}>x</button>
          <ul>
            {Object.keys(products).map((product) => {
              return (
                <li key={product}>
                  <h1 className="name">{products[product].name}</h1>
                  <p className="type">{products[product].type} x {products[product].quantity}</p>
                  <p className="price">${(products[product].price * products[product].quantity).toFixed(2)}</p>
                  <button className="remove-item" type="button" onClick={this.removeFromCart.bind(this, product)}>Remove</button>
                </li>
              )
            })}
          </ul>
          <span className="total">Total: ${this.props.total}</span>
        </div>
        <button className="view-cart" type="button" onClick={this.openCart} disabled={Object.keys(this.props.products).length > 0 ? "" : "disabled"}>View cart ({this.props.count})</button>
      </div>
    );
  }
});

export default FluxCart;

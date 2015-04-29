import React from 'react';
import FluxCartActions from '../actions/FluxCartActions';

var FluxProduct = React.createClass({
  selectVariant: function(event) {
    'use strict';
    FluxCartActions.selectProduct(event.target.value);
  },

  addToCart: function() {
    'use strict';
    var sku = this.props.selected.sku;
    var update = {
      name: this.props.product.name,
      type: this.props.selected.type,
      price: this.props.selected.price
    };

    FluxCartActions.addToCart(sku, update);
    FluxCartActions.updateCartVisible(true);
  },

  render: function() {
    'use strict';
    var ats = (this.props.selected.sku in this.props.cartitems) ?
      this.props.selected.inventory - this.props.cartitems[this.props.selected.sku].quantity :
      this.props.selected.inventory;

    return (
      <div className="flux-product">
        <img src={'images/' + this.props.product.image} />
        <div className="flux-product-detail">
          <h1 className="name">{this.props.product.name}</h1>
          <p className="description">{this.props.product.description}</p>
          <p className="price">{this.props.selected.price}</p>
          <select onChange={this.selectVariant}>
            {this.props.product.variants.map(function(variant, index) {
              return (
                <option key={index} value={index}>{variant.type}</option>
              );
            })}
          </select>
          <button type="button" className="btn btn-primary" onClick={this.addToCart} disabled={ats > 0 ? '': 'disbaled'}>
            {ats > 0 ? 'Add to cart' : 'Sold out'}
          </button>
        </div>
      </div>
    );
  }
});

export default FluxProduct;

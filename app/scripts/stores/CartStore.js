import events from 'events';
import _ from 'lodash';
import AppDispatcher from '../dispatcher/AppDispatcher';
import FluxCartConstants from '../constants/FluxCartConstants';

// Define initial data points
var _products = {};
var _cartVisible = false;


// Add product to cart
function add(sku, update) {
  'use strict';

  update.quantity = sku in _products ? _products[sku].quantity + 1: 1;
  _products[sku] = _.extend({}, _products[sku], update);
}

// Set cart visibility
function setCartVisible(cartVisible) {
  'use strict';
  _cartVisible = cartVisible;
}

// Remove item from cart
function removeItem(sku) {
  'use strict';
  delete _products[sku];
}

class CartStore extends events.EventEmitter {
  // Return cart items
  getCartItems() {
    return _products;
  }

  // Return # of items in cart
  getCartCount() {
    return Object.keys(_products).length;
  }

  // Return cart cost total
  getCartTotal() {
    var total = 0;

    for(let product in _products) {
      if(_products.hasOwnProperty(product)) {
        total += _products[product].price * _products[product].quantity;
      }
    }

    return total.toFixed(2);
  }

  // Return cart visibility state
  getCartVisible() {
    return _cartVisible;
  }

  // Emit change event
  emitChange() {
    this.emit('change');
  }

  // Add change listener
  addChangeListener(callback) {
    this.on('change', callback);
  }

  // Remove change listener
  removeChangeListener(callback) {
    this.removeListener('change', callback);
  }
}

var store = new CartStore();

// Register callback with AppDispatcher
AppDispatcher.register((payload) => {
  'use strict';

  var action = payload.action;

  switch(action.actionType) {
    // Respond to CART_ADD action
    case FluxCartConstants.CART_ADD:
      add(action.sku, action.update);
      break;

    // Respond to CART_VISIBLE action
    case FluxCartConstants.CART_VISIBLE:
      setCartVisible(action.cartVisible);
      break;

    // Respond to CART_REMOVE action
    case FluxCartConstants.CART_REMOVE:
      removeItem(action.sku);
      break;

    default:
      return true;
  }

  // If action was responded to, emit change event
  store.emitChange();
  return true;
});

export default store;

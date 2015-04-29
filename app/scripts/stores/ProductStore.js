import events from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';
import FluxCartConstants from '../constants/FluxCartConstants';

// Define initial data points
var _product = {};
var _selected = null;

// Method to load product data from mock API
function loadProductData(data) {
  'use strict';
  _product = data[0];
  _selected = data[0].variants[0];
}

// Method to set the currently selected product variation
function setSelected(index) {
  'use strict';
  _selected = _product.variants[index];
}

class ProductStore extends events.EventEmitter {
  // Return product data
  getProduct() {
    return _product;
  }

  // Return selected Product
  getSelected() {
    return _selected;
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

var store = new ProductStore();

AppDispatcher.register((payload) => {
  'use strict';

  var action = payload.action;

  switch(action.actionType) {
    // Respond to RECEIVE_DATA action
    case FluxCartConstants.RECEIVE_DATA:
      loadProductData(action.data);
      break;

    // Respond to SELECT_PRODUCT action
    case FluxCartConstants.SELECT_PRODUCT:
      setSelected(action.data);
      break;

    default:
      return true;
  }

  // If action was responded to, emit change event
  store.emitChange();
  return true;
});

export default store;

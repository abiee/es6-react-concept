import keyMirror from 'react/lib/keyMirror';

// Define action constants
var FluxCartActions = keyMirror({
  CART_ADD: null,     // Adds item to cart
  CART_REMOVE: null,  // Remove item from cart
  CART_VISIBLE: null, // Shows or hides the cart
  SELECT_PRODUCT: null, // Selects a product option
  RECEIVE_DATA: null  // Lands our mock data
});

export default FluxCartActions;

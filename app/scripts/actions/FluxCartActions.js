import AppDispatcher from '../dispatcher/AppDispatcher';
import FluxCartConstants from '../constants/FluxCartConstants';

// Define actions object
var FluxCartActions = {
  // Receive initial product dat
  receiveProduct: (data) => {
    'use strict';

    AppDispatcher.handleAction({
      actionType: FluxCartConstants.RECEIVE_DATA,
      data: data
    });
  },

  // Set currently selected product variant
  selectProduct: (index) => {
    'use strict';

    AppDispatcher.handleAction({
      actionType: FluxCartConstants.SELECT_PRODUCT,
      data: index
    });
  },

  // Add item to cart
  addToCart: (sku, update) => {
    'use strict';

    AppDispatcher.handleAction({
      actionType: FluxCartConstants.CART_ADD,
      sku: sku,
      update: update
    });
  },

  // Remove item from cart
  removeFromCart: (sku) => {
    'use strict';

    AppDispatcher.handleAction({
      actionType: FluxCartConstants.CART_REMOVE,
      sku: sku
    });
  },

  // Update cart visibility status
  updateCartVisible: (cartVisible) => {
    'use strict';

    AppDispatcher.handleAction({
      actionType: FluxCartConstants.CART_VISIBLE,
      cartVisible: cartVisible
    });
  }
};


export default FluxCartActions;

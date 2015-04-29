import flux from 'flux';

// Create dispatcher instance
var AppDispatcher = new flux.Dispatcher();

// Convenience method to handle dispatch requests
AppDispatcher.handleAction = function(action) {
  'use strict';

  this.dispatch({
    source: 'VIEW_ACTION',
    action: action
  });
};

export default AppDispatcher;

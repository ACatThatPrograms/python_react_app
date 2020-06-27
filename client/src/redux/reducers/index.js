import { combineReducers } from 'redux';

/* Import Action Types */
import {
  UPDATE_CLIENT
} from '../constants/index.js'


// Initial Recuder State Object
export const initialState = {
  client: {
    'loggedIn' : false,
    'username' : "",
    'email'    : "",
  }
}

////////////////////////
/* Setup Root Reducer */
////////////////////////

export default combineReducers({
  clientReducer
})

////////////////////////
/*   Setup Reducers   */
////////////////////////

// Handles all UX/UI state
function clientReducer(state = initialState.client, action) {

  switch (action.type) {

      case UPDATE_CLIENT:
        return Object.assign( {}, state, {
          'loggedIn' : checkVar(action.payload.loggedIn , state.loggedIn),
          'username' : checkVar(action.payload.username , state.username),
          'email'    : checkVar(action.payload.email    , state.email),
        })

      default:
        return state
  }

}

//////////////////////
// VAR Check Helper // -- Elliminate issues with checking bool changes
//////////////////////
const checkVar = (updateTo, fallback) => {
  if (typeof updateTo !== 'undefined' ) { return updateTo; }
  else if ( typeof updateTo === 'undefined' ) { return fallback; }
  else {
    throw new Error("Redux Var-Checking Failure! Verify that preferred and fallback are being set as argument for checkVar()\nArguments:", updateTo, fallback)
  }
}

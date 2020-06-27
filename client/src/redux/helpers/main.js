/* Helper for connect() */

/* Available Actions(dispatches) */
import {
  updateClient
} from '../actions/index.js';

// Map all three REDUX state types to props
export const mapAllStatesToProps = state => {
  return {
    state_client  : state.clientReducer
   }
}

// Map all available actions (Dispatches) to props
export const mapAllDispatchesToProps = (dispatch) => {
  return {
    dispatch_updateClient  : client  => dispatch(updateClient(client))
  }
}

//////////////////////////
// User Profile Helpers // -- Helpers for login/logout
//////////////////////////
export const updateUserProfile = (props, res) => {
  // On any server error for profile data, force logout
  if (res.data.err) {
    clearUserProfile(props)
    return
  }

  props.dispatch_updateClient({
    "loggedIn": true,
    "username": res.data.account.username,
    "email"   : res.data.account.email,
  })

}

export const clearUserProfile = (props) => {
  props.dispatch_updateClient({
    "loggedIn": false,
    "username": "",
    "email"   : "",
  })
}

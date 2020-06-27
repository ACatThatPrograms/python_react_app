// React && Core Dependencies
import React from 'react';
import { mapAllStatesToProps, mapAllDispatchesToProps } from 'redux/helpers/main.js';
import { connect } from "react-redux";
import { Link, withRouter } from 'react-router-dom';

// Local Styling
// import localstyle from './Navigation.module.scss';

const Navigation = (props) => {

  return (
    <div className={""}>
      <Link to='/'>Lander</Link>
      <Link to='/profile'>Profile</Link>
    </div>
  )

}


export default connect(mapAllStatesToProps, mapAllDispatchesToProps)(withRouter(Navigation))

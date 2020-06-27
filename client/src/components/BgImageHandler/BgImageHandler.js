import React from 'react';
import { withRouter } from 'react-router-dom';
import lstyle from './BgImageHandler.module.scss';

// Images
import Drop from 'images/drop.jpg';

/* Return an absolute positioned background div with corresponding image per location */
function BgImageHandler(props) {

  let imgClass = ( () => {
    switch (props.match.path) {
      case "/" : return lstyle.drop;
      default  : return lstyle.none;
    }
  })()

  // Return Image if source is available
  return (
    <div className={lstyle.img + " " + imgClass}/>
  )

}

export default withRouter(BgImageHandler)

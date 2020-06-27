// React && Core Dependencies
import React, { useState } from 'react';
import { mapAllStatesToProps, mapAllDispatchesToProps } from 'redux/helpers/main.js';
import { connect } from "react-redux";
// Api
import Api from 'api/api'
// Semantic-UI
import { Container, Menu } from 'semantic-ui-react'

function Profile(props) {

  const [activeItem, setActive] = useState("My Profile");

  return (
    <Container>

      <Menu pointing secondary>

        <Menu.Item
          name="My Profile"
          active={activeItem === "My Profile"}
          onClick={ () => setActive("My Profile") }
        />

        <Menu.Item
          name="Curriculum"
          active={activeItem === "Curriculum"}
          onClick={ () => setActive("Curriculum") }
        />

        <Menu.Menu position="right">

            <Menu.Item
              name="Logout"
              active={activeItem === "Logout"}
              onClick={ () => Api.logout(props) }
            />

        </Menu.Menu>

      </Menu>

    </Container>
  )

}

export default connect(mapAllStatesToProps, mapAllDispatchesToProps)(Profile)

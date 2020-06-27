// React && Core Dependencies
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { mapAllStatesToProps, mapAllDispatchesToProps } from 'redux/helpers/main.js';
import { connect } from "react-redux";
// Api
import Api from 'api/api'
// Semantic-UI-Compoents
import { Grid, Header, Form, Segment,  Button } from 'semantic-ui-react'
// Local Styling
import lstyle from './Lander.module.scss';
// Validator
import validator from 'validator';

function Lander(props) {

  const [registration, setRegistration] = useState(false); // Show registration panel?
  const [loginErr, setLoginErr]         = useState("");
  const [registerErr, setRegisterErr]   = useState("");
  const [loading, setLoading]           = useState(false);

  async function login() {
    let usernameOrEmail = document.getElementById("form_username").value;
    let password        = document.getElementById("form_password").value;
    if (!verifyLogin(usernameOrEmail, password)) { return };
    // setLoading(true);
    let loggedIn        = await Api.login(props, usernameOrEmail, password);
    if (loggedIn.data.err) {
      setLoginErr(loggedIn.data.errMsg)
    }
  }

  async function register() {
    let username        = document.getElementById("form_register_username").value;
    let email           = document.getElementById("form_register_email").value;
    let password        = document.getElementById("form_register_password").value;
    if (!verifyRegister(username, email, password)) { return };
    setLoading(true);
    let registered      = await Api.register(username, email, password);
    if (registered.data.err) {
      setRegisterErr(registered.data.errMsg)
    }
    setLoading(false);
  }

  function switchToLogin() {
    setRegistration(false);
    setLoginErr("")
  }

  function switchToRegister() {
    setRegistration(true);
    setRegisterErr("")
  }

  function verifyRegister(username, email, password) {
    if ( username.length < 3 || username.length > 32 ) { setRegisterErr("Username must be between 3-32 characters"); return false; }
    if ( !validator.isEmail(email) )                   { setRegisterErr("Please enter a valid e-mail address."); return false;  }
    if ( password.length < 8 || password.length > 64 ) { setRegisterErr("Passwords must be between 8-64 characters."); return false; }
    return true
  }

  function verifyLogin(username, password) {
    if ( username.length < 3 || username.length > 32 ) { setLoginErr("Username/Email must be between 3-32 characters"); return false; }
    if ( password.length < 8 || password.length > 64 ) { setLoginErr("Passwords must be between 8-64 characters."); return false; }
    return true
  }

  function renderResponseSegment(errToShow) {
    return loginErr ? (
      <Segment placeholder className={lstyle["err-segment"]}>
        {errToShow}
      </Segment>
    ) : (
      <Segment placeholder className={lstyle["err-segment"]}>
        {errToShow}
      </Segment>
    )
  }

  function renderForm() {
    if (registration) {
      return (
        <Form size="large">
          <Segment>

            <Form.Input id="form_register_username" fluid icon="user" iconPosition="left" placeholder="Desired Username" />
            <Form.Input id="form_register_email"    fluid icon="mail" iconPosition="left" placeholder="Email" />
            <Form.Input id="form_register_password" fluid icon="lock" iconPosition="left" placeholder="Password ( > 8 characters, please!)" type="password"/>

            <Grid columns={2} className={lstyle.formBox}>
              <Grid.Column>
                <Button loading={loading} color="teal" fluid size="large" onClick={register}> {`Register`} </Button>
              </Grid.Column>
              <Grid.Column>
                <Button color="teal" fluid size="large" onClick={switchToLogin}> {`Back`} </Button>
              </Grid.Column>
            </Grid>

            {renderResponseSegment(registerErr)}

          </Segment>
        </Form>
      )
    }
    else {
      return (
        <Form size="large">
          <Segment>

            <Form.Input id="form_username" fluid icon="user" iconPosition="left" placeholder="Username/Email" />
            <Form.Input id="form_password" fluid icon="lock" iconPosition="left" placeholder="Password" type="password"/>

            <Grid columns={2} className={lstyle.formBox}>
              <Grid.Column>
                <Button type="submit" loading={loading} color="teal" fluid size="large" onClick={login}> {`Login`} </Button>
              </Grid.Column>
              <Grid.Column>
                <Button color="teal" fluid size="large" onClick={switchToRegister}> {`Register`} </Button>
              </Grid.Column>
            </Grid>

            {renderResponseSegment(loginErr)}

          </Segment>
        </Form>
      )
    }
  }

  /////////////////
  //   REDIR     //
  /////////////////
  if (props.state_client.loggedIn) {
    return <Redirect to='/profile'/>
  }

  /////////////////
  // MAIN RETURN //
  /////////////////

  return (
    <Grid container columns={1} textAlign="center" verticalAlign="middle" className="grid-container">
      <Grid.Column style={{"maxWidth":600}}>
        <Segment>
          <Header as="h2" textAlign="left" className="color-dark-blue">
            {`Your journey begins today`}
            <Header.Subheader>
              {`Take hold of your body and mind`}
            </Header.Subheader>
          </Header>
        </Segment>

        {renderForm()}

      </Grid.Column>
    </Grid>
  )

}

export default connect(mapAllStatesToProps, mapAllDispatchesToProps)(Lander)

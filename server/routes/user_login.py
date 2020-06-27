import database.db as db
from flask import jsonify
import session.sessionHelper as sessionHelper
from util.pw import saltAndHash, verifyHashedPassword

def res(body, session):

    ## Verify Body
    if (not "usernameOrEmail" in body
            or not "password" in body):
        return jsonify(error= "Invalid request")

    ## Verify session doesn't exist, if it does assume logged in
    if ("username" in session):
        return jsonify(err="ALREADY_LOGGED_IN", errMsg="You are already logged in")

    ## Values
    usernameOrEmail = body["usernameOrEmail"]
    password        = body["password"]

    ## Verify account exists
    account = db.account_fetchFromUsernameOrEmail(usernameOrEmail)

    if not account:
        return jsonify(err="ACCOUNT_LOGIN_ERR", errMsg="Username or password invalid")

    ## If account exists verify password hash
    correctPassword = verifyHashedPassword(account.username, password, account.password_h)

    if not correctPassword:
        return jsonify(err="ACCOUNT_LOGIN_ERR", errMsg="Username or password invalid")

    ## If all goes well, seet session to logged in and return OK
    sessionHelper.setup(session, account)

    return sessionHelper.userDataReturn(session, account)

import database.db as db
from flask import jsonify
from util.pw import saltAndHash

def res(body):
    ## Verify Body
    if (not "username" in body
            or not "email" in body
            or not "password" in body):
        return jsonify(error= "Invalid request")


    email    = body["email"]
    password = body["password"]
    username = body["username"]

    ## Check if account exists :: E-mail || Username being used?
    emailExists, usernameExists = db.account_checkIfExists(body["username"], body["email"])

    if (emailExists):
        return jsonify(err="EMAIL_TAKEN", errMsg="This email is already in use.")

    if (usernameExists):
        return jsonify(err="USERNAME_TAKEN", errMsg="This username is already in use.")

    ## Verify Password Length is at least 8 character
    if (len(password) <= 7):
        return jsonify(err="PASSWORD_TOO_SHORT", errMsg="Password must be atleast 8 characters.")

    ## Salt && Hash Password
    pass_hash = saltAndHash(username, password)

    ## Create new DB Entry
    db.account_createNewAccount(username, email, pass_hash)

    return jsonify(error=False, success=True)

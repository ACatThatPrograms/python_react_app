from flask import jsonify

## setup() is called on login, while clear() is called on logout
## Use to setup session data without touching routes

def setup(session, account):
  session["email"]     = account.email
  session["username"]  = account.username

def clearSession(session):
    session.pop("email", None)
    session.pop("username", None)

## Construct user data return for login and get-account
def userDataReturn(session, account):
    ## Account not used yet . . .
    return jsonify(error=False, success=True, account={
        "username":session["username"],
        "email": session["email"]
    })

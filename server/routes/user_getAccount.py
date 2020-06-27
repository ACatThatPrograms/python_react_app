import database.db as db
from flask import jsonify
import session.sessionHelper as sessionHelper

def res(session):

    ## Get Account
    account = db.account_fetchFromUsernameOrEmail(session["username"])

    if not account:
        return jsonify(err="SESSION_ERR", errMsg="Session Validation Error")

    ## All ok? Return account data
    return sessionHelper.userDataReturn(session, account)

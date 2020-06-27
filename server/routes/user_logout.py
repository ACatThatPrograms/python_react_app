from flask import jsonify
import session.sessionHelper as sessionHelper

def res(session):
    if "username" not in session:
        return jsonify(err="ALREADY_LOGGED_OUT", errMsg="You are already logged out!")
    else:
        sessionHelper.clearSession(session)
        return jsonify(error=False, success=True)

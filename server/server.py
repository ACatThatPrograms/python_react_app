from flask import Flask, request, session, jsonify
import routes.index as routes

################
##   Setup    ##
################

app = Flask(__name__)
app.config.from_object('config')

################
## Assist Fx  ##
################
def _isLoggedIn(session, routeRes):
    NO_SESSION_MSG = jsonify(err="NOT_LOGGED_IN", errMsg="API Authentication Error.")
    if "username" in session:
         return routeRes(session)
    else:
        return NO_SESSION_MSG

################
## API Routes ##
################

@app.route("/")
def root():
    return routes.root.res()

@app.route("/login", methods=['POST'])
def login():
    return routes.login.res(request.json, session)

@app.route("/logout", methods=['GET'])
def logout():
    return routes.logout.res(session)

@app.route("/register", methods=['POST'])
def register():
    return routes.register.res(request.json)

## Require Login
@app.route("/get-account", methods=['GET'])
def getAccount():
    return _isLoggedIn(session, routes.getAccount.res)

################
##  MAIN RUN  ##
################

if __name__ == "__main__":
    app.run(debug=True)

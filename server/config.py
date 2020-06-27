import redis

##########################
## Server Configuration ## -- Treat as Private
##########################

## General
_secretKey        = "GENKEY" # Generate using dev/herlpers/genKey.py
_flaskApp         = "app"
_flaskEnv         = "development"

## SQL Configuration
_sqlServerType    = "postgres"
_sqlServerPort    = "5432"
_sqlServerUrl     = "localhost"
_sqlDatabaseName  = "hw_db"
_sqlUser          = "hw_db_user"
_sqlPassword      = "hw_db_pass"

## Flask Session Configuration
_redisUrl         = "redis://localhost:6379"
_sessionType      = redis
_sessionRedis     = redis.from_url(_redisUrl)

#########################
##   Assisting Fx()s   ##
#########################

def _buildDbString(serverType, user, password, url, port, dbName):
    return "{}://{}:{}@{}:{}/{}".format(serverType, user, password, url, port, dbName)

#########################
##   Config Exports    ## -- "Public"
#########################

## General
SECRET_KEY    = _secretKey
FLASK_APP     = _flaskApp
FLASK_ENV     = _flaskEnv

## Session
SESSION_TYPE  = _sessionType
SESSION_REDIS = _sessionRedis

## SQL / Database
DB_STRING     = _buildDbString(_sqlServerType, _sqlUser, _sqlPassword, _sqlServerUrl, _sqlServerPort, _sqlDatabaseName)

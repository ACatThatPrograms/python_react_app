## Sql Alchemy
from sqlalchemy import create_engine
from sqlalchemy import Column, String, BigInteger
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
## Local/Other
import config
import uuid
## Queries
from database.queries.account_createNewAccount         import query as query_createNewAccount
from database.queries.account_usernameFromUuid         import query as query_usernameFromUuid
from database.queries.account_uuidFromUsername         import query as query_uuidFromUsername
from database.queries.account_checkIfExists            import query as query_checkIfExists
from database.queries.account_fetchFromUsernameOrEmail import query as query_fetchFromUsernameOrEmail

###########################
##      DB ENGINE        ##
###########################
db = create_engine(config.DB_STRING)
base = declarative_base()

###########################
##        Tables         ##
###########################
class Account(base):
    __tablename__ = 'accounts'

    id         = Column(BigInteger, primary_key=True)
    uuid       = Column(UUID(as_uuid=True), default=uuid.uuid4, unique=True, nullable=False)
    username   = Column(String, nullable=False)
    email      = Column(String, nullable=False)
    password_h = Column(String, nullable=False)

#########################
##     DB Session      ##
#########################
Session = sessionmaker(db)
session = Session()

## -- Create TABLES if not exist. . .
base.metadata.create_all(db)

#########################
##     DB Fx()s        ##
#########################

## Account Functions

def _account_createNewAccount(username, email, password):
    return query_createNewAccount(session, Account, username, email, password)

def _account_usernameFromUuid(uuid):
    return query_usernameFromUuid(session, Account, uuid)

def _account_uuidFromUsername(username):
    return query_uuidFromUsername(session, Account, username)

def _account_checkIfExists(username, email):
    return query_checkIfExists(session, Account, username, email)

def _account_fetchFromUsernameOrEmail(usernameOrEmail):
    return query_fetchFromUsernameOrEmail(session, Account, usernameOrEmail)

#########################
##     Fx Exports      ##
#########################

## Account Table Queries
account_createNewAccount         = _account_createNewAccount
account_usernameFromUuid         = _account_usernameFromUuid
account_uuidFromUsername         = _account_uuidFromUsername
account_checkIfExists            = _account_checkIfExists
account_fetchFromUsernameOrEmail = _account_fetchFromUsernameOrEmail

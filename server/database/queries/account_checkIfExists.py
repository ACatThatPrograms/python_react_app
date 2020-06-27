# Returns tuple of two bools for username and email existing respectively in 0 and 1
def query(session, Account, username, email):
    accounts = session.query(Account).filter( (Account.username == username) | (Account.email == email ) ).all()

    emailExists    = False
    usernameExists = False

    for account in accounts:
        if account.email == email:
            emailExists = True
        if account.username == username:
            usernameExists = True

    return emailExists, usernameExists

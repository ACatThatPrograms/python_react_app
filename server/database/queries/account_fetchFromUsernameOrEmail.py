# Returns account data by username or email
def query(session, Account, usernameOrEmail):
    accounts = session.query(Account).filter( (Account.username == usernameOrEmail) | (Account.email == usernameOrEmail ) ).all()

    for account in accounts:
        if account.email == usernameOrEmail:
            return account
        if account.username == usernameOrEmail:
            return account

    return False

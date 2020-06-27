def query(session, Account, username, email, password_h):

    ## Create User
    new_user = Account(
        username=username,
        email=email,
        password_h=password_h
    )

    ## Add user to db
    session.add(new_user)
    session.commit()

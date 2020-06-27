from hashlib import sha256

def _saltPassword(username, password):
    ## Convert username to binary
    binStr = ''.join(format(ord(i), 'b') for i in username)
    ## Reverse binary string
    revBinStr = binStr[::-1]
    ## Pad to at least 32 bytes by repeating non-reverse binary sequence until padding complete
    i = 0
    while int(len(revBinStr) < 32):
        revBinStr += binStr[i]
        if i < len(revBinStr):
            i+= 1
        else:
            i = 0
    ## Split binary string From the center and wrap password before hashing
    firstHalf  = revBinStr[0:int(len(revBinStr)/2)]
    secondHalf = revBinStr[int(len(revBinStr)/2):int(len(revBinStr))]
    ## Concat and return
    return (firstHalf + password + secondHalf)

def _hashStr(str):
    return sha256(str.encode('utf8')).hexdigest()

def saltAndHash(username, password):
    return _hashStr(_saltPassword(username, password))

## Send sent username, sent password, and the real password hash of the user to check against
def verifyHashedPassword(sentUsername, sentPassword, realHash):
    sentHash = saltAndHash(sentUsername, sentPassword)
    storedHash = realHash
    return sentHash == storedHash

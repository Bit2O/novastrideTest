const jwt = require('jsonwebtoken')
const crypto = require("crypto")
const SALT_PATTERN = 'randomSaltPattern'

function generateJWT(userObject, duration = '7d') {

    //generate JWT using userObject
    //generate random secret
    const salt = crypto.randomBytes(16).toString("hex")
    const token = jwt.sign(userObject, salt, { expiresIn: duration })
    return `${token}${SALT_PATTERN}${salt}`;
}



function validateJWT(jwtwithsecret) {

    let userObject;

    const token = jwtwithsecret.split(process.env.SALT_PATTERN)[0]
    const salt = jwtwithsecret.split(process.env.SALT_PATTERN)[1]

    try {
        userObject = jwt.verify(token, salt);
    } catch (err) {
        throw new TokenException(err)
    }

    return userObject;
}

module.exports = {
    generateJWT: generateJWT,
    validateJWT: validateJWT
}
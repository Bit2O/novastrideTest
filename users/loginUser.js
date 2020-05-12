const Table = require("../Helpers/Table.class")
const userTable = new Table('users')
const passwordHash = require("password-hash")
const jwt = require("../Helpers/accessToken")

const loginUser = async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    // getting user from user table
    let response = await userTable.find('email', email)

    // verfiy user password here
    const passwordVerified = passwordHash.verify(password, response.rows[0].password)

    if(passwordVerified) {
        const generatedJwt = jwt.generateJWT(response.rows[0])
        res.send({msg: 'login successful', user: response.rows[0], jwt: generatedJwt}).status(200)
    } else res.send({ msg: 'login failed', error: true }).status(400)
}

module.exports = loginUser
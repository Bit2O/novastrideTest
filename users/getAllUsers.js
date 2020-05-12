const Table = require("../Helpers/Table.class")
const userTable = new Table('users')

const getAllUsers = async (req, res) => {
    // check whether user is allowed to view
    const userscopes = req.user.scope.split(',')
    if(userscopes.includes('view')){
        // getting user from user table
        let response = await userTable.findall()
        if(response.rows){
            res.send({users: response.rows}).status(200)
        }
    } else res.send({msg: "user not authorized", error: true }).status(400)
}

module.exports = getAllUsers
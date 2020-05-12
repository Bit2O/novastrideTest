const Table = require("../Helpers/Table.class")
const userTable = new Table('users')
const faker = require("faker")
const passwordHash = require("password-hash")

const createUser = async (req, res) => {
    // check whether user is allowed to view
    // console.log("###3 ", req.user)
    const userscopes = req.user.scope.split(',')
    if(userscopes.includes('create')){
        // start forming json here
        const userJson = {
            user_id: faker.random.uuid(),
            email: req.body.email,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone: req.body.phone,
            scope: req.body.scope,
            password: passwordHash.generate(req.body.password)
        }
        let response = await userTable.save(userJson)
        console.log("...", response)
        if(response){
            res.send({msg: "user created"}).status(200)
        }
    } else res.send({msg: "user not authorized", error: true }).status(400)
}

module.exports = createUser
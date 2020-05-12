const Table = require("../Helpers/Table.class")
const productTable = new Table('products')
const productDet = new Table('productDetails')

const getAllProducts = async (req, res) => {
    // check whether user is allowed to view
    const userscopes = req.user.scope.split(',')
    if(userscopes.includes('view')){
        // getting user from user table
        let response = await productTable.findAllJoin('productDetails')
        if(response){
            res.send({response}).status(200)
        }
    } else res.send({msg: "user not authorized", error: true }).status(400)
}

module.exports = getAllProducts
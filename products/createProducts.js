const Table = require("../Helpers/Table.class")
const p = new Table('products')
const p_des = new Table('productDetails')
const faker = require("faker")

const createProducts = async (req, res) => {
    // check whether user is allowed to view
    // console.log("###3 ", req.user)
    const userscopes = req.user.scope.split(',')
    if(userscopes.includes('create')){
        // start forming json here
        const _id = faker.random.uuid();
        const p_json = {
            p_id: _id,
            name: req.body.name,
            img: req.body.img,
            description: req.body.description
        }
        
        const p_des_json = {
            p_id: _id,
            price: req.body.price,
            size: req.body.size
        }
        let response = await p.save(p_json)
        let res2 = await p_des.save(p_des_json)
        console.log("...", response)
        if(response && res2){
            res.send({msg: "product created"}).status(200)
        }
    } else res.send({msg: "user not authorized", error: true }).status(400)
}

module.exports = createProducts
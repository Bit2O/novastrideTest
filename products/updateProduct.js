const Table = require("../Helpers/Table.class")
const p = new Table('products')
const p_des = new Table('productDetails')
const faker = require("faker")

const updateProduct = async (req, res) => {
    // check whether user is allowed to view
    // console.log("###3 ", req.user)
    const productId = req.params.id
    
    if(!productId){
        res.send({error: true, msg: 'please provide product id to be updated'})
    }
    
    const userscopes = req.user.scope.split(',')
    if(userscopes.includes('edit')){
        
        // fetch current product
        let product = await p.find("p_id", productId)
        let productDet = await p_des.find("p_id", productId)
        
        product = product.rows[0]
        productDet = await productDet.rows[0]
        
        for(x in product) {
            product[x] = req.body[x]
        }
        
        for(x in productDet) {
            productDet[x] = req.body[x]
        }

        const res1 = p.update(productId, product)
        const res2 = p_des.update(productId, productDet)
        
        if(res1 && res2){
            res.send({msg: "product edited"}).status(200)
        }
    } else res.send({msg: "user not authorized", error: true }).status(400)
}

module.exports = updateProduct
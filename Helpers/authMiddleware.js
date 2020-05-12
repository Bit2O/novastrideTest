const verifyJwt = require("./accessToken")

const authMiddleware = (req, res, next) => {

    // console.log("####  ", req.headers.authorization.replace("Bearer ", ""))

    if(!req.headers.authorization)
        res.send({ error: true, msg: "please provide jwt with the request"})
    decodedJwt = verifyJwt.validateJWT(req.headers.authorization.replace("Bearer ", ""))
    if(decodedJwt){
        req.user = decodedJwt
        next()
    } else res.send({error: true, msg: "user doesn't have any scope"})
}

module.exports = authMiddleware
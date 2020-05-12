// BASE SETUP
// =============================================================================

// call the local files needed
const loginUser = require("./users/loginUser")

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here

router.route('/login').post(loginUser)

// router.route('/user')
//     .get(getAllUsers)
//     .post(createUser)
// router.route('/user/:id')
//     .get(getUserOnId)
//     .put(updateUser)


// router.route('/products')
//     .get(getAllProducts)
//     .post(createProduct)
// router.route('/products/:id')
//     .get(getProductOnId)
//     .put(updateProduct)

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

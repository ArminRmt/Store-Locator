
let express = require('express');
let router = express.Router();
 
const users = require('../controllers/UserController.js');
const auth = require('../controllers/auth.js')
const authJwt = require("../middleware/authJwt");


// authorization
router.post('/signup', auth.signup);
router.post('/signin', auth.signin);

// user routes 
router.get('/users', [authJwt.verifyToken, authJwt.isAdmin], users.getUsers)               
router.get('/user/:id', [authJwt.verifyToken, authJwt.isAdmin],users.getUserById)        
router.patch('/user/:id',[authJwt.verifyToken, authJwt.isUserOrAdmin], users.updateUser) 
router.delete('/user/:id',[authJwt.verifyToken, authJwt.isUserOrAdmin], users.deleteUser) 



module.exports = router;
const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

/* GET Home Page */
// router.get('/', function(req, res){
//   res.redirect('/api');
// });

// router.get('/s', function (req, res, next) { res.json({ 'LOL': 'LOL' })});


router.get('/todos', apiController.todos);
router.get('/users', apiController.users);


module.exports = router;
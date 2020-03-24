const express = require('express');
const UserModel = require('../models/user.js');
const helper = require('./helpers.js');

const router = express.Router();

router.get('/userID', helper.ensureAuthenticated, (req, resp) =>{
    resp.json(req.user.id)
})

// handle GET requests for [domain]/api/users/1/
router.get('/users/:id', helper.ensureAuthenticated, (req, resp) => {
    UserModel.find({ id: req.params.id }, {id:1, details:1, picture:1, membership:1, email:1, favorites:1}, (err, data) => {
        if (err) {
            resp.json({ message: 'User not found' });
        } else {
            resp.json(data);
        }
    });
});

// handle POST requests for [domain]/api/favorite/1/ 
router.post('/add/favorite/:userid', helper.ensureAuthenticated, (req, resp) =>{
    
    //req.body is the dynamic data coming from front end
    const id = req.body.id
    const title = req.body.title
    const poster = req.body.poster

    var itemToAdd = {id: id, title: title, poster: poster}

    // use mongoose to insert favorite item through MongoDB
    UserModel.findOneAndUpdate({id: req.params.userid}, { $push: { favorites: itemToAdd } },  
        function (error, success) {
        if (error) {
            resp.status(400).json('Error: ' + err);
        } else {
            resp.json('Favorite Item Added !');
        }
    });
})

router.post('/delete/favorite/:userid', helper.ensureAuthenticated, (req, resp) =>{
    
    //req.body is the dynamic data coming from front end
    const itemToDel = req.body.id;

    //you can specify favorite by id, and title. {id:, title:}
    UserModel.findOneAndUpdate({id: req.params.userid}, { $pull: { favorites: { id: itemToDel} } },{ multi: true } ,
        function (error, success) {
        if (error) {
            resp.status(400).json('Error: ' + err);
        } else {
            resp.json('Favorite Item Deleted !');
        }
    });
})


module.exports = router;
const express = require('express');
const UserModel = require('../models/user.js');
const helper = require('./helpers.js');

const router = express.Router();

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


router.get('/add/favorite/:id', helper.ensureAuthenticated, (req, resp) =>{
    // use mongoose to insert favorite item through MongoDB
    // const id = req.body.id
    // const title = req.body.title
    // const poster = req.body.poster

    var itemToAdd = {"id": "123", "title": "some Title", "poster": "/someposter.jpg" };

    UserModel.findOneAndUpdate({id: req.params.id}, { $push: { favorites: itemToAdd } },  
        function (error, success) {
        if (error) {
            resp.status(400).json('Error: ' + err);
        } else {
            resp.json('Favorite Item Added !');
        }
    });
})

// router.get('/delete/favorite/:id', helper.ensureAuthenticated, (req, resp) =>{
//     // use mongoose to insert favorite item through MongoDB
//     // const id = req.body.id
//     // const title = req.body.title
//     // const poster = req.body.poster

//     var itemToDelete = {"id": "123", "title": "some Title", "poster": "/someposter.jpg" };

//     UserModel.findOneAndRemove({id: req.params.id}, { $delete: { favorites: itemToDelete } },  
//         function (error, success) {
//         if (error) {
//             resp.status(400).json('Error: ' + err);
//         } else {
//             resp.json('Favorite Item Deleted !');
//         }
//     });
// })

module.exports = router;
// // handle GET requests for [domain]/api/favorites - return all favorites
// const handleAllFavorite = (app, Favorite) => {
//     app.route('/api/favorites')

//         .get(function (req, resp) {
//             // use mongoose to retrieve all favorites from MongoDB
//             Favorite.find({}, function (err, data) {
//                 if (err) {
//                     resp.json({ message: 'Unable to connect to favorites' });
//                 } else {
//                     // return JSON retrieved by Mongo as response
//                     resp.json(data);
//                 }
//             });
//         })

//         .post(function (req, resp) {
//             // use mongoose to insert favorite item through MongoDB
//             const id = req.body.id
//             const title = req.body.title
//             const poster = req.body.poster
//             const newFavorite = new Favorite({
//                 id,
//                 title,
//                 poster,
//             });

//             newFavorite.save()
//             .then( () => resp.json('Favorite Item Added !'))
//             .catch(err => resp.status(400).json('Error: ' + err));
//         })
// };

// // handle GET requests for [domain]/api/favorites/delete/13 - delete particular item
// const handleFavoriteDelete = (app, Favorite) => {
//     app.route('/api/favorites/delete/:id')
//         .delete(function (req, resp) {
//             // use mongoose to delete favorite item through MongoDB
//             Favorite.deleteOne({id: req.params.id})
//                 .then(() => resp.json('Favorite Item Deleted !'))
//                 .catch(err => resp.status(400).json('Error: ' + err));
//         });
// };

// module.exports = {
//     handleAllFavorite,
//     handleFavoriteDelete
// }
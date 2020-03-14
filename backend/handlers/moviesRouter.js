

// // handle GET requests for [domain]/api/movies - return all movies
// const handleAllMovies = (app, Movie) => {
//     app.route('/api/movies')
//         .get(function (req, resp) {
//             // use mongoose to retrieve all movies from MongoDB
//             Movie.find({}, function (err, data) {
//                 if (err) {
//                     resp.json({ message: 'Unable to connect to movies' });
//                 } else {
//                     // return JSON retrieved by Mongo as response
//                     resp.json(data);
//                 }
//             });
//         });
// };

// // handle requests for specific movie: e.g., /api/movies/1
// const handleSingleMovie = (app, Movie) => {
//     app.route('/api/movies/:id')
//         .get(function (req, resp) {
//             Movie.find({ id: req.params.id }, (err, data) => {
//                 if (err) {
//                     resp.json({ message: 'Movie not found' });
//                 } else {
//                     resp.json(data);
//                 }
//             });
//         });
// };

// // handle GET requests for [domain]/api/brief
// const handleAllMoviesBrief = (app, Movie) => {
//     app.route('/api/brief')
//         .get(function (req, resp) {
//             // use mongoose to retrieve all movies brief info from MongoDB
//             Movie.find({}, {id:1, title:1, tagline:1, poster:1, release_date:1, 'ratings.average': 1, _id:0}, function (err, data) {
//                 if (err) {
//                     resp.json({ message: 'Unable to connect to movies' });
//                 } else {
//                     // return JSON retrieved by Mongo as response
//                     resp.json(data);
//                 }
//             });
//         });
// };

// // handle GET requests for [domain]/api/find/title/substring -- returns movie whose title contains substring
// const handleAllMoviesTitleRegex = (app, Movie) => {
//     app.route('/api/find/title/:substring')
//         .get(function (req, resp) {
//             // use mongoose to retrieve all movies brief info from MongoDB
//             Movie.find({ 'title': new RegExp(req.params.substring, 'i') }, 
//             {id:1, title:1, tagline:1, poster:1, release_date:1, 'ratings.average': 1, _id:0},
//             function (err, data) {
//                 if (err) {
//                     resp.json({ message: 'Unable to connect to movies' });
//                 } else {
//                     // return JSON retrieved by Mongo as response
//                     resp.json(data);
//                 }
//             });
//         });
// };

// // handle GET requests for [domain]/api/find/year/y1/y2 -- returns movie release btw y1 and y2
// const handleAllMoviesYear = (app, Movie) => {
//     app.route('/api/find/year/:y1/:y2')
//         .get(function (req, resp) {
//             // use mongoose to retrieve all movies brief info from MongoDB
//             Movie.find().where('release_date')
//                 .gte(req.params.y1+ "-01-01")
//                 .lte(req.params.y2+ "-12-31")
//                 .sort({ title: 1 })
//                 .select('title id release_date tagline poster ratings.average')
//                 .exec(function (err, data) {
//                     if (err) {
//                         resp.json({ message: 'Movies not found' });
//                     } else {
//                         resp.json(data);
//                     }
//                 });
//         });
// };

// // handle GET requests for [domain]/api/find/rating/r1/r2 -- returns movie ratings btw r1 and r2
// const handleAllMoviesRating = (app, Movie) => {
//     app.route('/api/find/rating/:r1/:r2')
//         .get(function (req, resp) {
//             // use mongoose to retrieve all movies brief info from MongoDB
//             Movie.find().where('ratings.average')
//                 .gte(req.params.r1)
//                 .lte(req.params.r2)
//                 .sort({ title: 1 })
//                 .select('title id release_date tagline poster ratings.average')
//                 .exec(function (err, data) {
//                     if (err) {
//                         resp.json({ message: 'Movies not found' });
//                     } else {
//                         resp.json(data);
//                     }
//                 });
//         });
// };

// module.exports = {
//     handleAllMovies,
//     handleSingleMovie,
//     handleAllMoviesBrief,
//     handleAllMoviesTitleRegex,
//     handleAllMoviesYear,
//     handleAllMoviesRating
// }



const express = require('express');
const MovieModel = require('../models/movie.js');
const helper = require('./helpers.js');

const router = express.Router();

// handle GET requests for [domain]/api/movies - return all movies
router.get('/movies/', helper.ensureAuthenticated, (req, resp) => {
   MovieModel.find({}, (err, data) => {
      if (err) {
         resp.json({ message: 'Movies not found' });
      } else {
         resp.json(data);
      }
   });
});

// handle requests for specific movie: e.g., /api/movies/1
router.get('/movies/:id', helper.ensureAuthenticated, (req, resp) => {
   MovieModel.find({ id: req.params.id }, (err, data) => {
      if (err) {
         resp.json({ message: 'Movies not found' });
      } else {
         resp.json(data);
      }
   });
});

// handle GET requests for [domain]/api/brief
router.get('/brief/', helper.ensureAuthenticated, (req, resp) => {
   MovieModel.find({}, { id:1, title:1, tagline:1, poster:1, release_date:1, 'ratings.average': 1, _id:0 }, (err, data) => {
      if (err) {
         resp.json({ message: 'Movies not found' });
         console.log("SDfsd")
      } else {
         resp.json(data);
      }
   });
});

// handle GET requests for [domain]/api/find/title/substring -- returns movie whose title contains substring
router.get('/find/title/:substring', helper.ensureAuthenticated, (req, resp) => {
   MovieModel.find({ 'title': new RegExp(req.params.substring, 'i') }, 
   {id:1, title:1, tagline:1, poster:1, release_date:1, 'ratings.average': 1, _id:0},
   (err, data) => {
      if (err) {
         resp.json({ message: 'Movies not found' });
      } else {
         resp.json(data);
      }
   });
});

// handle GET requests for [domain]/api/find/year/y1/y2 -- returns movie release btw y1 and y2
router.get('/find/year/:y1/:y2', helper.ensureAuthenticated, (req, resp) => {
   MovieModel.find().where('release_date')
      .gte(req.params.y1 + "-01-01")
      .lte(req.params.y2 + "-12-31")
      .sort({ title: 1 })
      .select('title id release_date tagline poster ratings.average')
      .exec(function (err, data) {
         if (err) {
            resp.json({ message: 'Movies not found' });
         } else {
            resp.json(data);
         }
      });
});

// handle GET requests for [domain]/api/find/rating/r1/r2 -- returns movie ratings btw r1 and r2
router.get('/find/rating/:r1/:r2', helper.ensureAuthenticated, (req, resp) => {
   MovieModel.find().where('ratings.average')
      .gte(req.params.r1)
      .lte(req.params.r2)
      .sort({ title: 1 })
      .select('title id release_date tagline poster ratings.average')
      .exec(function (err, data) {
         if (err) {
            resp.json({ message: 'Movies not found' });
         } else {
            resp.json(data);
         }
      });
});

module.exports = router;

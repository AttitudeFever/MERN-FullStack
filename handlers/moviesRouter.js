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

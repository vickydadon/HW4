/*
CSC3916 HW4
File: Server.js
Description: Web API scaffolding for Movie API
 */
var mongoose = require('mongoose');

var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var authController = require('./auth');
var authJwtController = require('./auth_jwt');
var jwt = require('jsonwebtoken');
var cors = require('cors');
var User = require('./Users');
var Movie = require('./Movies');
var Review = require('./Reviews');

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());

var router = express.Router();

function getJSONObjectForMovieRequirement(req) {
    var json = {
        headers: "No headers",
        key: process.env.UNIQUE_KEY,
        body: "No body"
    };

    if (req.body != null) {
        json.body = req.body;
    }

    if (req.headers != null) {
        json.headers = req.headers;
    }

    return json;
}

router.post('/signup', function(req, res) {
    if (!req.body.username || !req.body.password) {
        res.json({success: false, msg: 'Please include both username and password to signup.'})
    } else {
        var user = new User();
        user.name = req.body.name;
        user.username = req.body.username;
        user.password = req.body.password;

        user.save(function(err){
            if (err) {
                if (err.code == 11000)
                    return res.json({ success: false, message: 'A user with that username already exists.'});
                else
                    return res.json(err);
            }

            res.json({success: true, msg: 'Successfully created new user.'})
        });
    }
});

router.post('/signin', function (req, res) {
    var userNew = new User();
    userNew.username = req.body.username;
    userNew.password = req.body.password;

    User.findOne({ username: userNew.username }).select('name username password').exec(function(err, user) {
        if (err) {
            res.send(err);
        }

        user.comparePassword(userNew.password, function(isMatch) {
            if (isMatch) {
                var userToken = { id: user.id, username: user.username };
                var token = jwt.sign(userToken, process.env.SECRET_KEY);
                res.json ({success: true, token: 'JWT ' + token});
            }
            else {
                res.status(401).send({success: false, msg: 'Authentication failed.'});
            }
        })
    })
});

// GET all reviews
router.get('/reviews', function (req, res) {
    Review.find({})
        .populate('movieId', 'title') // Optional: populate movie title
        .exec(function (err, reviews) {
            if (err) res.status(500).send(err);
            else res.json(reviews);
        });
});

// POST a new review (JWT protected)
router.post('/reviews', authJwtController.isAuthenticated, function (req, res) {
    const { movieId, username, review, rating } = req.body;

    if (!movieId || !username || !review || rating == null) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const newReview = new Review({
        movieId,
        username,
        review,
        rating
    });

    newReview.save(function (err) {
        if (err) {
            res.status(500).json({ message: 'Failed to create review', error: err });
        } else {
            res.status(201).json({ message: 'Review created!' });
        }
    });
});

// GET all movies (with optional ?reviews=true for aggregation)
router.get('/movies', function (req, res) {
    const includeReviews = req.query.reviews === 'true';

    if (includeReviews) {
        // Aggregate movies with their reviews
        Movie.aggregate([
            {
                $lookup: {
                    from: "reviews",              // Collection to join (MongoDB lowercases it)
                    localField: "_id",            // Movie _id
                    foreignField: "movieId",      // Matching field in Review
                    as: "reviews"                 // Result array field
                }
            }
        ]).exec(function (err, result) {
            if (err) {
                res.status(500).json({ message: 'Error aggregating reviews', error: err });
            } else {
                res.json(result);
            }
        });
    } else {
        // Return just movies without reviews
        Movie.find({}, function (err, movies) {
            if (err) res.status(500).send(err);
            else res.json(movies);
        });
    }
});

// GET one movie with optional review aggregation
router.get('/movies/:id', function (req, res) {
    const includeReviews = req.query.reviews === 'true';
    const movieId = req.params.id;

    if (includeReviews) {
        Movie.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(movieId) }
            },
            {
                $lookup: {
                    from: "reviews",
                    localField: "_id",
                    foreignField: "movieId",
                    as: "reviews"
                }
            }
        ]).exec(function (err, result) {
            if (err) {
                res.status(500).json({ message: 'Error aggregating', error: err });
            } else if (result.length === 0) {
                res.status(404).json({ message: 'Movie not found.' });
            } else {
                res.json(result[0]);
            }
        });
    } else {
        Movie.findById(movieId, function (err, movie) {
            if (err) res.status(500).send(err);
            else if (!movie) res.status(404).json({ message: 'Movie not found.' });
            else res.json(movie);
        });
    }
});

// POST a new movie (JWT protected)
router.post('/movies', authJwtController.isAuthenticated, function (req, res) {
    const { title, releaseDate, genre, actors } = req.body;

    if (!title || !genre || !actors || !Array.isArray(actors) || actors.length === 0) {
        return res.status(400).json({ message: 'Title, genre, and at least one actor are required.' });
    }

    for (let actor of actors) {
        if (!actor.actorName || !actor.characterName) {
            return res.status(400).json({ message: 'Each actor must have both actorName and characterName.' });
        }
    }

    const newMovie = new Movie({ title, releaseDate, genre, actors });

    newMovie.save(function (err, movie) {
        if (err) {
            res.status(500).json({ message: 'Failed to create movie', error: err });
        } else {
            res.status(201).json({ message: 'Movie added successfully', movie });
        }
    });
});

app.use('/', router);
app.listen(process.env.PORT || 8080);
module.exports = app; // for testing only



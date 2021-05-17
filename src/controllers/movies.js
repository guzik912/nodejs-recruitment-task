const Movie = require('../models/Movie');
const { validationResult } = require('express-validator');
const { fetchMovie } = require('../services/movies');

const isUserRestrictedToCreate = async (userId, res, movieModel) => {
  let today = new Date();
  let month = today.getMonth();
  let year = today.getFullYear();

  const calculateCreatedUserMovies = await movieModel.find({
    createdByUserId: userId,
  });

  const calculateCreatedInCurrentMonth = calculateCreatedUserMovies.filter(
    ({ createdAt }) =>
      createdAt.getMonth() == month && createdAt.getFullYear() == year
  );

  if (calculateCreatedInCurrentMonth.length === 5) {
    res
      .status(401)
      .json({ error: 'User is not allowed to add more movies.' });
  }
};

exports.getMovies = async (req, res) => {
  const { userId } = req.user;

  try {
    const movies = await Movie.find({ createdByUserId: userId });

    if (movies.length === 0) {
      return res.status(401).json({ message: 'No movies exists' });
    }

    return res.status(200).json({ movies });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.createMovie = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(401).json({ error: errors.array() });
  }

  const { userId, role } = req.user;
  const { title: movieTitle } = req.body;

  try {
    if (role === 'basic') {
      isUserRestrictedToCreate(userId, res, Movie);
    }

    let movie = await Movie.findOne({ title: movieTitle });

    if (movie) {
      return res
        .status(401)
        .json({ message: 'This movie already exist in database.' });
    }

    const { data } = await fetchMovie(movieTitle);

    if (!data) {
      return res.status(401).json({ error: 'Movie does not exists.' });
    }

    const {
      Title: title,
      Released: released,
      Genre: genre,
      Director: director,
    } = data;

    movie = new Movie({
      title,
      released,
      genre,
      director,
      createdByUserId: userId,
    });

    await movie.save();

    return res.status(201).json({ message: 'Movie successfully created.' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

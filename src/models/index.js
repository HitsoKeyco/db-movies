const Movie = require('./Movie')
const Actor = require('./Actor')
const Director = require('./Director')
const Gender = require('./Gender')


Movie.belongsToMany(Gender, { through: 'MoviesGenres' });
Gender.belongsToMany(Movie, { through: 'MoviesGenres' });

Movie.belongsToMany(Actor, { through: 'MoviesActors' });
Actor.belongsToMany(Movie, { through: 'MoviesActors' });

Movie.belongsToMany(Director, { through: 'MoviesDirectors' });
Director.belongsToMany(Movie, { through: 'MoviesDirectors' });


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/movies');
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="movies-container">
      <h1 className="movies-heading">Choose Your Movie</h1>
      <ul className="movies-list">
        {movies.map((movie) => (
          <li key={movie.id} className="movie-item">
            <h2 className="movie-title">{movie.title}</h2>
            <img src={`${movie.imageURL}`} alt="" />
            <p className="movie-description">{movie.description}</p>
            {movie.showtimes && (
              <p className="movie-showtimes">Showtimes: {movie.showtimes.join(', ')}</p>
            )}
            <Link to={`/movies/${movie._id}/theaters`} className="btn">Book Tickets</Link>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;


// Movies.jsx

// import React from 'react';
// import { Link } from 'react-router-dom';

// const Movies = () => {
//   const movies = [
//     { id: 1, title: 'Interstellar', description: 'When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.', showtimes: ['10:00 AM', '1:00 PM'], imageUrl: 'https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg' },
//     { id: 2, title: 'The Dark Knight', description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.', showtimes: ['11:00 AM', '3:00 PM'], imageUrl: 'https://upload.wikimedia.org/wikipedia/en/1/1c/The_Dark_Knight_%282008_film%29.jpg' },
//     { id: 3, title: 'Inception', description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.', showtimes: ['12:00 PM', '5:00 PM'], imageUrl: 'https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg' },
//     { id: 4, title: 'Avengers: Infinity War', description: 'The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.', showtimes: ['01:00 PM', '7:00 PM'], imageUrl: 'https://upload.wikimedia.org/wikipedia/en/4/4d/Avengers_Infinity_War_poster.jpg' },
//     { id: 5, title: 'Oppenheimer', description: 'During World War II, Lt. Gen. Leslie Groves Jr. appoints physicist J. Robert Oppenheimer to work on the top-secret Manhattan Project. Oppenheimer and a team of scientists spend years developing and designing the atomic bomb.', showtimes: ['12:00 PM', '5:00 PM'], imageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/Oppenheimer_%28film%29.jpg/220px-Oppenheimer_%28film%29.jpg' },
//     { id: 6, title: 'Avengers Endgame', description: 'After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos actions and restore balance to the universe.', showtimes: ['32:00 PM', '10:00 PM'], imageUrl: 'https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg' },
//   ];

//   return (
//     <div className="movies-container">
//       <h1 className="movies-heading">Choose Your Movie</h1>
//       <div className="movies-list">
//         {movies.map((movie) => (
//           <div key={movie.id} className="movie-item">
//             <img src={movie.imageUrl} alt={movie.title} className="movie-image" />
//             <div className="movie-details">
//               <h2 className="movie-title">{movie.title}</h2>
//               <p className="movie-description">{movie.description}</p>
//               <p className="movie-showtimes">Showtimes: {movie.showtimes.join(', ')}</p>
//               <Link to={`/movies/${movie.id}/theaters`} className="btn">Book Tickets</Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Movies;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const MovieDetails = ({ movieId }) => {
//   const [theaters, setTheaters] = useState([]);

//   useEffect(() => {
//     const fetchTheaters = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/movies/${movieId}/theaters`);
//         setTheaters(response.data);
//       } catch (error) {
//         console.error('Error fetching theaters:', error);
//       }
//     };

//     fetchTheaters();
//   }, [movieId]);
//   return (
//     <div>
//       <h2>Select Your Theater</h2>
//       <ul>
//         {theaters.map((theater) => (
//           <li key={theater.id}>{theater.name} - {theater.location}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default MovieDetails;


import React from 'react';
import { Link, useParams } from 'react-router-dom';

const MovieDetails = () => {
  const { id } = useParams();
  const theaters = [
    { id: 1, name: 'CinemaPlex', location: 'Location 1' },
    { id: 2, name: 'CinemaPlex', location: 'Location 2' },
    { id: 3, name: 'CinemaPlex', location: 'Location 3' }
  ];

  return (
    <div className="movie-details-container">
      <h1 className="movie-details-heading">Select your Theater</h1>
      {theaters.map((theater) => (
        <Link key={theater.id} to={`/book/${id}/${theater.id}`} className="theater-link">
          <div className="theater-card">
            <h3 className="theater-name">{theater.name}</h3>
            <p className="theater-location">{theater.location}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MovieDetails;


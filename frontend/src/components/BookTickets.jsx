import React, { useState } from 'react';
import { useParams } from 'react-router-dom';


const BookTickets = () => {
  const { id, theaterId } = useParams();

  const theaters = [
    { id: 1, name: 'CinemaPlex', location: 'Location 1' },
    { id: 2, name: 'CinemaPlex', location: 'Location 2' },
    { id: 3, name: 'CinemaPlex', location: 'Location 3' }
  ];


  const selectedTheater = theaters.find(theater => theater.id === parseInt(theaterId));

  const rows = 10;
  const cols = 10;
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [numTickets, setNumTickets] = useState(1);
  const [selectedShowtime, setSelectedShowtime] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false); 
  const [allFieldsSelected, setAllFieldsSelected] = useState(false); 

  const handleSeatClick = (row, col) => {
   
    const seatIndex = selectedSeats.findIndex(seat => seat.row === row && seat.col === col);
    if (seatIndex !== -1) {
      
      setSelectedSeats(prevSeats => prevSeats.filter(seat => !(seat.row === row && seat.col === col)));
    } else {
      
      setSelectedSeats(prevSeats => [...prevSeats, { row, col }]);
    }
  };


  const handleBookNow = () => {
   
    if (numTickets > 0 && selectedShowtime !== '' && selectedDate !== '') {
      setBookingSuccess(true);
    } else {
      
      setAllFieldsSelected(false);
    }
  };

  return (
    <div className="book-tickets-container">
      <h1 className="book-tickets-heading">Book Tickets</h1>
      {selectedTheater && (
        <div>
          <h2 className="theater-name">Theater: {selectedTheater.name}</h2>
          
          <div className="book-tickets-container animate-scroll">
            <div className="dropdowns-container">
              <div className="dropdown">
                <label htmlFor="numTickets" className="dropdown-label">Number of Tickets:</label>
                <select id="numTickets" className="dropdown-select" value={numTickets} onChange={(e) => setNumTickets(parseInt(e.target.value))}>
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>
              <div className="dropdown">
                <label htmlFor="showtime" className="dropdown-label">Show Timing:</label>
                <select id="showtime" className="dropdown-select" value={selectedShowtime} onChange={(e) => setSelectedShowtime(e.target.value)}>
                 
                  <option value="">Select Show Timing</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="1:00 PM">1:00 PM</option>
                  <option value="4:00 PM">4:00 PM</option>
                </select>
              </div>
              <div className="dropdown">
                <label htmlFor="date" className="dropdown-label">Date:</label>
                <input type="date" id="date" className="date-input" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
              </div>
            </div>
            
            <div className="seating-layout">
              {Array.from({ length: rows }, (_, rowIndex) => (
                <div key={rowIndex} className="row">
                  {Array.from({ length: cols }, (_, colIndex) => {
                    const isBooked = Math.random() < 0.5; 
                    const isSelected = selectedSeats.some(seat => seat.row === rowIndex + 1 && seat.col === colIndex + 1);
                    return (
                      <div
                        key={`${rowIndex}-${colIndex}`}
                        className={`seat ${isBooked ? 'booked' : isSelected ? 'selected' : 'available'}`}
                        onClick={() => !isBooked && handleSeatClick(rowIndex + 1, colIndex + 1)}
                      >
                        {String.fromCharCode(65 + colIndex)}{rowIndex + 1}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
            <div>
              <p className="screen-info">The screen is this way</p>
              {!bookingSuccess && !allFieldsSelected ? (  
                <button className="book-button" onClick={handleBookNow}>Book Now</button>
              ) : bookingSuccess ? (
                <p className="success-message">Successfully booked!</p>
              ) : (
                <p className="error-message">Please select all fields</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookTickets;

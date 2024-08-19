import React, { useState, useContext } from 'react';
import { TravelDiaryContext } from './TravelDiaryContext';

function Home() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  
  const { addEntry, error } = useContext(TravelDiaryContext);

  const handleAddEntry = () => {
    const newEntry = { title, date, location, description };
    addEntry(newEntry);
    setTitle('');
    setDate('');
    setLocation('');
    setDescription('');
  };

  return (
    <div>
      <h1>Add a Travel Entry</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="input-container">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={handleAddEntry}>Add Entry</button>
      </div>
    </div>
  );

  
}

export default Home;

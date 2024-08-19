import React, { useState, useContext } from 'react';
import { TravelDiaryContext } from './TravelDiaryContext';

function Entries() {
  const [search, setSearch] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editLocation, setEditLocation] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const { entries, deleteEntry, updateEntry, loading, error } = useContext(TravelDiaryContext);

  const handleEdit = (index) => {
    setEditingIndex(index);
    const entry = entries[index];
    setEditTitle(entry.title);
    setEditDate(entry.date);
    setEditLocation(entry.location);
    setEditDescription(entry.description);
  };

  const handleSaveEdit = async () => {
    const updatedEntry = {
      title: editTitle,
      date: editDate,
      location: editLocation,
      description: editDescription,
    };

    try {
      await updateEntry(entries[editingIndex]._id, updatedEntry);
      setEditingIndex(null); // Reset editing index to exit edit mode
      setEditTitle('');
      setEditDate('');
      setEditLocation('');
      setEditDescription('');
    } catch (error) {
      console.error('Error saving edit:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditTitle('');
    setEditDate('');
    setEditLocation('');
    setEditDescription('');
  };

  return (
    <div>
      <h1>View Entries</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        className='search-bar'
        type="text"
        placeholder="Search by location or date"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="entries-container">
        {entries.length > 0 ? (
          entries
            .filter(
              entry =>
                entry.location.toLowerCase().includes(search.toLowerCase()) ||
                entry.date.includes(search)
            )
            .map((entry, index) => (
              <div key={entry._id} className="entry">
                {editingIndex === index ? (
                  <div>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      placeholder="Title"
                    />
                    <input
                      type="date"
                      value={editDate}
                      onChange={(e) => setEditDate(e.target.value)}
                    />
                    <input
                      type="text"
                      value={editLocation}
                      onChange={(e) => setEditLocation(e.target.value)}
                      placeholder="Location"
                    />
                    <textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      placeholder="Description"
                    />
                    <button onClick={handleSaveEdit}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </div>
                ) : (
                  <div>
                    <h3>{entry.title}</h3>
                    <p>Date: {entry.date}</p>
                    <p>Location: {entry.location}</p>
                    <p>Description: {entry.description}</p>
                    <button onClick={() => handleEdit(index)}>Edit</button>
                    <button onClick={() => deleteEntry(entry._id)}>Delete</button>
                  </div>
                )}
              </div>
            ))
        ) : (
          <p>No entries found</p>
        )}
      </div>
    </div>
  );
}

export default Entries;

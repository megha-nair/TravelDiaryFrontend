import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const TravelDiaryContext = createContext();

// API Base URL
const API_URL = 'https://travel-diary-gold.vercel.app/api/entries';

export const TravelDiaryProvider = ({ children }) => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all entries
    axios.get(`${API_URL}/all`)
      .then(response => {
        console.log('API Response:', response); // Log the entire response
        if (response.data) {
          console.log('Fetched entries:', response.data); // Log the entries data
          setEntries(response.data); // Assuming response.data contains the list of entries
        } else {
          console.warn('Unexpected response structure:', response.data);
          setError('Unexpected response structure.');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching entries:', error);
        setError('Failed to fetch entries.');
        setLoading(false);
      });
  }, []);

  // Update an entry
  const updateEntry = (id, updatedEntry) => {
    return axios.put(`${API_URL}/update/${id}`, updatedEntry)
      .then(response => {
        if (response.data) {
          setEntries(entries.map(entry => 
            entry._id === id ? response.data : entry
          ));
          fetchEntries();
        } else {
          setError('Failed to update entry. No data returned.');
        }
      })
      .catch(error => {
        console.error('Error updating entry:', error);
        setError('Failed to update entry.');
      });
  };

  // Add a new entry
  const addEntry = (newEntry) => {
    return axios.post(`${API_URL}/add`, newEntry)
      .then(response => {
        if (response.data) {
          setEntries([...entries, response.data]);
        } else {
          setError('Failed to add entry. No data returned.');
        }
      })
      .catch(error => {
        console.error('Error adding entry:', error);
        setError('Failed to add entry.');
      });
  };

  // Search entries
  const searchEntries = (query) => {
    return axios.get(`${API_URL}/search`, { params: query })
      .then(response => response.data)
      .catch(error => {
        console.error('Error searching entries:', error);
        setError('Failed to search entries.');
        return []; // Return an empty array if search fails
      });
  };

  // Delete an entry
  const deleteEntry = (id) => {
    console.log(`Attempting to delete entry with id: ${id}`);
    
    return axios.delete(`${API_URL}/delete/${id}`)
      .then(response => {
        console.log('Delete response:', response);
        fetchEntries();
      })
      .catch(error => {
        console.error('Error deleting entry:', error.response ? error.response.data : error.message);
        setError('Failed to delete entry.');
      });
  };

  const fetchEntries = () => {
    setLoading(true);
    axios.get(`${API_URL}/all`)
      .then(response => {
        if (response.data) {
          setEntries(response.data);
        } else {
          setError('Unexpected response structure.');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching entries:', error);
        setError('Failed to fetch entries.');
        setLoading(false);
      });
  };

  return (
    <TravelDiaryContext.Provider value={{ entries, addEntry, searchEntries, deleteEntry, updateEntry, fetchEntries, loading, error }}>
      {children}
    </TravelDiaryContext.Provider>
  );
};

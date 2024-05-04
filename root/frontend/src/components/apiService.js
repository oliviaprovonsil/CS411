import React, { useEffect, useState } from 'react';

const ApiService = () => {
  const [businesses, setBusinesses] = useState(null);
  const [input, setInput] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({searchQuery: input}),
        });
        const data = await response.json();
        console.log("this is from the apiService", data);
        setInput('')
      } catch (err){
        console.error("Error in user input:", err);
      }
    };

    fetchData();
  }, []); 

  return (
    <div className='text'>
      {businesses ? (
        <div>{JSON.stringify(businesses)}</div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default ApiService;

import React, { useEffect, useState } from 'react';

const ApiService = () => {
  const [businesses, setBusinesses] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBusinesses(data);
      } catch (error) {
        console.error('Error fetching data: ', error);
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

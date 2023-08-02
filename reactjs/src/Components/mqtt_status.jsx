import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyComponent = () => {
  const [data, setData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/value');
        setData(response.data);
      } catch (error) {
        //console.log('Error:', error);
      }
    };

    fetchData();
  }, []);

  return data;
};

export default MyComponent;
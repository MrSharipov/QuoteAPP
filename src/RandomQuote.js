import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RandomQuote() {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    getQuote();
  }, []);

  const getQuote = async () => {
    const url = 'https://api.quotable.io/random';
    try {
      const response = await axios.get(url);
      setQuote(response.data.content);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = () => {
    getQuote();
  };

  return (
    <div>
      <h1>Random Quote Generator</h1>
      <p>{quote}</p>
      <button onClick={handleClick}>New Quote</button>
    </div>
  );
}

export default RandomQuote;

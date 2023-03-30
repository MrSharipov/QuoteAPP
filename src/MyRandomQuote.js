import React, { useEffect, useState } from "react";
import axios from "axios";

export const MyRandomQuote = () => {
  const [quote, setQuote] = useState("");
  const [tag, setTag] = useState("");
  const [count, setCount] = useState(1);
  const [quoteByTags, setQuotesByTag] = useState(null);

  const findQuote = async () => {
    const res = await axios.get(`https://api.quotable.io/random`);
    setQuote(res.data);
  };

  const searchByTag = async (e) => {
    e.preventDefault();
    const res = await axios.get(
      "https://api.quotable.io/quotes/random?limit=" + count + "&tags=" + tag
    );
    setQuotesByTag(res.data);
  };

  useEffect(() => {
    findQuote();
  }, []);

  return (
    <>
      <div>
        <h1>MyRandomQuote</h1>
        <p>{quote.content}</p>
        <button onClick={findQuote}>New quote</button>
      </div>
      <div>
        <h1>Search by tags</h1>
        <form onSubmit={searchByTag}>
          <label htmlFor="tag">Write the tag</label>
          <input
            type="text"
            id="tag"
            value={tag}
            onChange={(e) => {
              setTag(e.target.value);
            }}
          />
          <br />
          <label htmlFor="count">Number:</label>
          <input
            type="number"
            id="count"
            max={50}
            min={1}
            value={count}
            onChange={(e) => {
              setCount(e.target.value);
            }}
          />
          <br />
          <button type="submit">Search</button>
          {quoteByTags &&
            quoteByTags.map((quoteByTag) => (
              <div key={quoteByTag._id}>
                <h2>{quoteByTag.author}</h2>
                <p>{quoteByTag.content}</p>
                {quoteByTag.tags.map((tag, index) => (
                  <h5 key={index}>{tag}</h5>
                ))}
              </div>
            ))}
        </form>
      </div>
    </>
  );
};

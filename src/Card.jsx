import React, { useState, useEffect } from "react";
import "./card.css";

const Card = () => {
  const [items, setItems] = useState([]);
  const [filterSearch, setFilterSearch] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let data = await fetch("https://fakestoreapi.com/products");
      let response = await data.json();
      setItems(response);
      setFilterSearch(response);
    } catch (error) {
      console.log("Error While Fetching Data is ", error);
    }
  };

  const handleSearch = () => {
    const filteredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilterSearch(filteredItems);
  };

  return (
    <>
      <div className="search">
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          placeholder="Search..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="cards-list">
        {filterSearch.map((value) => (
          <div key={value.id} className="card 1">
            <div className="card_image">
              <img src={value.image} alt={value.title} />
            </div>
            <div className="card_title title-white">
              <p>{value.title}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Card;

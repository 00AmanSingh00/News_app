import React from 'react';
import '../App.css';

const NewsCard = ({ article, onSave, onRemove, isInAccount }) => {
  const handleSaveClick = (e) => {
    e.stopPropagation(); // Prevent the card click event from firing
    if (isInAccount) {
      onRemove(article); // Call onRemove if in account section
    } else {
      onSave(article); // Call onSave if not in account section
    }
  };

  const handleCardClick = () => {
    if (article.url) {
      window.open(article.url, '_blank'); // Open the article URL in a new tab
    }
  };

  return (
    <div className="card" onClick={handleCardClick}>
      <div className="card-header">
        <img 
          src={article.image || "https://via.placeholder.com/400x200"} 
          alt="image unavailable" 
          className="card-image"
        />
      </div>
      <div className="card-content">
        <h3>{article.title || "No title available"}</h3>
        <h6 className="news-source">
          {article.source ? article.source.name : "Unknown source"} · {new Date(article.published).toLocaleString("en-US", { timeZone: "Asia/Jakarta" })}
        </h6>
        <p className="news-desc">{article.description || "No description available"}</p>
        <div className="save-button-container">
          <button className="save-button" onClick={handleSaveClick}>
            {isInAccount ? "Remove" : "Save"} {/* Change button text based on isInAccount */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
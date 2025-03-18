import React, { useEffect, useState } from 'react';
import NewsCard from './NewsCard';
import Navbar from './Navbar';
import { supabase } from '../utils/supabaseClient';
import './MyAccount.css';

const MyAccount = () => {
  const [savedNews, setSavedNews] = useState([]);

  // Fetch saved news when the component mounts
  useEffect(() => {
    const fetchSavedNews = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data, error } = await supabase
          .from('saved_news')
          .select('article') // Select only the 'article' column
          .eq('user_id', session.user.id); // Filter by user ID

        if (error) {
          console.error('Error fetching saved news:', error);
        } else {
          setSavedNews(data.map(item => item.article)); // Extract articles from the response
        }
      }
    };

    fetchSavedNews();
  }, []);

  // Function to handle removing an article
  const handleRemoveArticle = async (article) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      const { error } = await supabase
        .from('saved_news')
        .delete()
        .eq('user_id', session.user.id)
        .eq('article->>id', article.id); // Assuming each article has a unique 'id'

      if (error) {
        console.error('Error removing article:', error);
      } else {
        // Remove the article from the state
        setSavedNews(savedNews.filter(a => a.id !== article.id));
      }
    }
  };

  return (
    <div className="my-account-container">
      <Navbar />
      <h1>My Saved News</h1>
      <div className="cards-container container flex">
        {savedNews.length > 0 ? (
          savedNews.map((article, index) => (
            <NewsCard
              key={index}
              article={article}
              isInAccount={true} // Indicate that the user is in the account section
              onRemove={handleRemoveArticle} // Pass the remove function
            />
          ))
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default MyAccount;
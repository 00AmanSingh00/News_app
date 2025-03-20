import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Navbar from './components/Navbar';
import NewsCard from './components/NewsCard';
import { fetchNews } from './utils/fetchDetails';
import Auth from './components/Auth';
import { supabase } from './utils/supabaseClient';
import './App.css';

const App = () => {
  const [news, setNews] = useState([]);
  const [curSelectedNav, setCurSelectedNav] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [savedNews, setSavedNews] = useState([]);
  const [page, setPage] = useState(1);

  // Check authentication status and fetch saved news on component mount
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      if (session) {
        fetchSavedNews(session.user.id); // Fetch saved news for the logged-in user
      }
    };

    checkAuth();

    // Listen for auth state changes (e.g., user logs in or out)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
      if (session) {
        fetchSavedNews(session.user.id); // Fetch saved news when user logs in
      } else {
        setSavedNews([]); // Clear saved news when user logs out
      }
    });

    return () => {
      if (subscription) {
        subscription.unsubscribe(); // Cleanup subscription
      }
    };
  }, []);

  // Fetch saved news from Supabase
  const fetchSavedNews = async (userId) => {
    const { data, error } = await supabase
      .from('saved_news')
      .select('article') // Select only the 'article' column
      .eq('user_id', userId); // Filter by user ID

    if (error) {
      console.error('Error fetching saved news:', error);
    } else {
      setSavedNews(data.map(item => item.article)); // Extract articles from the response
    }
  };

  // Save a news article to Supabase
  const handleSaveNews = async (article) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      const { error } = await supabase
        .from('saved_news')
        .insert([{ user_id: session.user.id, article }]); // Save article with user ID

      if (error) {
        console.error('Error saving news:', error);
      } else {
        setSavedNews([...savedNews, article]); // Update local state
      }
    }
  };

  // Handle navigation item clicks
  const onNavItemClick = (navItem) => {
    setCurSelectedNav(navItem);
    if (isAuthenticated) {
      fetchNews(navItem, 1).then((news) => setNews(news));
    }
  };

  // Handle search
  const handleSearch = (query) => {
    if (isAuthenticated) {
      fetchNews(query, 1).then((news) => setNews(news));
    }
  };

  // Fetch more news for infinite scroll
  const fetchMoreNews = () => {
    if (isAuthenticated) {
      const nextPage = page + 1;
      fetchNews(curSelectedNav, nextPage).then((newNews) => {
        setNews([...news, ...newNews]);
        setPage(nextPage);
      });
    }
  };

  // Render authentication screen if user is not authenticated
  if (!isAuthenticated) {
    return <Auth setIsAuthenticated={setIsAuthenticated} />;
  }

  return (
    <div>
      <Navbar
        onNavItemClick={onNavItemClick}
        curSelectedNav={curSelectedNav}
        onSearch={handleSearch}
      />
      <main>
        <InfiniteScroll
          dataLength={news.length}
          next={fetchMoreNews}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          <div className="cards-container container flex">
            {news.map((article, index) => (
              <NewsCard key={index} article={article} onSave={handleSaveNews} />
            ))}
          </div>
        </InfiniteScroll>
      </main>
    </div>
  );
};

export default App;
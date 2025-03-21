const cache = {}; // Cache object to store API responses

export const fetchNews = async (query, page = 1) => {
  const cacheKey = `${query}-${page}`; // Unique cache key

  // Return cached data if available
  if (cache[cacheKey]) {
    console.log("Returning cached data for:", cacheKey);
    return cache[cacheKey];
  }

  try {
    // Add a delay of 1 second to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Fetch data directly from the API
    const apiKey = import.meta.env.VITE_API_KEY;
    const apiUrl = `${import.meta.env.VITE_API_URI}?category=${query}&page=${page}&apiKey=${apiKey}`;

    const response = await fetch(apiUrl);

    // Check for HTTP errors
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the JSON data
    const data = await response.json();

    // Validate the data format
    if (data.news && Array.isArray(data.news)) {
      cache[cacheKey] = data.news; // Cache the response
      console.log("Cached data for:", cacheKey);
      return data.news;
    } else {
      throw new Error("Invalid data format received from API");
    }
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};
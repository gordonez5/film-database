const apiUrl = import.meta.env.VITE_API_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY;

export const getPopularMovies = async () => {
  const response = await fetch(`${apiUrl}/movie/popular?api_key=${apiKey}`);
  const data = await response.json();
  // console.log(data.results);
  return data.results;
};

export const searchMovies = async (query) => {
  const response = await fetch(
    `${apiUrl}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
      query
    )}`
  );
  const data = await response.json();
  console.log(data.results);
  return data.results;
};

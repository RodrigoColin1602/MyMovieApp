import api from "../api";

export const getTopRatedMovies = async (page = 1) => {
  try {
    const endpoint = `/movie/top_rated?language=en-US&page=${page}`;
    const res = await api.get(endpoint);
    return res.data;
  } catch (err: any) 
  {
    console.error("Error fetching top rated movies:", err);
    throw new Error("Failed to fetch top rated movies");
  }
};
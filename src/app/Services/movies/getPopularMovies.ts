import api from "../api";

export const getPopularMovies = async (page = 1) => {
  try {
    const endpoint = `/movie/popular?language=en-US&page=${page}`;
    const res = await api.get(endpoint);
    return res.data;
  } catch (err: any) 
  {
    console.error("Error fetching popular movies:", err);
    throw new Error("Failed to fetch popular movies");
  }
};
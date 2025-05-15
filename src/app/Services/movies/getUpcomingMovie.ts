import api from "../api";

export const getUpcomingMovies = async (page = 1) => {
  try {
    const endpoint = `/movie/upcoming?language=en-US&page=${page}`;
    const res = await api.get(endpoint);
    return res.data;
  } catch (err: any) {
    console.error("Error fetching upcoming movies:", err);
    throw new Error("Failed to fetch upcoming movies");
  }
};
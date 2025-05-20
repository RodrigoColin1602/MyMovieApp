import api from "../api";

export const getUpcomingMovies = async (page = 1) => {
  try {
    const endpoint = `/movie/upcoming?language=en-US&page=${page}`;
    const res = await api.get(endpoint);
    return res.data;
  } catch (err: unknown) {
    
    if (err instanceof Error) {
      console.error("Error fetching upcoming movies:", err.message);
    } else {
      console.error("Unexpected error:", err);
    }
    throw new Error("Failed to fetch upcoming movies");
  }
};

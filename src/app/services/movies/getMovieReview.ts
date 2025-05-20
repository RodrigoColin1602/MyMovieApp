import api from "../api";

export const getMovieReviews = async (movieId: number, page = 1) => {
  try {
    const endpoint = `/movie/${movieId}/reviews?language=en-US&page=${page}`;
    const res = await api.get(endpoint);
    return res.data;
  } catch (err: unknown) {
    
    if (err instanceof Error) {
      console.error("Error fetching movie reviews:", err.message);
    } else {
      console.error("Unexpected error:", err);
    }
    throw new Error("Failed to fetch movie reviews");
  }
};

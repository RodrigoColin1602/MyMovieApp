import api from "../api";

export const getMovieReviews = async (movieId: number, page = 1) => {
  try {
    const endpoint = `/movie/${movieId}/reviews?language=en-US&page=${page}`;
    const res = await api.get(endpoint);
    return res.data;
  } catch (err: any) {
    console.error("Error fetching movie reviews:", err);
    throw new Error("Failed to fetch movie reviews");
  }
};
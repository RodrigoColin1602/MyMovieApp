"use client";
import React, { useEffect, useState, useCallback } from "react";
import MovieList from "../components/MovieList/MovieList";
import { getFavoriteMovies } from "../services/accounts/getFavoriteMovies";
import { useGuestSession } from "../providers/GuestSessionContext";

interface IMovie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  overview: string;
}

const MyFavoritesClient = () => {
  const { guestSessionId } = useGuestSession();
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Wrap fetchFavorites in useCallback to prevent it from being recreated on every render
  const fetchFavorites = useCallback(async (page = 1) => {
    if (!guestSessionId) return;
    setLoading(true);
    try {
      const data = await getFavoriteMovies(guestSessionId, page);
      setMovies(data?.results || []);
      setTotalPages(data?.total_pages || 1);
    } catch (err) {
      console.error("Error loading favorite movies:", err);
    } finally {
      setLoading(false);
    }
  }, [guestSessionId]);

  useEffect(() => {
    fetchFavorites(currentPage);
  }, [guestSessionId, currentPage, fetchFavorites]); // fetchFavorites is now stable due to useCallback

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div>
      <h3 className="text-3xl font-bold mb-6">My Favorite Movies</h3>
      {loading && <h5 className="text-lg text-gray-500">Loading favorites...</h5>}

      {!loading && movies.length === 0 && (
        <div className="text-center mt-10 text-gray-600">
          <p className="text-xl">You don&apos;t have any favorite movies yet.</p>
          <p className="text-sm mt-2">
            Go to a movie&apos;s detail page and click &quot;Add to Favorites&quot; to see it here.
          </p>
        </div>
      )}

      {!loading && movies.length > 0 && (
        <>
          <MovieList movies={movies} />

          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded ${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              Previous
            </button>

            <span className="text-lg font-semibold">Page {currentPage}</span>

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded ${
                currentPage === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MyFavoritesClient;

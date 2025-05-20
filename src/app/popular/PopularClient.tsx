"use client"; // Mark as client-side component

import { Suspense, useEffect, useState } from "react"; // Use hooks to handle state and side effects
import { getPopularMovies } from "../services/movies/getPopularMovies"; // Correct import for popular movies
import MovieList from "../components/MovieList/MovieList";
import Link from "next/link";
import { useSearchParams } from "next/navigation"; // Correct import for useSearchParams


interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  overview: string;
}

interface NowPlayingMoviesResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export default function PopularClient() {
  const [data, setData] = useState<NowPlayingMoviesResponse | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  useEffect(() => {
    const parsedPage = page ? parseInt(page, 10) : 1; // Default to 1 if no page is provided
    setCurrentPage(parsedPage);

    // Fetch data inside useEffect (async logic moved here)
    const fetchData = async () => {
      try {
        const fetchedData = await getPopularMovies(parsedPage);
        setData(fetchedData);
      } catch (error) {
        console.error("Error loading popular movies:", error);
      }
    };

    fetchData();
  }, [page]); // Fetch data whenever the page query parameter changes

  if (!data) return <p>Loading...</p>; // Show loading message until data is fetched

  return (
    <Suspense>
    <div>
      <h3 className="text-3xl font-bold mb-6">Popular Movies</h3>
      <MovieList movies={data.results} />

      <div className="flex justify-center items-center gap-4 mt-6">
        {currentPage > 1 && (
          <Link
            href={`?page=${currentPage - 1}`}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Previous
          </Link>
        )}

        <span className="text-lg font-semibold">Page {currentPage}</span>

        {currentPage < data.total_pages && (
          <Link
            href={`?page=${currentPage + 1}`}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Next
          </Link>
        )}
      </div>
    </div>
    </Suspense>
  );
}

"use client"; // Ensure the component is client-side

import { useEffect, useState, Suspense } from "react"; // Use useEffect, useState, and Suspense for client-side state and data fetching
import { getTopRatedMovies } from "../services/movies/getTopRatedMovies"; // Correct import for getting top-rated movies
import MovieList from "../components/MovieList/MovieList";
import Link from "next/link";
import { useSearchParams } from "next/navigation"; // Correct import for useSearchParams

// Define types for the response data
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

export default function TopRatedClient() {
  const [data, setData] = useState<NowPlayingMoviesResponse | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  useEffect(() => {
    // Parse the page query parameter and default to 1 if invalid or null
    const parsedPage = page ? parseInt(page, 10) : 1;
    setCurrentPage(parsedPage);

    // Fetch data inside useEffect (async logic moved here)
    const fetchData = async () => {
      try {
        const fetchedData = await getTopRatedMovies(parsedPage);
        setData(fetchedData);
      } catch (error) {
        console.error("Error loading top-rated movies:", error);
      }
    };

    fetchData();
  }, [page]); // Trigger effect when `page` changes

  if (!data) return <p>Loading...</p>; // Show loading until data is fetched

  return (
    <Suspense> {/* Wrap with Suspense */}
      <div>
        <h3 className="text-3xl font-bold mb-6">Top Rated Movies</h3>
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

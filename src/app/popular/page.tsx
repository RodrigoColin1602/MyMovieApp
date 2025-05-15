// src/app/popular/page.tsx

import { getPopularMovies } from "../services/movies/getPopularMovies";
import MovieList from "../components/MovieList/MovieList";
import Link from "next/link";

interface Props {
  searchParams?: { page?: string };
}

export default async function PopularPage({ searchParams }: Props) {
  const currentPage = parseInt(searchParams?.page || "1", 10);

  try {
    const data = await getPopularMovies(currentPage);

    return (
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
    );
  } catch (error) {
    console.error("Error loading popular movies:", error);
    return <p className="text-red-500">An error occurred while loading the movies.</p>;
  }
}

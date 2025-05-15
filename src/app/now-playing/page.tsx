// src/app/now-playing/page.tsx

import { getNowPlayingMovies } from "../services/movies/getNowPlayingMovies";
import Link from "next/link";
import MovieList from "../components/MovieList/MovieList";

interface Props {
  searchParams?: { page?: string };
}

export default async function NowPlayingPage({ searchParams }: Props) {
  const currentPage = parseInt(searchParams?.page || "1", 10);
  const data = await getNowPlayingMovies(currentPage);

  return (
    <div>
      <h3 className="text-3xl font-bold mb-6">Now Playing Movies</h3>
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
}

// src/app/now-playing/page.tsx
import { getNowPlayingMovies } from "../services/movies/getNowPlayingMovies";
import Link from "next/link";
import MovieCard from "../components/MovieCard/MovieCard";
import MovieList from "../components/MovieList/MovieList";

export default async function NowPlayingPage() {
  try {
    const data = await getNowPlayingMovies();

    return (
      <div>
        <h3 className="text-3xl font-bold mb-6">Now Playing Movies</h3>
        <MovieList movies={data.results} />
      </div>
    );
  } catch (error) {
    console.error("Error loading now playing movies:", error);
    return <p className="text-red-500">Ocurrió un error al cargar las películas.</p>;
  }
}

// src/app/top-rated/page.tsx
import { getTopRatedMovies } from "../Services/movies/getTopRatedMovies";
import MovieList from "../components/MovieList/MovieList";

export default async function TopRatedPage() {
  try {
    const data = await getTopRatedMovies();

    return (
      <div>
        <h3 className="text-3xl font-bold mb-6">Top Rated Movies</h3>
        <MovieList movies={data.results} />
      </div>
    );
  } catch (error) {
    console.error("Error loading top rated movies:", error);
    return <p className="text-red-500">Ocurrió un error al cargar las películas.</p>;
  }
}

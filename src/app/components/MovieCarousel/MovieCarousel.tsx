
import MovieCard from "../MovieCard/MovieCard";
import Link from "next/link";

interface Movie {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
  release_date: string;
  overview: string;
}

interface MovieCarouselProps {
  movies: Movie[];
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ movies }) => {
  return (
    <div className="flex overflow-x-auto space-x-4 scrollbar-hide px-1">
      {movies.map((movie) => (
        <Link
          key={movie.id}
          href={{
            pathname: `/movie/${movie.id}`,
            query: { from: "home" },
          }}
          className="min-w-[200px] flex-shrink-0"
        >
          <MovieCard
            title={movie.title}
            voteAverage={movie.vote_average}
            posterPath={movie.poster_path}
            releaseYear={new Date(movie.release_date).getFullYear()}
            description={movie.overview}
          />
        </Link>
      ))}
    </div>
  );
};

export default MovieCarousel;

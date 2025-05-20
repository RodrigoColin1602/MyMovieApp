"use client";
import { useEffect, useState } from "react";
import { getUpcomingMovies } from "./services/movies/getUpcomingMovie";
import { getMovieReviews } from "./services/movies/getMovieReview";
import { getPopularMovies } from "./services/movies/getPopularMovies";
import { getTopRatedMovies } from "./services/movies/getTopRatedMovies";
import { getNowPlayingMovies } from "./services/movies/getNowPlayingMovies";
import MovieCarousel from "./components/MovieCarousel/MovieCarousel";


interface Movie {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
  release_date: string;
  overview: string;
}

interface Review {
  author: string;
  content: string;
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [reviewsMap, setReviewsMap] = useState<Record<number, Review[]>>({});
  const [loading, setLoading] = useState(false);
  const [popular, setPopular] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        
        const allUpcoming: Movie[] = [];
        for (let page = 1; page <= 3; page++) {
          const data = await getUpcomingMovies(page);
          allUpcoming.push(...data.results);
        }
        setMovies(allUpcoming);

    
        const tempReviews: Record<number, Review[]> = {};
        for (const movie of allUpcoming) {
          const res = await getMovieReviews(movie.id);
          tempReviews[movie.id] = res.results.slice(0, 2); 
        }
        setReviewsMap(tempReviews);

       
        const [popData, topData, nowData] = await Promise.all([
          getPopularMovies(),
          getTopRatedMovies(),
          getNowPlayingMovies(),
        ]);

        setPopular(popData.results);
        setTopRated(topData.results);
        setNowPlaying(nowData.results);
      } catch (err) {
        console.error("Error loading data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Welcome to Movie.com</h1>
        <p className="text-lg text-gray-600">
          Discover upcoming releases and see what people are saying
        </p>
      </div>

      <div className="mb-4">
       
      </div>

      <MovieCarousel movies={movies} />

      <div className="mt-10 p-6 bg-gray-100 rounded shadow">
        <h4 className="text-xl font-semibold mb-4">Top Reviews</h4>

        {loading ? (
          <p className="text-gray-500">Loading reviews...</p>
        ) : (
          <div className="h-[400px] overflow-y-auto space-y-6 pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 rounded">
            {movies.map((movie) => {
              const reviews = reviewsMap[movie.id];
              if (!reviews || reviews.length === 0) return null;

              return (
                <div key={movie.id}>
                  <h5 className="text-lg font-bold mb-2">{movie.title}</h5>
                  {reviews.map((review, i) => (
                    <div key={i} className="mb-2 border-b pb-2">
                      <p className="text-gray-800 italic">
                        &quot;{review.content.slice(0, 300)}...&quot;
                      </p>
                      <p className="text-sm text-gray-500 mt-1">— {review.author}</p>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-14 space-y-12">
        
      <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Top Rated</h2>
            <a href="/top-rated" className="text-blue-600 hover:underline text-sm font-medium">
              See all →
            </a>
          </div>
          <MovieCarousel movies={topRated} />
        </section>
      </div>
       
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Now Playing</h2>
            <a href="/now-playing" className="text-blue-600 hover:underline text-sm font-medium">
              See all →
            </a>
          </div>
          <MovieCarousel movies={nowPlaying} />
        </section>

      
        
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Popular Movies</h2>
            <a href="/popular" className="text-blue-600 hover:underline text-sm font-medium">
              See all →
            </a>
          </div>
          <MovieCarousel movies={popular} />
        </section>
    </div>
  );
}

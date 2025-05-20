"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { getMovieById } from "@/app/services/movies/getMovieById";
import { getMovieRecommendations } from "@/app/services/movies/getMovieRecommendation";
import { markAsFavorite } from "../../services/accounts/markAsFavorite";
import { useGuestSession } from "../../providers/GuestSessionContext";
import Config from "@/app/Config";
import { IMovieDetail } from "../../types/MovieDetail";
import { Swiper, SwiperSlide } from "swiper/react";  
import 'swiper/css';  
import 'swiper/css/navigation';  
import { Navigation } from 'swiper/modules';  
import Link from "next/link";


interface IRecommendedMovie {
  id: number;
  title: string;
  poster_path: string;
}

const MovieDetailPage = () => {
  const { id } = useParams();
  
  
  const [movie, setMovie] = useState<IMovieDetail | null>(null);
  const [recommendations, setRecommendations] = useState<IRecommendedMovie[]>([]);  
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const { guestSessionId } = useGuestSession();

  // Fetch movie details
  useEffect(() => {
    if (!id || typeof id !== "string") return;

    const fetchMovie = async () => {
      setLoading(true);
      try {
        const data = await getMovieById(id);
        setMovie(data);
      } catch (err) {
        console.error("Error fetching movie", err);
        setError("Could not load movie");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  useEffect(() => {
    if (!id || typeof id !== "string") return;

    const fetchRecommendations = async () => {
      try {
        const data = await getMovieRecommendations(id);  
        setRecommendations(data.results);  
      } catch (err) {
        console.error("Error fetching recommendations", err);
      }
    };

    fetchRecommendations();
  }, [id]);

  useEffect(() => {
    if (!id || typeof id !== "string") return;
    const storedFavorites = localStorage.getItem("favoriteMovieIds");
    const favoriteIds: number[] = storedFavorites ? JSON.parse(storedFavorites) : [];
    setIsFavorite(favoriteIds.includes(Number(id)));
  }, [id]);

  const handleToggleFavorite = async () => {
    if (!guestSessionId || !movie) return;
    const newFavoriteState = !isFavorite;
    try {
      await markAsFavorite(movie.id, newFavoriteState, guestSessionId);
      setIsFavorite(newFavoriteState);
      const storedFavorites = localStorage.getItem("favoriteMovieIds");
      const favoriteIds: number[] = storedFavorites ? JSON.parse(storedFavorites) : [];
      const updatedFavorites = newFavoriteState
        ? [...new Set([...favoriteIds, movie.id])]
        : favoriteIds.filter((id) => id !== movie.id);
      localStorage.setItem("favoriteMovieIds", JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error("Failed to update favorite:", error);
    }
  };

  if (loading) return <div>Loading movie...</div>;
  if (error) return <div>{error}</div>;
  if (!movie) return <div>No movie found</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="flex-shrink-0 mr-8">
          <Image
            src={Config.IMAGE_SOURCE + movie.poster_path}
            alt={movie.title}
            width={300}
            height={450}
            className="rounded-lg shadow-md"
          />
        </div>

        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          <p className="italic text-slate-500">{movie.tagline}</p>
          <p className="text-lg text-gray-700 mb-6">{movie.overview}</p>

          <div className="bg-blue-100 p-6 rounded-lg shadow-md mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <div className="font-bold">Release Date:</div>
                <p>{new Date(movie.release_date).toLocaleDateString()}</p>
              </div>

              <div>
                <div className="font-bold">Genres:</div>
                <p>{movie.genres ? movie.genres.map((genre) => genre.name).join(", ") : "N/A"}</p>
              </div>

              <div>
                <div className="font-bold">Rating:</div>
                <p>{movie.vote_average} / 10</p>
              </div>

              <div>
                <div className="font-bold">Runtime:</div>
                <p>{movie.runtime} min</p>
              </div>

              <div>
                <div className="font-bold">Language:</div>
                <p>{movie.original_language.toUpperCase()}</p>
              </div>

              <div>
                <div className="font-bold">Production Companies:</div>
                <p>{movie.production_companies ? movie.production_companies.map((company) => company.name).join(", ") : "N/A"}</p>
              </div>
            </div>
          </div>

          <button
            onClick={handleToggleFavorite}
            className={`px-4 py-2 rounded ${
              isFavorite
                ? "bg-red-500 hover:bg-red-600"
                : "bg-yellow-500 hover:bg-yellow-600"
            } text-white font-bold w-max`}
          >
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Recommended Movies</h2>
        <Swiper
          spaceBetween={20}          
          slidesPerView={6}         
          loop={true}               
          navigation={true}         
          modules={[Navigation]}   
        >
          {recommendations.map((movie) => (
            <SwiperSlide key={movie.id}>
              <Link href={`/movie/${movie.id}`}>  
                <div className="p-4 border rounded-lg shadow-lg">
                  <Image
                    src={Config.IMAGE_SOURCE + movie.poster_path}
                    alt={movie.title}
                    width={220}   
                    height={330} 
                    className="rounded-md"
                  />
                  <p className="mt-2 font-semibold">{movie.title}</p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default MovieDetailPage;

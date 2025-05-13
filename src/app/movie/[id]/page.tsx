"use client";

import Image from "next/image";
import Config from "@/app/Config";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { getMovieById } from "@/app/services/movies/getMovieById";

const MovieDetailPage = () => {
  const { id } = useParams(); // id is a string | string[] | undefined
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  console.log(from);

  const [movie, setMovie] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) return <div>Loading movie...</div>;
  if (error) return <div>{error}</div>;
  if (!movie) return <div>No movie found</div>;

  return (
    <div className="p-6 mt-10 bg-white">
      <div className="flex">
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
          <p className="text-lg text-gray-700 mb-6">{movie.overview}</p>

          <div className="bg-blue-100 p-6 rounded-lg shadow-md mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <div className="font-bold">Release Date:</div>
                <p>{movie.release_date}</p>
              </div>

              <div>
                <div className="font-bold">Genres:</div>
                <p>{movie.genres ? movie.genres.map((genre: any) => genre.name).join(", ") : "N/A"}</p>
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
                <p>{movie.production_companies ? movie.production_companies.map((company: any) => company.name).join(", ") : "N/A"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;

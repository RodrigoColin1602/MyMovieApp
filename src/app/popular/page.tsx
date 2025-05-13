
// Se renderiza en el servidor
// src/app/popular/page.tsx
import { getPopularMovies } from "../Services/movies/getPopularMovies";
import MovieList from "../components/MovieList/MovieList";

export default async function PopularPage() {
  try {
    const data = await getPopularMovies();

    return (
      <div>
        <h3 className="text-3xl font-bold mb-6">Popular Movies</h3>
        <MovieList movies={data.results} />
      </div>
    );
  } catch (error) {
    console.error("Error loading popular movies:", error);
    return <p className="text-red-500">Ocurrió un error al cargar las películas.</p>;
  }
}



// No se renderiza en el server
/*
'use client';

import React, { useEffect, useState } from "react";
import { getPopularMovies } from "@/app/Services/movies/getPopularMovies";

const PopularClientPage = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate 2s delay
      try {
        const data = await getPopularMovies();
        setMovies(data.results);
      } catch (err) {
        console.error("Error loading movies: ", err);
      }
      setLoading(false);
    };

    fetchPopularMovies();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Client-rendered Popular Movies</h2>
      {loading && <p className="text-sm text-muted-foreground">Cargando...</p>}
      {movies.map((movie) => (
        <div key={movie.id}>
          <span>{movie.title}</span>
        </div>
      ))}
    </div>
  );
};

export default PopularClientPage;
*/
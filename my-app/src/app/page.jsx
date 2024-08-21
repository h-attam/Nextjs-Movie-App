import Movies from "@/components/Movies";
import React from "react";

// API anahtarı
const apiKey = "6822aec013f287a967b3e9e8c86db5ed";

const Page = async ({ searchParams }) => {
  // Arama anahtar kelimesi (varsayılan 'default' olarak ayarlanmıştır)
  const keyword = searchParams.query || "default";
  
  // API isteği URL'leri
  const popularMoviesUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US`;
  const latestMoviesUrl = `https://api.themoviedb.org/3/movie/latest?api_key=${apiKey}&language=en-US`;
  const upcomingMoviesUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US`;

  // Veri çekme işlemleri
  const fetchMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    return data.results || [data]; // Eğer 'results' yoksa (örneğin, 'latest' için), doğrudan döndür
  };

  // Veri çekme işlemlerini başlat
  const [popularMovies, latestMovie, upcomingMovies] = await Promise.all([
    fetchMovies(popularMoviesUrl),
    fetchMovies(latestMoviesUrl),
    fetchMovies(upcomingMoviesUrl)
  ]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4"> En Popüler </h1>
      <div className="flex flex-wrap gap-4">
        {popularMovies.map((dt, i) => (
          <Movies key={`popular-${i}`} dt={dt} />
        ))}
      </div>

      <h1 className="text-2xl font-bold my-4">En Son </h1>
      {latestMovie && (
        <div className="max-h-[300px] overflow-hidden rounded-lg">
          <Movies dt={latestMovie[0]} />
        </div>
      )}

      <h1 className="text-2xl font-bold mt-4">Yakında Gelecekler</h1>
      <div className="flex flex-wrap gap-4">
        {upcomingMovies.map((dt, i) => (
          <Movies key={`upcoming-${i}`} dt={dt} />
        ))}
      </div>
    </div>
  );
};

export default Page;

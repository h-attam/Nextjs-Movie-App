import Image from "next/image";
import React from "react";

const getMovie = async (id) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=6822aec013f287a967b3e9e8c86db5ed`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch movie data");
  }

  return await res.json();
};

const Page = async ({ params }) => {
  const id = params.id;
  const movieDetail = await getMovie(id);

  console.log(id, "id");

  return (
    <div className="relative p-7 min-h-screen">
      <Image
        fill
        src={`https://image.tmdb.org/t/p/original/${
          movieDetail?.backdrop_path || movieDetail?.poster_path
        }`}
        alt={movieDetail?.title || "Movie Poster"}
        style={{ objectFit: "cover" }}
      />

      <div className="absolute">
        <div className="text-4xl font-bold my-3">{movieDetail?.title}</div>
        <div className="w-1/2">{movieDetail?.overview || "Overview not available"}</div>
        <div className="my-3">
          {movieDetail?.release_date || "Tarih Yok"}{" "}
          {movieDetail?.vote_average ? ` | Puan: ${movieDetail.vote_average}` : ""}
        </div>
        <div className="my-2 border w-32 hover:bg-white hover:text-black p-2 rounded-md text-center text-lg cursor-pointer">Trail</div>
      </div>
    </div>
  );
};

export default Page;

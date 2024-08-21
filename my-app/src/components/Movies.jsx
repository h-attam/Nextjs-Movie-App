"use client";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const Movies = ({ dt }) => {
  const router = useRouter();

  // Kontrol için geçici olarak dt içeriğini konsola yazdır
  console.log(dt);

  const imageUrl = dt?.backdrop_path
    ? `https://image.tmdb.org/t/p/original/${dt.backdrop_path}`
    : dt?.poster_path
    ? `https://image.tmdb.org/t/p/original/${dt.poster_path}`
    : '/path/to/placeholder-image.jpg'; // Placeholder resmi ekleyin

  return (
    <div 
      onClick={() => router.push(`/movie/${dt?.id}`)} 
      className='relative w-[450px] h-[450px] imgContainer cursor-pointer'
    >
      <Image
        src={imageUrl}
        alt={dt?.title || "Movie Poster"}
        fill
        style={{ objectFit: 'cover' }} 
      />
      <div className='absolute bottom-0 p-2 w-full h-full flex-col justify-end opacity-0 hover:opacity-100 transition-opacity'>
        <div className='text-2xl font-bold'>
          {dt?.title || "Başlık Yok"}
        </div>
        <div>
          {dt?.release_date || "Tarih Yok"} {dt?.vote_average ? ` | Puan: ${dt.vote_average}` : ''}
        </div>
      </div>
    </div>
  );
}

export default Movies;

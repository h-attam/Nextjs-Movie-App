import Movies from '@/components/Movies';
import React from 'react';

const Page = async({ params }) => {
    const keyword = params.keyword;

    const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=6822aec013f287a967b3e9e8c86db5ed&query=${keyword}&language=en-US&include_adult=false`
    );
    const data = await res.json();

    return (
        <div className="p-4">
            {!data.results ? (
                <div>No Results Found!!!</div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {data.results.map((dt, key) => (
                        <div
                            key={key}
                            className="max-h-[300px] overflow-hidden rounded-lg"
                            style={{ height: "300px", width: "100%" }}
                        >
                            <Movies dt={dt} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Page;

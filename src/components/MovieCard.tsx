import * as React from 'react';

interface ExpenditureDynamicsProps {
    movie: {
        Poster: string;
        Title: string;
        Type: string;
        Year: string;
        imdbID: string;
    };
}
const MovieCard: React.FC<ExpenditureDynamicsProps> = ({ movie }) => {
    return (
        <>
            <div className="wrapper">
                <div className="left-section">
                    <img
                        className="image-skeleton"
                        src={`https://picsum.photos/345/194?random=${Math.floor(
                            Math.random() * 100
                        )}`}
                        alt={movie.Title}
                    />
                </div>
                <div className="right-section">
                    <p className="text-skeleton movie-title">{movie.Title}</p>
                    <p className="year-skeleton movie-title">{movie.Year}</p>
                </div>
            </div>
        </>
    );
};

export default MovieCard;

import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import movieStore from '../stores/MovieStore';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import MovieCard from './MovieCard';
import { Movie } from '../api/getMovies';

const PostList: React.FC = observer(() => {
    const movies = movieStore.movies
        ? (movieStore.movies.value as Movie[])
        : [];

    const loadMore = () => {
        movieStore.incrementPage();
    };

    const [sentryRef] = useInfiniteScroll({
        loading: !movieStore.movies,
        hasNextPage: true,
        onLoadMore: loadMore,
    });

    useEffect(() => {
        movieStore.fetchMovies(movieStore.currentPage);
    }, []);

    return (
        <div className="container">
            <SkeletonTheme baseColor="#dfdfdf" highlightColor="#e9e9e9">
                {movies?.map((movie: Movie, index: number) => (
                    <div key={index}>
                        <MovieCard movie={movie} />
                    </div>
                ))}
                {Array.from(new Array(2)).map((e, i) => (
                    <div className="wrapper" key={i}>
                        <div className="left-section">
                            <Skeleton className="image-skeleton" />
                        </div>
                        <div className="right-section">
                            <div>
                                <Skeleton className="text-skeleton" />
                                <Skeleton className="text-skeleton" />
                            </div>
                            <Skeleton className="year-skeleton" />
                        </div>
                    </div>
                ))}
            </SkeletonTheme>
            <div ref={sentryRef} />
        </div>
    );
});

export default PostList;

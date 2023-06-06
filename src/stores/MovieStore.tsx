import { makeAutoObservable, reaction } from 'mobx';
import { fromPromise, IPromiseBasedObservable } from 'mobx-utils';
import { Movie, getMovies } from '../api/getMovies';

class Store {
    movies?: IPromiseBasedObservable<Movie[]>;
    currentPage: number = 1;

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => this.currentPage,
            (page) => {
                this.fetchMovies(page);
            }
        );
    }

    fetchMovies = async (page: number) => {
        setTimeout(async () => {
            const newMovies = await getMovies(page);

            if (!Array.isArray(newMovies)) {
                console.error('Error: Response is not an array');
                return;
            }

            if (this.movies) {
                const exitingMovies = await this.movies;
                this.movies = fromPromise(
                    Promise.resolve([...exitingMovies, ...newMovies])
                );
            } else {
                this.movies = fromPromise(Promise.resolve([...newMovies]));
            }
        }, 1000);
    };

    incrementPage = () => {
        this.currentPage += 1;
    };
}

const PostStore = new Store();

export default PostStore;

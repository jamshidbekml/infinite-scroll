import axios, { AxiosResponse } from 'axios';

export interface Movie {
    Poster: string;
    Title: string;
    Type: string;
    Year: string;
    imdbID: string;
}

interface ApiResponse {
    Search: Movie[];
}
export const getMovies = async (page: number = 1) => {
    const response: AxiosResponse<ApiResponse> = await axios.get(
        `https://www.omdbapi.com/?apikey=16bb7ce6&s=spider man&page=${page}`
    );
    return response.data.Search;
};

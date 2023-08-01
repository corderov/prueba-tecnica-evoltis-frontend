import { Movie } from "./movie";

export interface MoviesState {
  loading: boolean;
  movies: ReadonlyArray<Movie>;
}
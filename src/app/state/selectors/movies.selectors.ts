import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { MoviesState } from "src/app/models/movies.state";


export const selectMoviesFeature = (state: AppState) => state.movies;


export const selectListMovies = createSelector(
  selectMoviesFeature,
  (state: MoviesState) => state.movies
)

export const selectLoading = createSelector(
  selectMoviesFeature,
  (state: MoviesState) => state.loading
)
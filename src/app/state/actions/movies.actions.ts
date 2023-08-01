import { createAction, props } from '@ngrx/store';
import { Movie } from 'src/app/models/movie';


export const loadMovies = createAction('[Movie List] Load Movies');

export const loadedMovies = createAction(
  '[Movie List] Loaded Movies',
  props<{movies: Movie[]}>()
)

export const addMovie = createAction(
  '[Movie] Add Movie',
  props<{ movie: Movie }>()
);

export const updateMovie = createAction(
  '[Movie] Update Movie',
  props<{ movie: Movie }>()
);

export const deleteMovie = createAction(
  '[Movie] Delete Movie',
  props<{ id: number }>()
);
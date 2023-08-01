import { createReducer, on } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';

import { Movie } from 'src/app/models/movie';
import { loadMovies, loadedMovies } from '../actions/movies.actions';
import { MoviesState } from 'src/app/models/movies.state';

export const movieAdapter = createEntityAdapter<Movie>();

export const initialState: MoviesState = {loading: false, movies: []}

export const moviesReducer = createReducer(
  initialState,
  on(loadMovies, state => { return {...state, loading: true}}),
  on(loadedMovies, (state, {movies}) => { return {...state, loading: false, movies}}),
  
  // on(MovieActions.addMovie, (state, { movie }) => movieAdapter.addOne(movie, state)),
  // on(MovieActions.updateMovie, (state, { movie }) => movieAdapter.updateOne({ id: movie.id, changes: movie }, state)),
  // on(MovieActions.deleteMovie, (state, { id }) => movieAdapter.removeOne(id, state))
);
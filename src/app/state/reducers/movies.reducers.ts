import { createReducer, on } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';

import { Movie } from 'src/app/models/movie';
import { addMovie, deleteMovie, loadMovies, loadedMovies, updateMovie } from '../actions/movies.actions';
import { MoviesState } from 'src/app/models/movies.state';

export const movieAdapter = createEntityAdapter<Movie>();

export const initialState: MoviesState = {loading: false, movies: []}

export const moviesReducer = createReducer(
  initialState,
  on(loadMovies, state => { return {...state, loading: true}}),
  on(loadedMovies, (state, {movies}) => { return {...state, loading: false, movies}}),
  on(addMovie, (state, { movie }) => { return {...state, loading: false, movies: [...state.movies, movie]}}),
  on(updateMovie, (state, { movie }) => {
    return {
      ...state,
      loading: false,
      movies: state.movies.map(m =>
        m.id === movie.id ? { ...m, ...movie } : m
      )
    };
  }),
  on(deleteMovie, (state, { movie }) => {
    const updatedMovies = state.movies.filter(m => m.id !== movie.id);
    return { ...state, loading: false, movies: updatedMovies };
  })
);
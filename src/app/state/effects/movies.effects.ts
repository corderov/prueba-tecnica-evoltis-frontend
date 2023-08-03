import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { MoviesService } from 'src/app/services/movies.service';
import { addMovie } from '../actions/movies.actions';
 
@Injectable()
export class MovieEffects {
 
  login$ = createEffect(() => this.actions$.pipe(
    ofType('[Movie List] Load Movies'),
    mergeMap(()=> this.moviesService.getAllMovies()
    .pipe(
      map(movies => ({type: '[Movie List] Loaded Movies', movies})),
      catchError(() => EMPTY)
    ))
  )

  );


 
  constructor(
    private actions$: Actions,
    private moviesService: MoviesService
  ) {}
}
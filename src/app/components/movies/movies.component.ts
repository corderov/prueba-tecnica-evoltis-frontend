import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';
import { loadMovies, loadedMovies } from 'src/app/state/actions/movies.actions';
import { AppState } from 'src/app/state/app.state';
import { selectListMovies, selectLoading } from 'src/app/state/selectors/movies.selectors';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  providers: [MoviesService, MessageService]
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = []
  loading$: Observable<boolean> = new Observable()
  movies$: Observable<any> = new Observable()

  constructor(private store:Store<AppState>, private moviesService: MoviesService, private router: Router, private messageService: MessageService) {}

  
  
  ngOnInit () : void {
    this.loading$ = this.store.select(selectLoading)
    this.store.dispatch(loadMovies())
    this.moviesService.getAllMovies().subscribe(
      (result : Movie[]) => this.store.dispatch(loadedMovies({movies:result})));
    this.movies$ = this.store.select(selectListMovies)
  
  }


  deleteMovie(movie: Movie) {
    
    this.moviesService.deleteMovie(movie).subscribe( 
      (response: boolean) => {
        this.messageService.add({severity:'success', summary:`Pelicula eliminada con exito!`});
        this.movies = this.movies.filter((m) => m !== movie);
      },
      (error: Error) => {
        this.messageService.add({ severity: 'error', summary: 'Error al actualizar película' });
      }
     
    );
  }

  redirectToAddForm() {
    this.router.navigateByUrl('/add-movie');
  }

  redirectToReadForm(movieId: number) {
    this.router.navigate(['movie', movieId]);
  }

  redirectToEditForm(movieId: number) {
    this.router.navigate(['edit-movie', movieId]);
  }


}

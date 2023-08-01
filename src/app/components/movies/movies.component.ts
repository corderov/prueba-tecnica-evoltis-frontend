import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  providers: [MoviesService, MessageService]
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = []

  constructor(private moviesService: MoviesService, private router: Router, private messageService: MessageService) {}

  
  
  ngOnInit () : void {
    this.moviesService.getAllMovies().subscribe((result : Movie[]) => (this.movies = result));
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

  redirectToEditForm(movieId: number) {
    this.router.navigate(['edit-movie', movieId]);
  }


}

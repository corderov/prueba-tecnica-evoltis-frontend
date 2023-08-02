import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';
import { addMovie, updateMovie } from 'src/app/state/actions/movies.actions';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css'],
  providers: [MoviesService, MessageService]
})
export class MovieFormComponent {
  
  movieId!: number;
  movieForm!: FormGroup;
  constructor(
    private store:Store<AppState>, 
    private formBuilder: FormBuilder, 
    private moviesService: MoviesService, 
    private route: ActivatedRoute, 
    private router: Router, 
    private messageService: MessageService) {}


  ngOnInit() {
    this.movieForm = this.formBuilder.group({
      id: [null],
      title: ['', Validators.required],
      genre: ['', Validators.required],
      director: ['', Validators.required],
      year: [null, [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      synopsis: [''],
      duration: [null, Validators.required],
      country: [''],
      language: [''],
      image: ['']
    });

  

    //Obtengo id que paso por la ruta
    this.route.paramMap.subscribe(params => {
      const movieId = Number(params.get('id'));
      if (!isNaN(movieId)) {
        this.movieId = movieId
        this.getMovieById(movieId);
      }
    });

  }

  getMovieById(movieId: number) {
    this.moviesService.getById(movieId).subscribe((movie) => {
      this.movieForm.patchValue(movie)
    })
  }

  onSubmit() {
    if (this.movieForm.valid) {
      const newMovie: Movie = this.movieForm.value;
      if (this.movieId) {

        //Actualizando pelicula
        newMovie.id = this.movieId; 
        this.moviesService.updateMovie(newMovie).subscribe({
          next: (response: Movie) => {
            this.messageService.add({severity:'success', summary:`Pelicula ${newMovie.title} actualizada con exito!`});
            this.store.dispatch(updateMovie({movie: response}))
          },
          error:(error: Error) => {
            this.messageService.add({ severity: 'error', summary: `Error al actualizar película ${newMovie.title}` });
          }
        } 
        );
      } else {

        //Creando nueva pelicula
        this.moviesService.addMovie(newMovie).subscribe({
          next: (response: Movie) => {
            this.messageService.add({severity:'success', summary:'Pelicula creada con exito!'});
            this.store.dispatch(addMovie({movie: response}))
            this.router.navigateByUrl('/movies')
          },
          error: (error: Error) => {
            this.messageService.add({ severity: 'error', summary: 'Error al crear película' });
          }
        }
          
        );
      }
    }
  }

  goBack() {
    this.router.navigate([".."]);
  }
}

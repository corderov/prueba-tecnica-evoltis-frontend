import { Component, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css'],
  providers: [MoviesService, MessageService]
})
export class MovieFormComponent {
  @Input() movieId!: number;
  movieForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private moviesService: MoviesService, private route: ActivatedRoute, private router: Router, private messageService: MessageService) {}



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

    this.route.paramMap.subscribe(params => {
      const movieId = Number(params.get('id'));
      if (!isNaN(movieId)) {
        this.movieId = movieId
        this.loadMovieDetails(movieId);
      }
    });

  }

  loadMovieDetails(movieId: number) {

    this.moviesService.getById(movieId).subscribe((movie) => {
      this.movieForm.patchValue(movie)
    })
  }

  onSubmit() {
    if (this.movieForm.valid) {
      const newMovie: Movie = this.movieForm.value;
      
      if (this.movieId) {
        // Estamos editando una película existente
        newMovie.id = this.movieId; // Asumiendo que el ID de la película es parte del modelo "Movie"
        this.moviesService.updateMovie(newMovie).subscribe(
          () => {
            this.messageService.add({severity:'success', summary:`Pelicula actualizada con exito!`});
          },
          (error: Error) => {
            this.messageService.add({ severity: 'error', summary: 'Error al actualizar película' });
          }
        );
      } else {
        // Estamos agregando una nueva película
        this.moviesService.addMovie(newMovie).subscribe(
          (response: Movie) => {
            this.messageService.add({severity:'success', summary:`Pelicula creada con exito!`});
            this.router.navigateByUrl('/movies')
          },
          (error: Error) => {
            this.messageService.add({ severity: 'error', summary: 'Error al crear película' });
          }
        );
      }
    }
  }


  goBack() {
    this.router.navigate(['/movies']);
  }
}

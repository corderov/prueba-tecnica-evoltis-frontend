import { Component } from '@angular/core';
import { Movie } from './models/movie';
import { MoviesService } from './services/movies.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'moviesApp';
  
}

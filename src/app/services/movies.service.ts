import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/models/movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private apiUrl :string;
  private _mode: 'read' | 'edit' | 'create' = 'read';

  get mode(): 'read' | 'edit' | 'create' {
    return this._mode;
  }

  setMode(mode: 'read' | 'edit' | 'create') {
    this._mode = mode;
  }
  
  constructor(private http: HttpClient) {
    this.apiUrl = 'https://localhost:7129/api/Movies';
   }

  public getAllMovies() : Observable<Movie[]>  {
    return this.http.get<Movie[]>(this.apiUrl)
  }

  public deleteMovie(movie: Movie) :  Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/?id=${movie.id}`)
  }

  public getById(id: number) :  Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/${id}`)
  }

  public addMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.apiUrl, movie);
  }

  public updateMovie(movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(this.apiUrl, movie);
  }
}

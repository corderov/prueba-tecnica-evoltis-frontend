export class Movie {
  id?: number;
  title: string;
  genre: string;
  director: string;
  year: number;
  synopsis?: string;
  duration: number;
  country?: string;
  language?: string;
  image?: string;

  constructor(
    genre: string,
    director: string,
    year: number,
    duration: number,
    title = '',
    synopsis?: string,
    country?: string,
    language?: string,
    image?: string
  ) {
    this.genre = genre;
    this.director = director;
    this.year = year;
    this.duration = duration;
    this.title = title;
    this.synopsis = synopsis;
    this.country = country;
    this.language = language;
    this.image = image;
  }
}
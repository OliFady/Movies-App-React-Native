export default class Movie {
  constructor({
    id,
    name,
    poster_path,
    backdrop_path,
    overview,
    popularity,
    release_date,
    vote_average,
    vote_count,
    first_air_date,
  }) {
    (this.id = id),
      (this.name = name),
      (this.poster_path = poster_path),
      (this.backdrop_path = backdrop_path),
      (this.overview = overview),
      (this.popularity = popularity),
      (this.release_date = release_date),
      (this.vote_average = vote_average),
      (this.vote_count = vote_count);
    this.first_air_date = first_air_date;
  }
}

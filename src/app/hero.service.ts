import { Hero } from "./hero";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { MessageService } from "./message.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class HeroService {
  private heroesUrl = "api/heroes"; // URL to web api.

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {
    // Angular injects the singleton MessageService into the
    // property when it creates HeroService.
  }

  getHeroes(): Observable<Hero[]> {
    // Get array of heroes from the server.
    // TODO: send message _after_ fetching the heroes.
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      // Log transaction.
      tap(_ => this.log("Fetched heroes")),
      // Error handling.
      catchError(this.handleError("getHeroes", []))
    );
  }

  getHero(id: Number): Observable<Hero> {
    // Get hero by ID from server. Will 404 if ID not found.
    // TODO: send message _after_ fetching the hero.
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      // Log transaction.
      tap(_ => this.log(`Fetched hero id=${id}`)),
      // Error handling.
      catchError(this.handleError<Hero>(`GetHero id=${id}`))
    );
  }

  updateHero(hero: Hero): Observable<any> {
    // Update hero in server.

    // Heroes web api expects special header in HTTP save requests.
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };

    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      // Log transaction.
      tap(_ => this.log(`Updated hero id=${hero.id}`)),
      // Error handling.
      catchError(this.handleError<any>("UpdateHero"))
    );
  }

  /** POST: add a new hero to the server. */
  addHero(hero: Hero): Observable<Hero> {
    // Add new hero to server.

    // Heroes web api expects special header in HTTP save requests.
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };

    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      // Log transaction.
      tap((newHero: Hero) => this.log(`Added hero w/ id=${newHero.id}`)),
      // Error handling.
      catchError(this.handleError<Hero>("AddHero"))
    );
  }

  /** DELETE: delete the hero from the server. */
  deleteHero(hero: Hero | number): Observable<Hero> {
    // Heroes web api expects special header in HTTP save requests.
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    const id = typeof hero === "number" ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, httpOptions).pipe(
      // Log transaction.
      tap(_ => this.log(`Delete hero id=${id}`)),
      // Error handling.
      catchError(this.handleError<Hero>("DeleteHero"))
    );
  }

  private log(message: string) {
    // Log a HeroService message with the MessageService.
    this.messageService.add(`HeroService: ${message}`);
  }

  private handleError<T>(operation = "operation", result?: T) {
    // Handle Http operation that failed.
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure.
      console.error(error); // Log to console instead.

      // TODO: Better job of transforming error for user consumption.
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

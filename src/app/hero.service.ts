import { Hero } from "./hero";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { MessageService } from "./message.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";

// Heroes web api expects special header in HTTP save requests.
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

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

  /** GET: heroes from the server. */
  getHeroes(): Observable<Hero[]> {
    // Get array of heroes from the server.
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      // Log transaction.
      tap(_ => this.log("Fetched heroes")),
      // Error handling.
      catchError(this.handleError("getHeroes", []))
    );
  }

  /** GET: hero by ID. Will 404 if ID not found. */
  getHero(id: Number): Observable<Hero> {
    // Create URL.
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      // Log transaction.
      tap(_ => this.log(`Fetched hero id=${id}`)),
      // Error handling.
      catchError(this.handleError<Hero>(`GetHero id=${id}`))
    );
  }

  /** GET: hero by ID. Return "undefined" when ID not found. */
  getHeroNo404<Data>(id: Number): Observable<Hero> {
    // Create URL.
    const url = `${this.heroesUrl}/?id=${id}`;

    return this.http.get<Hero[]>(url).pipe(
      map(heroes => heroes[0]), // Returns {0|1} element array.
      tap(h => {
        const outcome = h ? "Fetched" : "Did not find";
        // Log transaction.
        this.log(`${outcome} hero id=${id}`);
      }),
      catchError(this.handleError<Hero>(`GetHero id=${id}`))
    );
  }

  /** GET: heroes whose name contains search term. */
  searchHeroes(term: string): Observable<Hero[]> {
    // If not search term, return empty hero array.
    if (!term.trim()) {
      return of([]);
    }

    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      // Log transaction.
      tap(_ => this.log(`Found heroes matching ${term}`)),
      // Error handling.
      catchError(this.handleError<Hero[]>("SearchHeroes", []))
    );
  }

  /** PUT: update the hero on the server. */
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      // Log transaction.
      tap(_ => this.log(`Updated hero id=${hero.id}`)),
      // Error handling.
      catchError(this.handleError<any>("UpdateHero"))
    );
  }

  /** POST: add a new hero to the server. */
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      // Log transaction.
      tap((newHero: Hero) => this.log(`Added hero w/ id=${newHero.id}`)),
      // Error handling.
      catchError(this.handleError<Hero>("AddHero"))
    );
  }

  /** DELETE: delete the hero from the server. */
  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === "number" ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, httpOptions).pipe(
      // Log transaction.
      tap(_ => this.log(`Delete hero id=${id}`)),
      // Error handling.
      catchError(this.handleError<Hero>("DeleteHero"))
    );
  }

  /** Log a HeroService message with the MessageService. */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  /** Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that fialed.
   * @param result - optional value to return as the Observable result.
   */
  private handleError<T>(operation = "operation", result?: T) {
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

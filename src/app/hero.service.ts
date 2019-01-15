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
      tap(_ => this.log("Fetched heroes")),
      catchError(this.handleError("getHeroes", []))
    );
  }

  getHero(id: Number): Observable<Hero> {
    // Get hero by ID from server. Will 404 if ID not found.
    // TODO: send message _after_ fetching the hero.
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`Fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`GetHero id=${id}`))
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

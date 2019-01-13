import { HEROES } from "./mock-heroes";
import { Hero } from "./hero";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class HeroService {
  constructor() {}

  getHeroes(): Observable<Hero[]> {
    // Return an observable array of Heroes.
    return of(HEROES);
  }
}

import { HEROES } from "./mock-heroes";
import { Hero } from "./hero";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { MessageService } from "./message.service";

@Injectable({
  providedIn: "root"
})
export class HeroService {
  constructor(private messageService: MessageService) {
    // Angular injects the singleton MessageService into the
    // property when it creates HeroService.
  }

  getHeroes(): Observable<Hero[]> {
    // Return an observable array of Heroes.
    // TODO: send message _after_ fetching the heroes.
    this.messageService.add("HeroService: fetched heroes");
    return of(HEROES);
  }
}

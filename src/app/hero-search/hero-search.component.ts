import { Component, OnInit } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";

@Component({
  selector: "app-hero-search",
  templateUrl: "./hero-search.component.html",
  styleUrls: ["./hero-search.component.css"]
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;

  // Subject is both source of Obversable and an Observable itself.
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // Wait 300ms after each keystroke _before_ considering the term.
      debounceTime(300),

      // Ignore new term if same as previous term.
      distinctUntilChanged(),

      // Switch to new search Observable each time the term changes.
      switchMap((term: string) => this.heroService.searchHeroes(term))
    );
  }

  // Push a search term into the Observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }
}

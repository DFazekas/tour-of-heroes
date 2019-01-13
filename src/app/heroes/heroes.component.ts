import { HeroService } from "./../hero.service";
import { Component, OnInit } from "@angular/core";
import { Hero } from "../hero";

@Component({
  selector: "app-heroes",
  templateUrl: "./heroes.component.html",
  styleUrls: ["./heroes.component.css"]
})
export class HeroesComponent implements OnInit {
  selectedHero: Hero;
  heroes: Hero[];

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  getHeroes(): void {
    // Waits for the Observable to emit the array of heroes.
    // Subcribe acts like `then()`.
    this.heroService.getHeroes().subscribe(heroes => (this.heroes = heroes));
  }

  constructor(private heroService: HeroService) {
    // When created, the Dependency Injection system sets
    // the heroService paramater to the singleton instance
    // of HeroService.
  }

  ngOnInit() {
    // Get array of heroes
    this.getHeroes();
  }
}

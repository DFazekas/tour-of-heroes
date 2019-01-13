import { HeroService } from "./../hero.service";
import { HEROES } from "./../mock-heroes";
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
    // Retreive array of heroes from HeroService.
    this.heroes = this.heroService.getHeroes();
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

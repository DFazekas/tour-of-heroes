import { Component, OnInit } from "@angular/core";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) {
    // When created, the Dependency Injection system sets
    // the heroService paramater to the singleton instance
    // of HeroService.
  }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    // Retrieve array of heroes from HeroService and continue listening for changes.
    this.heroService
      .getHeroes()
      .subscribe(heroes => (this.heroes = heroes.slice(1, 5)));
  }
}

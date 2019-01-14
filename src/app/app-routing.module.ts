import { HeroesComponent } from "./heroes/heroes.component";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HeroDetailComponent } from "./hero-detail/hero-detail.component";

const routes: Routes = [
  // Default route.
  { path: "", redirectTo: "/dashboard", pathMatch: "full" },
  { path: "dashboard", component: DashboardComponent },
  // Parameterized route.
  { path: "detail/:id", component: HeroDetailComponent },
  { path: "heroes", component: HeroesComponent }
];

@NgModule({
  imports: [
    // Initialize router and start listening for browser location changes.
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

import { HeroesComponent } from "./heroes/heroes.component";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard/dashboard.component";

const routes: Routes = [
  // Default route.
  { path: "", redirectTo: "/dashboard", pathMatch: "full" },
  { path: "heroes", component: HeroesComponent },
  { path: "dashboard", component: DashboardComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [
    // Initialize router and start listening for browser location changes.
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule {}

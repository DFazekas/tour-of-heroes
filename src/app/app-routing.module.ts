import { HeroesComponent } from "./heroes/heroes.component";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

// TODO: FIX
// @NgModule({
//   exports: [RouterModule],
//   imports: [
//     // Initialize router and start listening for browser location changes.
//     RouterModule.forRoot(routes)
//   ]
// })

const routes: Routes = [{ path: "heroes", component: HeroesComponent }];

export class AppRoutingModule {}

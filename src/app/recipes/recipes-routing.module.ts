import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeResolverService } from './recipe-resolver.service';
import { AuthGuard } from '../auth/auth.guard';


const routes: Routes = [
  {path: 'recipes', component:RecipesComponent , canActivate: [AuthGuard],
  children:[
   {path: '', component:RecipeStartComponent},
   {path:'new', component:RecipeEditComponent},
   {path:':id', component: RecipeDetailComponent, resolve:[RecipeResolverService]},
   {path:':id/edit', component:RecipeEditComponent, resolve:[RecipeResolverService]}
 ]},
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class RecipesRoutingModule { }

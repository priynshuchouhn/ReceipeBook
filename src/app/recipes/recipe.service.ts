import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe('Test recipe','test recipe description','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJzgEEMhdw7pfkMvfWhBtYQ1mj9juAEEtITg&usqp=CAU'),
    new Recipe('Test 2 recipe','test recipe description','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJzgEEMhdw7pfkMvfWhBtYQ1mj9juAEEtITg&usqp=CAU')
  ];

  getRecipeList(){
    return this.recipes.slice();
  }

  constructor() { }
}

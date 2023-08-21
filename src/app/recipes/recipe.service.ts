import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredients } from '../shared/ingredients.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

recipeChange = new Subject<Recipe[]>();

recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe('Test recipe',
    'test recipe description',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJzgEEMhdw7pfkMvfWhBtYQ1mj9juAEEtITg&usqp=CAU',
    [
      new Ingredients('apples', 2),
      new Ingredients('tomatoes', 20),
    ]
    ),
    new Recipe('Test 2 recipe',
    'test recipe description',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJzgEEMhdw7pfkMvfWhBtYQ1mj9juAEEtITg&usqp=CAU',
    [
      new Ingredients('banana', 2),
      new Ingredients('french Fries', 20),
    ])
  ];

  getRecipeList(){
    return this.recipes.slice();
  }

  getRecipeById(index:number){
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    console.log(this.recipes);
    this.recipeChange.next(this.recipes);
  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipeChange.next(this.recipes);
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipeChange.next(this.recipes);
  }

  constructor() { }
}

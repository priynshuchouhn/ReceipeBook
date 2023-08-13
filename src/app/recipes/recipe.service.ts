import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredients } from '../shared/ingredients.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
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

  constructor() { }
}

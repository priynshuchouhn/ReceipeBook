import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipeList();
    return this.http.put('https://angular-recipe-book-f1591-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe(response=>{
    })
  }

  fetchRecipes(){
    this.http.get<Recipe[]>('https://angular-recipe-book-f1591-default-rtdb.firebaseio.com/recipes.json').subscribe((recipes)=>{
      this.recipeService.setRecipes(recipes);
    })
  }
}

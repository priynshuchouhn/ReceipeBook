import { EventEmitter, Injectable } from '@angular/core';
import { Ingredients } from '../shared/ingredients.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredients[]>();
  editItemSelect = new Subject<number>();

  private ingredients: Ingredients[] = [
    new Ingredients('Apples', 5),
    new Ingredients('Tomatoes', 10),
  ];


  getIngredientList(){
   return this.ingredients.slice();
  }

  getIngredientById(index: number){
    return this.ingredients[index]
  }

  updateIngredient(index: number, ingredient: Ingredients){
    this.ingredients[index] = ingredient;
    this.ingredientsChanged.next(this.ingredients); 
  }


  addIngredient(ingredients:Ingredients){
    this.ingredients.push(ingredients);
    this.ingredientsChanged.next(this.ingredients);
  }

  addToShoppingList(ingredients: Ingredients[]){
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients);
  }

  deleteIngredient(index: number){
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients)
  }
}

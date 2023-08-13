import { EventEmitter, Injectable } from '@angular/core';
import { Ingredients } from '../shared/ingredients.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredients[]>();

  private ingredients: Ingredients[] = [
    new Ingredients('Apples', 5),
    new Ingredients('Tomatoes', 10),
  ];


  getIngredientList(){
   return this.ingredients.slice();
  }


  addIngredient(ingredients:Ingredients){
    this.ingredients.push(ingredients);
    this.ingredientsChanged.emit(this.ingredients);
  }

  addToShoppingList(ingredients: Ingredients[]){
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.emit(this.ingredients);
  }
}

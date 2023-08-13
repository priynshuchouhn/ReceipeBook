import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {


  @Input() myRecipe! : Recipe;
 constructor(private slService: ShoppingListService){}

  toShoppingList(){
    this.slService.addToShoppingList(this.myRecipe.ingredients);
  }


}

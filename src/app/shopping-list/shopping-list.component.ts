import { Component, OnInit } from '@angular/core';
import { Ingredients } from '../shared/ingredients.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit{
  
    constructor(private slService : ShoppingListService){}
  
    ingredients!: Ingredients[];
  ngOnInit() {
    this.ingredients = this.slService.getIngredientList();
    this.slService.ingredientsChanged.subscribe(
      (ingredients: Ingredients[]) =>{
        this.ingredients = ingredients
      }
    )
  }


}

import { Component } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {

  recipes: Recipe[] = [
    new Recipe('Test recipe','test recipe description','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJzgEEMhdw7pfkMvfWhBtYQ1mj9juAEEtITg&usqp=CAU')
  ];


}

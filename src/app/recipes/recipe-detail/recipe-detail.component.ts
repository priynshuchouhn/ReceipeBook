import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {


 myRecipe! : Recipe;
 id!: number;
 constructor(private slService: ShoppingListService, private route: ActivatedRoute, private recipe : RecipeService, private router: Router){}
  ngOnInit(): void {
    this.route.params.subscribe(
      (params : Params) => {
        this.id = params['id'];
        this.myRecipe = this.recipe.getRecipeById(this.id);
      }
    );
  }

  toShoppingList(){
    this.slService.addToShoppingList(this.myRecipe.ingredients);
  }

  editRecipe(){
    this.router.navigate(['edit'],{relativeTo: this.route});
  }
}

import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit , OnDestroy
{
  recipes!: Recipe[];
  subscription!: Subscription

  constructor(private recipeService : RecipeService, private router: Router, private route: ActivatedRoute){}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
   this.subscription = this.recipeService.recipeChange.subscribe(
      (recipes: Recipe[]) =>{
        this.recipes = recipes
      }
    )
    this.recipes = this.recipeService.getRecipeList();
  }

  createNewRecipe(){
    this.router.navigate(['new'], {relativeTo: this.route})
  }
  
}

import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredients } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  editMode = false;
  editItemIndex!: number;
  editItem!: Ingredients
  @ViewChild('ingredientForm') ingredientForm!: NgForm;

constructor(private slService: ShoppingListService){}
  ngOnInit(): void {
   this.slService.editItemSelect.subscribe(
    (index:number) => {
      this.editItemIndex = index;
      this.editMode = true;
      this.editItem = this.slService.getIngredientById(index)
      this.ingredientForm.setValue({
        name: this.editItem.name,
        amount : this.editItem.amount
      })
    }
   )
  }

  onSubmit(form: NgForm){
    const value = form.value
    const newIngredient: Ingredients = {name: value.name, amount:value.amount}

    if(this.editMode){
      this.slService.updateIngredient(this.editItemIndex,newIngredient)
    }else{
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear(){
    this.ingredientForm.reset();
    this.editMode= false;
  }

  onDelete(){
    this.slService.deleteIngredient(this.editItemIndex);
    this.ingredientForm.reset();
    this.editMode= false;
  }

}

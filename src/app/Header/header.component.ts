import { Component, EventEmitter, Output } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
selector : 'app-header',
templateUrl: './header.component.html',
styleUrls : ['./header.component.css']
})
export class HeaderComponent {

    constructor(private dataStorage: DataStorageService){}
   onSave(){
    this.dataStorage.storeRecipes();
   }

   onFetch(){
    console.log("button clicked");
    this.dataStorage.fetchRecipes().subscribe();
   }
}
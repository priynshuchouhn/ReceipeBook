import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

    userSub!: Subscription;
    isAuthenticated:boolean =  false;

    constructor(private dataStorage: DataStorageService, private authService: AuthService) { }
    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }
    ngOnInit(): void {
       this.userSub = this.authService.user.subscribe(user => {
        this.isAuthenticated = !!user;
    });
    }

    onSave() {
        this.dataStorage.storeRecipes();
    }

    onFetch() {
        this.dataStorage.fetchRecipes().subscribe();
    }
}
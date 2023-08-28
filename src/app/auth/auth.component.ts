import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiResponse, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  loginMode: boolean = false
  isLoading: boolean = false;
  error: string = ''

  form: FormGroup;

  constructor(private authService: AuthService, private router: Router){
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    })
  }

  onSwitchMode(){
    this.loginMode = !this.loginMode
  }

  onSubmit(){
   if(!this.form.valid){
    return;
   }
   const email = this.form.value.email;
    const password = this.form.value.password;
    this.isLoading = true
    let authObs: Observable<ApiResponse>

   if(this.loginMode){
    authObs = this.authService.login(email,password)
   }else{
    authObs = this.authService.signUp(email,password)
   }

   authObs.subscribe(
    {next:(res)=>{
      console.log(res)
      this.isLoading = false
      this.router.navigate(['/recipes']);
    }
    ,error:(errorMessage)=>{
      this.error= errorMessage
      this.isLoading = false
    }});
    


    this.form.reset()
  }

}

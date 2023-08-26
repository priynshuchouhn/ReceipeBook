import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface ApiResponse {
  idToken	:string
  email:	string	
  refreshToken:	string	
  expiresIn:	string
  localId:	string
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  signUp(email: string , password: string){
   return this.http.post<ApiResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDdJkoVqdiudboEBhGUaH_r9bj25kmgO4E`,{
      email: email,
      passsword: password,
      returnSecureToken : true
    })

  }

}

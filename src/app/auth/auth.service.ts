import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface ApiResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered? : boolean
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router:Router) {}

  user = new BehaviorSubject<User|null>(null);
  token : string = '';
  expirationTimer: any

  signUp(email: string, password: string) {
    return this.http
      .post<ApiResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDdJkoVqdiudboEBhGUaH_r9bj25kmgO4E',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(catchError(this.handleError), tap(resData =>{
       this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn)
      }));
  }
  login(email: string, password: string) {
    return this.http
      .post<ApiResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDdJkoVqdiudboEBhGUaH_r9bj25kmgO4E',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      ).pipe(catchError(this.handleError),tap(resData =>{
        this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn)
       }));
      
  }

  autoLogin(){
    console.timeLog("hello world")
    const userData: {
      email:string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData')!)

    if(!userData){
      return;
    }
    const LoadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate))
    if(LoadedUser.token){
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.user.next(LoadedUser);
      this.autoLogout(expirationDuration);
    }
  }


  logOut(){
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if(this.expirationTimer){
      clearTimeout(this.expirationTimer);
    }
  }

  autoLogout(expirationDuration: number){
   this.expirationTimer = setTimeout(()=>{
    this.logOut();
   }, expirationDuration)
  }

  private handleAuthentication(email:string,localId:string,idToken:string,expiresIn:number){
    const expirationDate = new Date(new Date().getTime()+ expiresIn*1000 );
    const user = new User(
      email,
      localId,
      idToken, 
      expirationDate)
      this.user.next(user);
      this.autoLogout(expiresIn * 1000);
      localStorage.setItem('userData', JSON.stringify(user))
  }

  private handleError(errorRes: HttpErrorResponse){
    let errorMessage = 'an error occured';
          if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
          }
          switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMessage = 'This email already exists';
              break;
              case 'EMAIL_NOT_FOUND':  
                errorMessage = 'This email does not exists';
                break;
              case 'INVALID_PASSWORD':  
                errorMessage = 'This Password is incorrect';
                break;
          }
          return throwError(errorMessage);
  }
}

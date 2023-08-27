import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

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
  constructor(private http: HttpClient) {}

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
      .pipe(catchError(this.handleError));
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
      ).pipe(catchError(this.handleError));
      
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

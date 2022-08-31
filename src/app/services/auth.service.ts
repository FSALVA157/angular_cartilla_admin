import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_root, firebase_api_key } from 'src/environments/environment';
import { UserModel } from '../models/user.model';


// https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
// https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }


 createNewUser(user: UserModel){
      const payload = {
        email: user.correo,
        password: user.password,
        returnSecureToken: true,
      }
      
      return this.http.post(
         `${url_root}/accounts:signUp?key=${firebase_api_key}`,
          payload
      );
 }


 login(user: UserModel){
  const payload = {
    email: user.correo,
    password: user.password,
    returnSecureToken: true,
  }

  return this.http.post(
    `${url_root}/accounts:signInWithPassword?key=${firebase_api_key}`,
     payload
 );



 }





}

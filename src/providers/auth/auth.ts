import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Auth {

  constructor(public http: Http) {
    console.log('Hello AuthProvider Provider');
  }

  login(){

    return new Promise((resolve) => {

      setTimeout(() => {
        resolve(true);
      }, 4);

    });
  }
}

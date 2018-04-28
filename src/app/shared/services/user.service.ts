import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  constructor() {
  }

  setUser(user) {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    return sessionStorage.user ? JSON.parse(sessionStorage.user) : false;
  }

  removeUser() {
    sessionStorage.removeItem('user');
  }

}

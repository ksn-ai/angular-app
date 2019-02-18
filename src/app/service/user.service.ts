import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from "../model/user.model";

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }
  //Dev
  //baseUrl: string = 'http://localhost:8080/userservice/';
  //Prod
  baseUrl: string = 'http://'+window.location.host+'/userservice/';

  getUsers() {
    return this.http.get<User[]>(this.baseUrl + "users");
  }

  getUserById(id: number) {
    return this.http.get<User>(this.baseUrl + "user/" + id);
  }

  createUser(user: User) {
    return this.http.post(this.baseUrl + "user", user);
  }

  updateUser(user: User) {
    return this.http.put(this.baseUrl + "user/" + user.uid, user);
  }

  deleteUser(id: number) {
    return this.http.delete(this.baseUrl + "user/" + id);
  }
}

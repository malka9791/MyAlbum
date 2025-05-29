import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { User } from '../../models/user';
import { firstValueFrom, Observable } from 'rxjs';
import { UserPost } from '../../models/userPost';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}
  getToken(): string | null {
    return sessionStorage.getItem('token');
  }
  getHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set('Authorization', `Bearer ${this.getToken()}`)
      .set('Content-Type', 'application/json');
  }

  async getUsers(): Promise<User[]> {
    const headers = this.getHeaders();
    try {
      const res = await firstValueFrom(
        this.http.get<User[]>(`${this.api}/user`, {
          headers,
        })
      );      
      return res || [];
    } catch (err) {
      console.error(err);
      throw 'Error in fetching userDate, try again';
    }
  }
  deleteUser(id: number): Observable<any> {
    return this.http.delete<User>(`${this.api}/user/${id}`, {
      headers: this.getHeaders(),
    });
  }
  editUser(id: number, user: UserPost): Observable<any> {
    return this.http.put(`${this.api}/user/system/${id}`, user, {
      headers: this.getHeaders(),
    });
  }
  addUser(user: UserPost): Observable<any> {
    return this.http.post<User>(`${this.api}/user`, user, {
      headers: this.getHeaders(),
    });
  }
}

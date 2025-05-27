import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Login } from '../models/login';
import { firstValueFrom, Observable } from 'rxjs';
import { LoginRes } from '../models/loginRes';
import { User } from '../models/user';
import { resImage } from '../models/resImage';

@Injectable({
  providedIn: 'root',
})
@Injectable()
export class AuthService {
  private api = environment.apiUrl;
  constructor(private http: HttpClient) {}
  async Login(login: Login) {
    try {
      const res = await firstValueFrom(
        this.http.post<LoginRes>(`${this.api}/login`, login)
      );
      if (res.token) {
        const role = res.role;
        if (role == 'admin') sessionStorage.setItem('isLogin', 'true');
      }
    } catch (err: any) {
      throw 'error in login';
    }
  }
  async getUsers(): Promise<User[]> {
    try {
      const res = await firstValueFrom(
        this.http.get<User[]>(`${this.api}/user`)
        
      );
      console.log(res);
      console.log(this.api);
      
      
      if (res) return res;
      else return [];
    } catch (err) {
      throw 'Error in fetching userDate,try again';
    }
  }
  deleteUser(id: number): Observable<any> {
    const headers = new HttpHeaders({
      // Authorization: `Bearer ${this.token}`,
    });

    return this.http.delete<User>(`${this.api}/api/user/${id}`, {
      headers,
    });
  }

  async getImages(): Promise<resImage[]> {
    try {
      const res = await firstValueFrom(
        this.http.get<resImage[]>(`${this.api}/image`)
        
      );      
      if (res) return res;
      else return [];
    } catch (err) {
      throw 'Error in fetching userDate,try again';
    }
  }
}

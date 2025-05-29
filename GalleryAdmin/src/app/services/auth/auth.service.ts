import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Login } from '../../models/login';
import { firstValueFrom, Observable } from 'rxjs';
import { LoginRes } from '../../models/loginRes';
import { User } from '../../models/user';
import { resImage } from '../../models/resImage';
import { Album } from '../../models/album';

@Injectable({
  providedIn: 'root',
})
@Injectable()
export class AuthService {
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

  async Login(login: Login): Promise<boolean> {
    try {
      const res = await firstValueFrom(
        this.http.post<LoginRes>(`${this.api}/auth/login`, login)
      );
      if (res.token) {
        const role = res.user.role;
        if (role == 'admin') {
          sessionStorage.setItem('token', res.token);
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch (err: any) {
      throw 'error in login';
      // return false;
    }
  }

  async getImages(): Promise<resImage[]> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.getToken()}`)
      .set('Content-Type', 'application/json');

    try {
      const res = await firstValueFrom(
        this.http.get<resImage[]>(`${this.api}/image`, {
          headers,
        })
      );
      if (res) return res;
      else return [];
    } catch (err) {
      throw 'Error in fetching userDate,try again';
    }
  }
  async getAlbums(): Promise<Album[]> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.getToken()}`)
      .set('Content-Type', 'application/json');

    try {
      const res = await firstValueFrom(
        this.http.get<Album[]>(`${this.api}/album`, {
          headers,
        })
      );
      if (res) return res;
      else return [];
    } catch (err) {
      throw 'Error in fetching userDate,try again';
    }
  }
}

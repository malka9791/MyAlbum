import { Component, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import axios from 'axios';
// import { Login } from '../../models/login';
// import { AuthService } from '../../services/auth.service';
import { log } from 'console';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { Login } from '../../models/login';
@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  messege = '';
  constructor(private AuthService: AuthService, private route: Router) {}
  async PostData() {
    try {
      const res = await this.AuthService.Login({
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value,
      });
      if (res) {
        this.route.navigate(['/']);
      }
    } catch (err: any) {
      console.error(err);
      this.messege = 'failed, try again';
    }
  }
  loginForm: FormGroup<Login | any> = new FormGroup({});
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
  hide: boolean = true;
  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }
}

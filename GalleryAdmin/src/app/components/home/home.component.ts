import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ChartComponent } from '../chart/chart.component';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, ChartComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  currentYear = new Date().getFullYear();
  loginForm: FormGroup;
  isLoading = false;
  loginError = '';

  // Statistics data
  stats = {
    totalUsers: 1247,
    activeProjects: 89,
    completedProjects: 356,
    revenue: '$127,450',
  };
  // Recent activities
  recentActivities = [
    {
      icon: 'person_add',
      text: 'New designer registered',
      time: '2 hours ago',
    },
    {
      icon: 'folder',
      text: 'Project "Brand Identity" completed',
      time: '4 hours ago',
    },
    { icon: 'payment', text: 'Payment processed', time: '6 hours ago' },
  ];

  // System status
  systemStatus = {
    server: 'online',
    database: 'online',
    payments: 'online',
    storage: 'warning',
  };

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private service: AuthService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.loginError = '';
      setTimeout(() => {
        this.isLoading = false;
        this.router.navigate(['/admin/dashboard']);
      }, 1500);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  navigate(path: string): void {
    this.router.navigate([path]);
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'online':
        return '#4CAF50';
      case 'warning':
        return '#FF9800';
      case 'offline':
        return '#F44336';
      default:
        return '#757575';
    }
  }
  getIsValidChart() {
    return this.service.getToken() != null;
  }
  getStatusIcon(status: string): string {
    switch (status) {
      case 'online':
        return 'check_circle';
      case 'warning':
        return 'warning';
      case 'offline':
        return 'error';
      default:
        return 'help';
    }
  }
}

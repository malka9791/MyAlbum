import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  constructor(private AuthService: AuthService, private route: Router) {}
  list: User[] = [];
  messege!: string;
  currentIdForEdit!: number;

  ngOnInit(): void {
    this.AuthService.getUsers().then((courses) => {
      this.list = courses;
    });
  }
  edit(id: number) {
    this.currentIdForEdit = id;
    // this.route.navigate([`/courses/:${Course.id}`])
    this.messege = '';
  }
  Delete(id: number): void {
    this.AuthService.deleteUser(id).subscribe({
      next: (response) => {
        console.log('success delete');
        this.list = this.list.filter((user) => user.id !== id);
      },
      error: (err) => {
        if (err.status === 403) {
          debugger;
          console.log('you cannt delete');
        } else {
          console.error('שגיאה בעדכון הקורס:', err);
        }
      },
    });
  }

  save(e: any) {
    this.AuthService.updateUser(e.id, e).subscribe({
      next: (response) => {
        console.log('Success:', response);
        this.AuthService.getUsers().then((users) => {
          this.list = users;
        });

        this.currentIdForEdit = -1;
      },
      error: (err) => {
        if (err.status === 403) {
          this.messege = 'אין לך הרשאה לעדכן את הקורס.';
        } else {
          (this.messege = 'שגיאה בעדכון הקורס:'), err;
        }
      },
    });
  }
  canChange = () => {
    let role =
      typeof window !== 'undefined' && typeof sessionStorage !== 'undefined'
        ? sessionStorage.getItem('role')
        : null;
    if (role == 'student') return false;
    return true;
  };
  showLessons = (id: number) => {
    this.route.navigate([`lesson/`,id]);
  };
  addLesson(id: number): void {
    this.route.navigate([`addlesson/`,id]);
  }

}

